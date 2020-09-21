package HotelApp.dataAccessRepos;

import HotelApp.model.Booking;
import HotelApp.model.BookingStates;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByValability(String valability);
    Optional<List<Booking>> findByValabilityAndRoom_id(BookingStates valability, Long room_id);
    Optional<List<Booking>> findByRoom_id(Long room_id);
    void deleteByRoom_id(Long room_id);
}
