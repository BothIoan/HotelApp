import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import {RoomControllerService} from 'build/openapi/api/roomController.service';
import { Waiter, Room } from 'build/openapi';
import {Router} from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {


  private _roomType : Room.TypeEnum;
  private _roomSize : Room.SizeEnum;
  private _roomState: Room.StateEnum;
  private _roomPriceMin : number;
  private _roomPriceMax : number;
  rooms: Room[];
  filteredRooms :Room[];
  constructor(private roomService: RoomControllerService, private router: Router,   private changeDetectorRefs: ChangeDetectorRef) {}
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

  deleteRoom(id: number){
    this.roomService.deleteRoom(id).subscribe();
  }

  editRoom(id: number){
    this.router.navigate(['admin/room/edit',id]);
  }
  createRoom(){
    this.router.navigate(['/room/create']);
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

  getPDF() {
  PdfMakeWrapper.setFonts(pdfFonts);
  var pdf = new PdfMakeWrapper();
  this.roomService.getAllRooms().subscribe(
    x=> {
      var jsonu = JSON.stringify(x);
      pdf.add(jsonu);
      pdf.create().download();
    });
  }

  getTXT(){
    this.roomService.getAllRooms().subscribe(
      x=> {
      var txtu = JSON.stringify(x);
      var element = document.createElement('a');
      element.setAttribute('href', "data:text/plain;charset=UTF-8," + encodeURIComponent(txtu));
      element.setAttribute('download', "report.txt");
      //element.style.display = 'none';
      document.body.appendChild(element);
      element.click(); // simulate click
      document.body.removeChild(element);}
    );
  }
}