
import { Component, OnInit } from '@angular/core';
import {WaiterControllerService} from 'build/openapi/api/waiterController.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subscriber} from 'rxjs';
import { Waiter } from 'build/openapi';

@Component({
  selector: 'app-edit-waiter',
  templateUrl: './edit-waiter.component.html',
  styleUrls: ['./edit-waiter.component.css']
})
export class EditWaiterComponent implements OnInit {
  waiter: Waiter;
  constructor(private waiterService: WaiterControllerService,private route: ActivatedRoute, private routrer: Router) { }
  
  ngOnInit(): void {
  this.getData();
  }

  getData(){
    this.waiterService.getWaiterById(this.route.snapshot.params['id'])
    .subscribe(data => {this.waiter = data;})
  }

  onSubmit(){
    this.waiterService.updateWaiter(this.waiter.id,this.waiter)
    .subscribe(data=> {this.waiter = data;})
    this.getData();
    this.routrer.navigate(['waiters/all']);
  }

}
