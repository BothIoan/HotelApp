import { Component, OnInit } from '@angular/core';
import {WaiterControllerService} from 'build/openapi/api/waiterController.service';
import {Router} from '@angular/router';
import {AdminControllerService} from 'build/openapi/api/adminController.service';
import {Observable} from 'rxjs';
import {Waiter, CustomerControllerService, Customer} from 'build/openapi'
import {Admin } from 'build/openapi'
import { build$ } from 'protractor/built/element';
import { AssertNotNull } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: ''
    password: '' 
    private waiter: Waiter ={
      id: -1,
      email: '',
      password: '',
      username: ''
    }
    private admin : Admin={
      id: -1,
      email: '',
      password: '',
      username: ''
    }
    private customer : Customer={
      id: -1,
      email: '',
      password: '',
      username: ''
    }
  
  constructor(private router: Router ,private adminService:AdminControllerService, private waiterService: WaiterControllerService, private customerService: CustomerControllerService) {}
  
  navAdmin(i:number){
    if(i != -1)
    this.router.navigate(['menu/admin']);
  }
  navWaiter(i:number){
    if(i != -1)
    this.router.navigate(['menu/waiter']);
  }
  navCustomer(i: number){
    if(i!=-1)
    this.router.navigate(['customer/rooms']);
  }
  onSubmit(){
    this.adminService.getAdminByEmailAndPassword(this.email,this.password).subscribe(adminu=>{this.admin = adminu;this.navAdmin(this.admin.id)});
    this.waiterService.getWaiterByEmailAndPassword(this.email,this.password).subscribe(waiteru=>{this.waiter = waiteru;this.navWaiter(this.waiter.id)});
    this.customerService.getCustomerByEmailAndPassword(this.email,this.password).subscribe(customeru=>{this.customer = customeru;this.navCustomer(this.customer.id)});
    console.log("fail")
  }
  createNewCustomer(){
    this.router.navigate(['customer/create']);
  }

  ngOnInit(): void {
  }

}
