package com.luxorive.backend.services.admin;

import com.luxorive.backend.dto.BidDTO;
import com.luxorive.backend.dto.CarDTO;
import com.luxorive.backend.dto.SearchCarDTO;

import java.util.List;

public interface AdminService {

    List<CarDTO> getAllCars();

    CarDTO getCarById(Long Id);

    void deleteCar(Long Id);

    List<CarDTO> searchCar(SearchCarDTO searchCarDTO);

    List<BidDTO> getBids();

    boolean changeBidStatus(Long bidId, String status);
}
