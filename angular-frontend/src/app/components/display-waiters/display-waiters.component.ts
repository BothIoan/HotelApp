import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {WaiterControllerService} from 'build/openapi/api/waiterController.service';
import { Waiter } from 'build/openapi';
import {Router} from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-display-waiters',
  templateUrl: './display-waiters.component.html',
  styleUrls: ['./display-waiters.component.css']
})
export class DisplayWaitersComponent implements OnInit {

  waiters: Observable<Waiter[]>;

  constructor(private waiterService: WaiterControllerService, private router: Router) {}

  ngOnInit(): void {
    console.log("test");
    this.waiters =this.waiterService.getAllWaiters();
  }

  deleteWaiter(id: number){
    this.waiterService.deleteWaiter(id).subscribe();
  }

  editWaiter(id: number){
    this.router.navigate(['waiter/edit',id]);
  }

  createWaiter(){
    this.router.navigate(['/waiter/create']);
  }
}
