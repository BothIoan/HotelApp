package HotelApp.controller;

import HotelApp.dataAccessRepos.WaiterRepo;
import HotelApp.model.Room;
import HotelApp.model.RoomStates;
import HotelApp.model.Waiter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.WatchKey;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class WaiterController {
    @Autowired
    WaiterRepo waiterRepo;
    @GetMapping("/waiters")
    public List<Waiter> getAllWaiters() {
        return waiterRepo.findAll();
    }
    @GetMapping("/waiter/{id}")
    public Waiter getWaiterById(@PathVariable(value = "id")Long id){return waiterRepo.findById(id).orElse(Waiter.builder().id((long)-1).build());}
    @PutMapping("/waiter/{email}/{password}")
    public Waiter getWaiterByEmailAndPassword(@PathVariable(value = "email")String email, @PathVariable(value = "password")String password){
       return waiterRepo.findByEmailAndPassword(email,password).orElse(Waiter.builder().id((long)-1).build());
    }
    @PostMapping("/waiter")
    public Waiter createWaiter(@RequestBody Waiter waiter){
        return waiterRepo.save(waiter);
    }
    @PutMapping("/waiter/{id}")
    public Waiter updateWaiter(@PathVariable(value = "id") Long id, @RequestBody Waiter waiterRequest) {
        waiterRepo.findById(id).orElse(Waiter.builder().id((long)-1).build());
        Waiter waiter = Waiter.builder().email(waiterRequest.getEmail()).id(waiterRequest.getId()).password(waiterRequest.getPassword()).username(waiterRequest.getUsername()).build();
        return waiterRepo.save(waiter);
    }
    @DeleteMapping("/waiter/{id}")
    public ResponseEntity<?> deleteWaiter(@PathVariable(value="id") Long id) {
        Waiter waiter = waiterRepo.findById(id).orElse(Waiter.builder().id(((long)-1)).build());
        waiterRepo.delete(waiter);
        return ResponseEntity.ok().build();
    }


}
