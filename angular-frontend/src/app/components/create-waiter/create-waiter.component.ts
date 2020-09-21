import { Component, OnInit } from '@angular/core';
import {WaiterControllerService} from 'build/openapi/api/waiterController.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import { Waiter } from 'build/openapi';
@Component({
  selector: 'app-create-waiter',
  templateUrl: './create-waiter.component.html',
  styleUrls: ['./create-waiter.component.css']
})
export class CreateWaiterComponent implements OnInit {

  waiter: Waiter = {
    username:'',
    email:'',
    password:''
  };

  constructor(private waiterService : WaiterControllerService, private router:Router) {}
  
  newWaiter():void{
    this.waiter = {
      username: '',
      password:'',
      email:''
    };
  }

  onSubmit(){
    this.waiterService.createWaiter(this.waiter).subscribe(data => console.log(data),error => console.log(error));
    this.waiter = {
      username:'',
      password:'',
      email:''
    };
    console.log("test");
    this.router.navigate(['/waiters/all']);
  }

  ngOnInit(): void {
  }

}
