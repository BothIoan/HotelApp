package HotelApp.dataAccessRepos;

import HotelApp.model.Roomranking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomrankingRepo extends JpaRepository<Roomranking,Long> {
    void deleteByRoom_id(Long room_id);
    Optional<List<Roomranking>> findByRoom_id(Long room_id);
}
