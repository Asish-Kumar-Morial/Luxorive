package com.luxorive.backend.controller;

import com.luxorive.backend.dto.BidDTO;
import com.luxorive.backend.dto.CarDTO;
import com.luxorive.backend.dto.SearchCarDTO;
import com.luxorive.backend.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getAllCars(){
        return ResponseEntity.ok(adminService.getAllCars());
    }

    @GetMapping("/car/{Id}")
    public ResponseEntity<?> getCarById(@PathVariable Long Id){
        if (Id == null) {
            return ResponseEntity.badRequest().body("Car ID is required");
        }
        return ResponseEntity.ok(adminService.getCarById(Id));
    }

    @DeleteMapping("/car/{Id}")
    public ResponseEntity<?> deleteCarById(@PathVariable Long Id){
        if (Id == null) {
            return ResponseEntity.badRequest().body("Car ID is required");
        }
        adminService.deleteCar(Id);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/car/search")
    public ResponseEntity<List<CarDTO>> searchCar(@RequestBody SearchCarDTO search){
        return ResponseEntity.ok(adminService.searchCar(search));
    }

    @GetMapping("/car/bids")
    public ResponseEntity<List<BidDTO>> getBids(){
        return ResponseEntity.ok(adminService.getBids());
    }

    @GetMapping("/car/bids/{bidId}/{status}")
    public ResponseEntity<?> changeBidStatus(@PathVariable Long bidId, @PathVariable String status){
        boolean success = adminService.changeBidStatus(bidId,status);
        if (success) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
