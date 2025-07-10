package com.luxorive.backend.dto;

import com.luxorive.backend.enums.BidStatus;
import lombok.Data;

@Data
public class BidDTO {

    private Long Id;

    private Long price;

    private BidStatus bidStatus;

    private Long userId;

    private Long carId;

    private String userName;

    private String carName;

    private String carBrand;

    private String email;

    private String sellerName;

}
