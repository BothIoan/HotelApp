import { Component, OnInit } from '@angular/core';
import { Room } from 'build/openapi/model/room';
import { RoomControllerService } from 'build/openapi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-rooms',
  templateUrl: './customer-rooms.component.html',
  styleUrls: ['./customer-rooms.component.css']
})
export class CustomerRoomsComponent implements OnInit {

 
  private _roomType : Room.TypeEnum;
  private _roomSize : Room.SizeEnum;
  private _roomState: Room.StateEnum;
  private _roomPriceMin : number;
  private _roomPriceMax : number;
  rooms: Room[];
  filteredRooms :Room[];
  constructor(private roomService: RoomControllerService, private router: Router) {}
  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe(data=> {this.rooms = data,this.filteredRooms = data});
  }
  
  
  public set roomType(v : Room.TypeEnum) {
    this._roomType = v;
    this.filteredRooms = this.getFittingRooms(this._roomType,this._roomSize,this._roomState,this._roomPriceMin,this._roomPriceMax);
  }
  public set roomSize(v : Room.SizeEnum) {
    this._roomSize = v;
    this.filteredRooms = this.getFittingRooms(this._roomType,this._roomSize,this._roomState,this._roomPriceMin,this._roomPriceMax);
  }
  public set roomState(v : Room.StateEnum) {
    this._roomState = v;
    this.filteredRooms = this.getFittingRooms(this._roomType,this._roomSize,this._roomState,this._roomPriceMin,this._roomPriceMax);
  }
  public set roomPriceMin(v : number) {
    this._roomPriceMin = v
    this.filteredRooms = this.getFittingRooms(this._roomType,this._roomSize,this._roomState,this._roomPriceMin,this._roomPriceMax);
  }
  public set roomPriceMax(v : number) {
    this._roomPriceMax = v
    this.filteredRooms = this.getFittingRooms(this._roomType,this._roomSize,this._roomState,this._roomPriceMin,this._roomPriceMax);
  }

  bookRoom(id){
    this.router.navigate(['customer/book',id]);
  }
  rankRoom(id){
    this.router.navigate(['customer/rank',id]);
  }

  getRoomTypes() {
    var returnBox = Object.keys(Room.TypeEnum).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
    returnBox.push('all');
    return returnBox;
  }
  getRoomSizes() {
    var returnBox =Object.keys(Room.SizeEnum).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
    returnBox.push('all');
    return returnBox;
  }

  getRoomStates() {
    var returnBox =Object.keys(Room.StateEnum).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
    returnBox.push('all');
    return returnBox;
  }

  getFittingRooms(valueType: String,valueSize:String,valueState:String, valueMin, valueMax){
    //console.log(valueType,valueSize,valueState,valueMax,valueMin)
    var returnBox = this.rooms;
    if(valueType != undefined && (valueType.startsWith('P')||valueType.startsWith('C')))
    {returnBox = returnBox.filter(room=>{return room.type === valueType});}
    if(valueSize != undefined && (valueSize.startsWith('M')||valueSize.startsWith('I')))
    {returnBox = returnBox.filter(room=>{return room.size === valueSize});}
    if(valueState != undefined && (valueState.startsWith('F')||valueState.startsWith('O')||valueState.startsWith('C')))
    {returnBox = returnBox.filter(room=>{return room.state === valueState});}
    if(valueMin != undefined || valueMin != null)
    {returnBox = returnBox.filter(room=>{return room.price >= valueMin});}
    if(valueMax != undefined || valueMax != null)
    {returnBox = returnBox.filter(room=>{return room.price <= valueMax});}
    return returnBox;
  }
}