package HotelApp.dataAccessRepos;


import HotelApp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RoomRepo extends JpaRepository<Room, Long> {
    List<Room> findBySize(String size);
    List<Room> findByType(String type);
    List<Room> findByPrice(Long price);
    List<Room> findByState(String state);
}
