package com.houarizegai.crm.restfulwebservices.service;

import com.houarizegai.crm.restfulwebservices.model.Customer;
import com.houarizegai.crm.restfulwebservices.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer deleteById(long id) {
        Customer customer = findById(id);
        if(customer == null) return null;
        
        customerRepository.deleteById(id);
        return customer;
    }

    public Customer findById(long id) {
        return customerRepository.findById(id).orElse(null);
    }
}
