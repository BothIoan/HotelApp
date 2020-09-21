import { Component, OnInit } from '@angular/core';
import {BookingControllerService} from 'build/openapi/api/bookingController.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subscriber} from 'rxjs';
import {Booking} from 'build/openapi';

@Component({
  selector: 'app-rank-booking',
  templateUrl: './rank-booking.component.html',
  styleUrls: ['./rank-booking.component.css']
})
export class RankBookingComponent implements OnInit {
  booking :Booking;
  constructor(private bookingService: BookingControllerService,private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.bookingService.getBookingById(this.route.snapshot.params['id']).subscribe(data=>{this.booking = data});
    }
  
    onSubmit(){
      this.bookingService.updateBooking(this.booking.id,this.booking)
      .subscribe(data=> {this.booking = data;
      this.router.navigate(['room',this.route.snapshot.params['roomId'],'bookings']);})
    }
}
