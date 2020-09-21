package HotelApp.controller;
import HotelApp.controller.BookingLogic.BookingLogic;
import HotelApp.dataAccessRepos.BookingRepo;
import HotelApp.dataAccessRepos.RoomRepo;
import HotelApp.model.Booking;
import HotelApp.model.BookingStates;
import HotelApp.model.Room;
import HotelApp.model.RoomStates;
import HotelApp.wSocket.WSocketEndpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class BookingController {
    @Autowired
    BookingRepo bookingRepo;
    @Autowired
    BookingLogic bookingLogic;
    @Autowired
    private ApplicationContext applicationContext;

    @PostConstruct
    public void init() {

        bookingLogic = applicationContext.getBean("BL", BookingLogic.class);
    }

    @GetMapping("/booking{id}")
    public Booking getBookingById(@PathVariable(value = "id")Long id){
        return bookingRepo.findById(id).orElse(Booking.builder().id((long)-1).build());
    }
    @GetMapping("/bookings")
    public List<Booking> getAll() {
        return bookingRepo.findAll();
    }

    @GetMapping("/bookings{valability}")
    public List<Booking> getBookingByValability(@PathVariable(value = "valability") String valability) {
        return bookingRepo.findByValability(valability);
    }

    @PostMapping("/booking")
    public Booking createBooking(@RequestBody Booking booking) {
        Booking bookingWithId = bookingRepo.save(booking);
        if(booking.getValability() == BookingStates.PENDING) WSocketEndpoint.broadcastMessage("Booking requested at room :"+booking.getRoom().getId());
        if(booking.getValability() == BookingStates.ACTIVE) bookingLogic.addBooking(bookingWithId);
        return booking;
    }
    @PostMapping("/bookingActivate/{id}")
    public Booking activateBooking(@PathVariable(value = "id")Long id){
        Booking booking = bookingRepo.findById(id).orElse(Booking.builder().id((long)-1).build());
        if(id == (long)-1)return booking;
        booking.setValability(BookingStates.ACTIVE);
        bookingRepo.save(booking);
        bookingLogic.addBooking(booking);
        return booking;
    }
    @GetMapping("/booking/{room_id}")
    public List<Booking> getBookingsByRoomId(@PathVariable(value = "room_id")Long room_id){
        return bookingRepo.findByRoom_id(room_id).orElse(new ArrayList<Booking>());
    }

    @PutMapping("/booking/{id}")
    public Booking updateBooking(@PathVariable(value = "id") Long id, @RequestBody Booking bookingRequest) {
        bookingRepo.findById(id).orElse(Booking.builder().id((long) -1).build());
        if(id == (long)-1) return bookingRequest;
        return bookingRepo.save(bookingRequest);
    }
    @DeleteMapping("booking/delete/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable(value = "id")Long id){
        bookingRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}