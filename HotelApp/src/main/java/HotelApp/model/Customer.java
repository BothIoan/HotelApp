package HotelApp.model;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

import static lombok.AccessLevel.PRIVATE;

@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = PRIVATE)
@Builder
@ToString
@Getter
@Setter
@Table(name = "Customer")
@Entity
public class Customer {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy= GenerationType.AUTO)
    Long id;

    @Column(name = "email")
    String email;

    @Column(name = "password")
    String password;

    @Column(name = "username")
            String username;
}
