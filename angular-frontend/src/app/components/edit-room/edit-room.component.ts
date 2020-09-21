import { Component, OnInit } from '@angular/core';
import {RoomControllerService} from 'build/openapi/api/roomController.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subscriber} from 'rxjs';
import { Room } from 'build/openapi';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  room: Room;
  constructor(private roomService: RoomControllerService,private route: ActivatedRoute, private routrer: Router) { }
  
  ngOnInit(): void {
  this.getData();
  }

  getData(){
    this.roomService.getRoomById(this.route.snapshot.params['id'])
    .subscribe(data => {this.room = data;})
  }

  onSubmit(){
    this.roomService.updateRoom(this.room.id,this.room)
    .subscribe(data=> {this.room = data;})
    this.getData();
    this.routrer.navigate(['admin/rooms/all']);
  }
}
