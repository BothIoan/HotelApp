import { Component, OnInit } from '@angular/core';
import { Booking } from 'build/openapi/model/models';
import { BookingControllerService, RoomControllerService } from 'build/openapi';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-booking',
  templateUrl: './customer-booking.component.html',
  styleUrls: ['./customer-booking.component.css']
})
export class CustomerBookingComponent implements OnInit {

  toValidate
  flag: boolean
  booking: Booking = {
    valability : Booking.ValabilityEnum.PENDING,
    ranking: -1
  };
  constructor(private bookingService : BookingControllerService, private router: Router,private roomService : RoomControllerService,private route: ActivatedRoute) { }

  onSubmit(){
    this.validation()
    if(this.flag == true)
    {
      this.booking.duration = this.toValidate
      this.bookingService.createBooking(this.booking).subscribe(data => console.log(data),error => console.log(error));
      this.router.navigate(['customer/rooms']);
    }
  }

  ngOnInit(): void {
    this.roomService.getRoomById(this.route.snapshot.params['id'])
    .subscribe(data => {this.booking.room = data;})
  }

  validation(): boolean{
    
    if(isNaN(this.toValidate)) this.flag = false;
    else
    if(this.toValidate <= 0 || this.toValidate == null || this.toValidate == undefined) this.flag = false;
    else
    this.flag = true;
    return !(this.flag);
  }
}