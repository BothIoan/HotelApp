package HotelApp.controller;
import HotelApp.dataAccessRepos.RoomrankingRepo;
import HotelApp.model.Roomranking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class RoomrankingController {
    @Autowired
    RoomrankingRepo roomrankingRepo;
    @PostMapping("customer/review/create")
    public Roomranking createReview(@RequestBody Roomranking roomranking){
        return roomrankingRepo.save(roomranking);
    }
    @GetMapping("customer/review/get/{room_id}")
    public List<Roomranking> getReviewsByRoomId(@PathVariable(value = "room_id")Long room_id){
        return roomrankingRepo.findByRoom_id(room_id).orElse(new ArrayList<Roomranking>());
    }
}
