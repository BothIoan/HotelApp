import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {BookingControllerService} from 'build/openapi/api/bookingController.service';
import { Booking } from 'build/openapi';
import {Router,ActivatedRoute} from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-display-bookings',
  templateUrl: './display-bookings.component.html',
  styleUrls: ['./display-bookings.component.css']
})

export class DisplayBookingsComponent implements OnInit {
  roomId: number;
  bookings: Observable<Booking[]>;
  constructor(private bookingService: BookingControllerService,private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.roomId = this.route.snapshot.params['id'];
    this.bookings = this.bookingService.getBookingsByRoomId(this.roomId)
  }
  rankBooking(bId: number){
    this.router.navigate(['/booking/rank',this.roomId,bId]);
  }
  createBooking(){
    this.router.navigate(['/booking/create',this.roomId]);
  }
  checkValability(v: string): boolean{
    if(v.includes('EXP'))return true;
    return false;
  }
  activateBooking(bId: number){
    console.log(bId);
    this.bookingService.activateBooking(bId).subscribe(
      x=>{this.bookings = this.bookingService.getBookingsByRoomId(this.roomId)}
    );
  }
  checkValability2(v: string): boolean{
    if(v.includes('PEN'))return true;
    return false;
  }
  deleteBooking(bId: number){
    this.bookingService.deleteBooking(bId).subscribe(x=>{this.bookings = this.bookingService.getBookingsByRoomId(this.roomId)})
  }
}
