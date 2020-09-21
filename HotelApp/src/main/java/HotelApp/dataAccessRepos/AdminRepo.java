package HotelApp.dataAccessRepos;

import HotelApp.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmailAndPassword(String email, String password);
}
