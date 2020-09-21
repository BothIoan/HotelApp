package HotelApp.model;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

import static lombok.AccessLevel.PRIVATE;

@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = PRIVATE)
@Builder
@Getter
@Setter
@Table(name = "Roomranking")
@Entity
@ToString
public class Roomranking {

    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy= GenerationType.AUTO)
    Long id;

    @ManyToOne
    @JoinColumn (name = "room_id")
    Room room;

            @Column(name = "ranking")
    Long ranking;

    @Column(name = "comment")
    String comment;


}
