import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToRooms(){
    this.router.navigate(['admin/rooms/all'])
  }
  goToWaiters(){
    this.router.navigate(['waiters/all'])
  }
}
