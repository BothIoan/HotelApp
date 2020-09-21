package HotelApp.controller;


import HotelApp.controller.BookingLogic.BookingLogic;
import HotelApp.dataAccessRepos.BookingRepo;
import HotelApp.dataAccessRepos.RoomRepo;
import HotelApp.model.Room;
import HotelApp.model.RoomSizes;
import HotelApp.model.RoomStates;
import HotelApp.model.RoomTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class RoomController {
    @Autowired
    RoomRepo roomRepo;
    @Autowired
    BookingLogic bookingLogic;
    @Autowired
    ApplicationContext applicationContext;
    @PostConstruct
    public void init(){
        bookingLogic = applicationContext.getBean("BL",BookingLogic.class);
    }

    @GetMapping("/rooms")
    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    @GetMapping("/room/{id}")
    public Room getRoomById(@PathVariable(value = "id") Long id) {
        return roomRepo.findById(id).orElse(Room.builder().id((long) -1).build());
    }
    @GetMapping("/rooms/{price}")
    public List<Room> getRoomByPrice(@PathVariable(value = "price") Long price) {
        return roomRepo.findByPrice(price);
    }
    @GetMapping("/rooms/{type}")
    public List<Room> getRoomByType(@PathVariable(value = "type") String type) {
        return roomRepo.findByType(type);
    }
    @GetMapping("/rooms/{size}")
    public List<Room> getRoomBySize(@PathVariable(value = "size") String size) {
        return roomRepo.findBySize(size);
    }
    @GetMapping("/rooms/{state}")
    public List<Room> getRoomByState(@PathVariable(value = "state") String state) { return roomRepo.findByState(state); }
    @PostMapping("/room")
    public Room createRoom(@RequestBody Room room) throws InterruptedException {
            Room roomWithId = roomRepo.save(room);
            bookingLogic.addRoom(roomWithId);
            return room;
    }
    @DeleteMapping("/room/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable(value="id") Long id) {
        Room room = roomRepo.findById(id).orElse(Room.builder().id(((long)-1)).build());
        bookingLogic.deleteRoom(room.getId());
        roomRepo.delete(room);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/room/{id}")
    public Room updateRoom(@PathVariable(value = "id") Long id, @RequestBody Room roomRequest) {
        roomRepo.findById(id).orElse(Room.builder().id((long)-1).build());
        Room room = Room.builder().id(roomRequest.getId()).price(roomRequest.getPrice()).size(roomRequest.getSize()).state(RoomStates.FREE).type(roomRequest.getType()).build();
        return roomRepo.save(room);

    }
}
