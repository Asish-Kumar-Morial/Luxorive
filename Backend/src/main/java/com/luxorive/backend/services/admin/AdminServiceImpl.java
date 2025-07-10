package com.luxorive.backend.services.admin;

import com.luxorive.backend.dto.BidDTO;
import com.luxorive.backend.dto.CarDTO;
import com.luxorive.backend.dto.SearchCarDTO;
import com.luxorive.backend.enums.BidStatus;
import com.luxorive.backend.model.Bid;
import com.luxorive.backend.model.Car;
import com.luxorive.backend.repository.BidRepository;
import com.luxorive.backend.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final CarRepository carRepository;

    private final BidRepository bidRepository;

    @Override
    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDTO).collect(Collectors.toList());
    }

    @Override
    public CarDTO getCarById(Long Id) {
        Optional<Car> optionalCar = carRepository.findById(Id);
        return optionalCar.map(Car::getCarDTO).orElse(null);
    }

    @Override
    public void deleteCar(Long Id) {
        carRepository.deleteById(Id);
    }

    @Override
    public List<CarDTO> searchCar(SearchCarDTO searchCarDTO) {
        Car car = new Car();
        car.setBrand(searchCarDTO.getBrand());
        car.setType(searchCarDTO.getType());
        car.setColor(searchCarDTO.getColor());
        car.setTransmission(searchCarDTO.getTransmission());
        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll()
                .withMatcher("brand", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("type", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("color", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("transmission", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());
        Example<Car> carExample = Example.of(car, exampleMatcher);
        List<Car> cars = carRepository.findAll(carExample);
        return cars.stream().map(Car::getCarDTO).collect(Collectors.toList());
    }

    @Override
    public List<BidDTO> getBids() {
        return bidRepository.findAll().stream().map(Bid::getBidDTO).collect(Collectors.toList());

    }

    @Override
    public boolean changeBidStatus(Long bidId, String status) {
        Optional<Bid> optionalBid = bidRepository.findById(bidId);
        if (optionalBid.isPresent()) {
            Bid existingBid = optionalBid.get();
            if (Objects.equals(status, "Approve"))
                existingBid.setBidStatus(BidStatus.APPROVED);
            else
                existingBid.setBidStatus(BidStatus.REJECTED);
            bidRepository.save(existingBid);
            return true;
        }
        return false;
    }
}
