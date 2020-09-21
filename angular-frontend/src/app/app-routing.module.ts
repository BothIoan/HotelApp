import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayWaitersComponent } from './components/display-waiters/display-waiters.component';
import { CreateWaiterComponent } from './components/create-waiter/create-waiter.component';
import { EditWaiterComponent } from './components/edit-waiter/edit-waiter.component';
import { DisplayRoomsComponent } from './components/display-rooms/display-rooms.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { DisplayBookingsComponent } from './components/display-bookings/display-bookings.component';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { RankBookingComponent } from './components/rank-booking/rank-booking.component';
import { LoginComponent } from './components/login/login.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminRoomsComponent } from './components/admin-rooms/admin-rooms.component'
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerRoomsComponent } from './components/customer-rooms/customer-rooms.component';
import { CustomerBookingComponent } from './components/customer-booking/customer-booking.component';
import { CustomerReviewComponent } from './components/customer-review/customer-review.component';

const routes: Routes = [
  {path: 'waiters/all',component: DisplayWaitersComponent},
  {path: 'waiter/create',component:CreateWaiterComponent},
  {path: 'waiter/edit/:id',component:EditWaiterComponent},
  {path: 'rooms/all',component:DisplayRoomsComponent},
  {path: 'room/create', component:CreateRoomComponent},
  {path: 'room/edit/:id', component:EditRoomComponent},
  {path: 'room/:id/bookings', component: DisplayBookingsComponent},
  {path: 'booking/create/:id', component:CreateBookingComponent},
  {path: 'booking/rank/:roomId/:id',component:RankBookingComponent},
  {path: 'login/all',component:LoginComponent},
  {path: 'menu/waiter',component:UserMenuComponent},
  {path: 'menu/admin',component:AdminMenuComponent},
  {path: 'admin/rooms/all', component:AdminRoomsComponent},
  {path: 'customer/create',component:CustomerCreateComponent},
  {path: 'customer/rooms', component:CustomerRoomsComponent},
  {path: 'customer/book/:id',component:CustomerBookingComponent},
  {path: 'customer/rank/:id',component:CustomerReviewComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
