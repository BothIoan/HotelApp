import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateWaiterComponent } from './components/create-waiter/create-waiter.component';
import { DisplayWaitersComponent } from './components/display-waiters/display-waiters.component';
import { EditWaiterComponent } from './components/edit-waiter/edit-waiter.component';
import { ApiModule } from 'build/openapi';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DisplayRoomsComponent } from './components/display-rooms/display-rooms.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { DisplayBookingsComponent } from './components/display-bookings/display-bookings.component';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { RankBookingComponent } from './components/rank-booking/rank-booking.component';
import { LoginComponent } from './components/login/login.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminRoomsComponent } from './components/admin-rooms/admin-rooms.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerRoomsComponent } from './components/customer-rooms/customer-rooms.component';
import { CustomerBookingComponent } from './components/customer-booking/customer-booking.component';
import { CustomerReviewComponent } from './components/customer-review/customer-review.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateWaiterComponent,
    DisplayWaitersComponent,
    EditWaiterComponent,
    DisplayRoomsComponent,
    EditRoomComponent,
    CreateRoomComponent,
    DisplayBookingsComponent,
    CreateBookingComponent,
    RankBookingComponent,
    LoginComponent,
    UserMenuComponent,
    AdminMenuComponent,
    AdminRoomsComponent,
    CustomerCreateComponent,
    CustomerRoomsComponent,
    CustomerBookingComponent,
    CustomerReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
