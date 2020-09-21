package HotelApp.controller.BookingLogic;

import HotelApp.dataAccessRepos.BookingRepo;
import HotelApp.dataAccessRepos.RoomRepo;
import HotelApp.dataAccessRepos.RoomrankingRepo;
import HotelApp.model.Booking;
import HotelApp.model.Room;
import jdk.jfr.Name;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

//Here the check-in/check-out system should be simulated
@Component("BL")
@EnableScheduling
@EnableAsync
public class BookingLogic{
    private List<Room> allRooms;
    public List<BookingScheduler> schedulers = new ArrayList<>();
    @Autowired
    RoomRepo roomRepo;
    @Autowired
    BookingRepo bookingRepo;
    @Autowired
    RoomrankingRepo roomrankingRepo;
    @PostConstruct
    public void init () {
        allRooms = roomRepo.findAll();
        if(!allRooms.isEmpty())
        allRooms.forEach(x->schedulers.add(new BookingScheduler(roomRepo,bookingRepo,x)));
        schedulers.forEach(BookingScheduler::runTask);
    }
    public void addRoom(Room room) throws InterruptedException {//this might need a change if it proves that hibernate is not as smart as I think
        allRooms.add(room);
        BookingScheduler bookingScheduler =new BookingScheduler(roomRepo,bookingRepo,room);
        schedulers.add(bookingScheduler);
        bookingScheduler.runTask();
    }
    public void updateRoom(Room room){
        allRooms.stream().filter(x->x.getId()==room.getId()).findFirst().ifPresent(x->{
            x.setPrice(room.getPrice());
            x.setSize(room.getSize());
            x.setType(room.getType());
        });
    }
    public void addBooking(Booking booking){
        schedulers.stream().filter(x->x.room.getId()==booking.getRoom().getId()).findFirst().ifPresentOrElse(x-> {
            try {
                x.addBooking(booking);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        },()->{System.out.println("addBookingError");});
    }
    @Transactional
    public void deleteRoom(Long room_id){
    BookingScheduler scheduler = schedulers.stream().filter(x->x.room.getId()==room_id).findFirst().get();
    scheduler.scheduler.shutdown();
    scheduler.scheduler.shutdownNow();
    schedulers.remove(scheduler);
    allRooms.removeIf(x->x.getId()==room_id);
    bookingRepo.deleteByRoom_id(room_id);
    roomrankingRepo.deleteByRoom_id(room_id);
    }
}