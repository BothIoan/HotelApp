package HotelApp.controller.BookingLogic;


import HotelApp.dataAccessRepos.BookingRepo;
import HotelApp.dataAccessRepos.RoomRepo;
import HotelApp.model.Booking;
import HotelApp.model.Room;
import HotelApp.wSocket.WSocketEndpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.concurrent.*;

import static HotelApp.model.BookingStates.ACTIVE;
import static HotelApp.model.BookingStates.EXPIRED;
import static HotelApp.model.RoomStates.*;


@Configuration
@EnableScheduling
@EnableAsync
@Service
@Component
public class BookingScheduler {
    public ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    public  Room room;
    private  RoomRepo roomRepo;
    private  BookingRepo bookingRepo;
    BlockingQueue<Booking> activeBookings = new ArrayBlockingQueue<Booking>(100);
    Thread localThread;
    public BookingScheduler(RoomRepo roomRepo,BookingRepo bookingRepo,Room room){
        this.roomRepo=roomRepo;
        this.bookingRepo=bookingRepo;
        this.room=room;
        assert false;
        //Question: Do you know how to do this without a fixed capacity ?
        //Optional<List<Booking>> bookingsCollector = bookingRepo.findByValabilityAndRoom_id(ACTIVE,room.getId());
        activeBookings = new ArrayBlockingQueue<Booking>(100,true,bookingRepo.findByValabilityAndRoom_id(ACTIVE,room.getId()).orElse(new ArrayList<>()));
    }
    @Transactional
    public void runTask() { scheduler.scheduleWithFixedDelay(task,(long)0,10000, TimeUnit.MILLISECONDS);}

    Runnable task = ()->{
        localThread = Thread.currentThread();
        room.setState(FREE);
        WSocketEndpoint.broadcastMessage("Room "+room.getId() + "is free");
        roomRepo.saveAndFlush(room);//really fucking needed
        Booking current = null;
        try { current = activeBookings.take();
            } catch (InterruptedException e) {
                System.out.println("RoomDeleted");
            }
            room.setState(OCCUPIED);
            roomRepo.saveAndFlush(room);
            try {
                Thread.sleep(current.getDuration() * 1000);
            } catch (InterruptedException e) {
                System.out.println("RoomDeleted, customers killed XD");
            }
            current.setValability(EXPIRED);
            room.setState(CLEANUP);
            bookingRepo.saveAndFlush(current);
            roomRepo.saveAndFlush(room);
        };
    public void addBooking(Booking booking) throws InterruptedException {
            activeBookings.add(booking);
    }
}
