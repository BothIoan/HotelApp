package HotelApp.controller;


import HotelApp.dataAccessRepos.CustomerRepo;
import HotelApp.model.Admin;
import HotelApp.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class CustomerController {
    @Autowired
    CustomerRepo customerRepo;
    @PostMapping("customer/create")
    public Customer createCustomer(@RequestBody Customer customer){
        customer = customerRepo.save(customer);
        return customer;
    }
    @PutMapping("/customer/{email}/{password}")
    public Customer getCustomerByEmailAndPassword(@PathVariable(value = "email")String email, @PathVariable(value = "password")String password){
        return customerRepo.findByEmailAndPassword(email,password).orElse(Customer.builder().id((long)-1).build());
    }
}
