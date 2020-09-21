import { Component, OnInit } from '@angular/core';
import {BookingControllerService} from 'build/openapi/api/bookingController.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import { Booking, RoomControllerService,Room } from 'build/openapi';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})

export class CreateBookingComponent implements OnInit {
  toValidate
  flag : boolean
  booking: Booking = {
    valability : Booking.ValabilityEnum.ACTIVE,
    ranking: -1
  };
  constructor(private bookingService : BookingControllerService, private router: Router,private roomService : RoomControllerService,private route: ActivatedRoute) { }

  onSubmit(){
    this.validation()
    if(this.flag == true)
    {
      this.booking.duration = this.toValidate;
      this.bookingService.createBooking(this.booking).subscribe();
      this.router.navigate(['room',this.route.snapshot.params['id'],'bookings']);
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
    console.log(this.flag,this.toValidate)
    return !(this.flag);
  }

}
