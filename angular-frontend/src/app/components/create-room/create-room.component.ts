import { Component, OnInit } from '@angular/core';
import {RoomControllerService} from 'build/openapi/api/roomController.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import { Room } from 'build/openapi';
@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  room: Room = {
    type:Room.TypeEnum.COCIOBA,
    size:Room.SizeEnum.MICA,
    state:Room.StateEnum.FREE,
    price: 0
  };

  constructor(private roomService : RoomControllerService, private router:Router) { }

  onSubmit(){
    this.roomService.createRoom(this.room).subscribe(data => console.log(data),error => console.log(error));
    this.room = {
      type:Room.TypeEnum.COCIOBA,
      size:Room.SizeEnum.MICA,
      state:Room.StateEnum.FREE,
      price: 0
    };
    this.router.navigate(['admin/rooms/all']);
  }
  ngOnInit(): void {
  }

  getRoomTypes() {
    return Object.keys(Room.TypeEnum).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
  getRoomSizes() {
    return Object.keys(Room.SizeEnum).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
