package com.luxorive.backend.controller;

import com.luxorive.backend.dto.BidDTO;
import com.luxorive.backend.dto.CarDTO;
import com.luxorive.backend.dto.SearchCarDTO;
import com.luxorive.backend.services.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/car")
    public ResponseEntity<?> addCar(@ModelAttribute CarDTO carDTO) throws IOException {
        boolean success = customerService.createCar(carDTO);
        if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getAllCars(){
        return ResponseEntity.ok(customerService.getAllCars());
    }

    @GetMapping("/car/{Id}")
    public ResponseEntity<CarDTO> getCarById(@PathVariable Long Id){
        return ResponseEntity.ok(customerService.getCarById(Id));
    }

    @DeleteMapping("/car/{Id}")
    public ResponseEntity<?> deleteCarById(@PathVariable Long Id){
        if (Id == null) {
            return ResponseEntity.badRequest().body("Car ID is required");
        }
        customerService.deleteCar(Id);
        return ResponseEntity.ok(null);
    }

    @PutMapping("/car/{Id}")
    public ResponseEntity<?> updateCar(@PathVariable Long Id, @ModelAttribute CarDTO carDTO) throws IOException {
        boolean success = customerService.updateCar(Id,carDTO);
        if (success) return ResponseEntity.status(HttpStatus.OK).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/car/search")
    public ResponseEntity<List<CarDTO>> searchCar(@RequestBody SearchCarDTO search){
        return ResponseEntity.ok(customerService.searchCar(search));
    }

    @GetMapping("/my-cars/{userId}")
    public ResponseEntity<List<CarDTO>> getMyCars(@PathVariable Long userId){
        return ResponseEntity.ok(customerService.getMyCars(userId));
    }

    @PostMapping("/car/bid")
    public ResponseEntity<?> bidCar(@RequestBody BidDTO bidDTO) {
        boolean success = customerService.bidCar(bidDTO);
        if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/car/bids/by-user/{userId}")
    public ResponseEntity<List<BidDTO>> getBidsByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(customerService.getBidsByUserId(userId));
    }

    @GetMapping("/car/bids/by-car/{carId}")
    public ResponseEntity<List<BidDTO>> getBidsByCarId(@PathVariable Long carId){
        return ResponseEntity.ok(customerService.getBidsByCarId(carId));
    }

    @GetMapping("/car/bid/{bidId}/{status}")
    public ResponseEntity<?> changeBidStatus(@PathVariable Long bidId, @PathVariable String status){
        boolean success = customerService.changeBidStatus(bidId,status);
        if (success) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/car/analytics/{userId}")
    public ResponseEntity<?> getAnalytics(@PathVariable Long userId){
        return ResponseEntity.ok(customerService.getAnalytics(userId));
    }

}
