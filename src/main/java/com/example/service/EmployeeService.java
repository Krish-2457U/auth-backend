package com.example.service;

import com.example.model.Employee;
import com.example.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee createEmployee(Employee employee) {
        return repository.save(employee);
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return repository.findById(id);
    }

    public Employee updateEmployee(Long id, Employee updated) {
        return repository.findById(id).map(employee -> {
            employee.setFirstName(updated.getFirstName());
            employee.setLastName(updated.getLastName());
            employee.setEmail(updated.getEmail());
            return repository.save(employee);
        }).orElse(null);
    }

    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
}
