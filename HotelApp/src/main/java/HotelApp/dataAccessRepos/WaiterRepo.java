package HotelApp.dataAccessRepos;


import HotelApp.model.Admin;
import HotelApp.model.Waiter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WaiterRepo extends JpaRepository<Waiter, Long> {
    Optional<Waiter> findByEmailAndPassword(String email, String password);
}
