package HotelApp.controller;

import HotelApp.dataAccessRepos.AdminRepo;
import HotelApp.dataAccessRepos.WaiterRepo;
import HotelApp.model.Admin;
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
public class AdminController{
    @Autowired
    AdminRepo adminRepo;
    @PutMapping("/admin/{email}/{password}")
    public Admin getAdminByEmailAndPassword(@PathVariable(value = "email")String email, @PathVariable(value = "password")String password){
        return adminRepo.findByEmailAndPassword(email,password).orElse(Admin.builder().id((long)-1).build());
    }

}