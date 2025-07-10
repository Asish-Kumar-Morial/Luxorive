package com.luxorive.backend.services.customer;

import com.luxorive.backend.dto.AnalyticsDTO;
import com.luxorive.backend.dto.BidDTO;
import com.luxorive.backend.dto.CarDTO;
import com.luxorive.backend.dto.SearchCarDTO;

import java.io.IOException;
import java.util.List;

public interface CustomerService {

    boolean createCar(CarDTO carDTO) throws IOException;

    List<CarDTO> getAllCars();

    CarDTO getCarById(Long id);

    void deleteCar(Long id);

    boolean updateCar(Long id, CarDTO carDTO) throws IOException;

    List<CarDTO> searchCar(SearchCarDTO searchCarDTO);

    List<CarDTO> getMyCars(Long userId);

    boolean bidCar(BidDTO bidDTO);

    List<BidDTO> getBidsByUserId(Long userId);

    List<BidDTO> getBidsByCarId(Long carId);

    boolean changeBidStatus(Long bidId, String status);

    AnalyticsDTO getAnalytics(Long userId);

}
