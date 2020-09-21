package HotelApp.model;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.Type;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = PRIVATE)
@Builder
@Getter
@Setter
@Table(name = "Room")
@Entity
@Component
@ToString
public class Room {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    RoomTypes type;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    RoomStates state;

    @Enumerated(EnumType.STRING)
    @Column(name = "size")
    RoomSizes size;

    @Column(name = "price")
    int price;
}