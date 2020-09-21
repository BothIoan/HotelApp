package HotelApp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;

import javax.persistence.*;

import static lombok.AccessLevel.PRIVATE;

@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = PRIVATE)
@Builder
@Getter
@Setter
@Table(name = "Booking")
@Entity
@ToString
public class Booking {

    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy= GenerationType.AUTO)
    Long id;

    @Column(name = "ranking")
    Long ranking;//String in caz ca nu a rankuit inca. Oricum nu o sa trebuiasca parsat or something

    @Column(name = "name")
    String name;

    @Column(name = "duration")
    int duration;

    @Enumerated(EnumType.STRING)
    @Column(name = "valability")
    BookingStates valability;

    @ManyToOne
    @JoinColumn (name = "room_id")
    Room room;
}