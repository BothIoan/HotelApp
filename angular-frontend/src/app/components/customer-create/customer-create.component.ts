import { Component, OnInit } from '@angular/core';
import { CustomerControllerService, Customer } from 'build/openapi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {


  customer: Customer = {
    username:'',
    email:'',
    password:''
  };

  constructor(private customerService : CustomerControllerService, private router:Router) {}
  
  newWaiter():void{
    this.customer = {
      username: '',
      password:'',
      email:''
    };
  }

  onSubmit(){
    this.customerService.createCustomer(this.customer).subscribe(data => console.log(data),error => console.log(error));
    this.customer = {
      username:'',
      password:'',
      email:''
    };
    this.router.navigate(['login/all']);
  }

  ngOnInit(): void {
  }

}