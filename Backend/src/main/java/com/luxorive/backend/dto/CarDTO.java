package com.luxorive.backend.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class CarDTO {

    private Long Id;

    private String name;

    private String brand;

    private String type;

    private String transmission;

    private String color;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date year;

    private Date model;

    private Boolean sold;

    private Long price;

    private String description;

    private MultipartFile img;

    private Long userId;

    private byte[] returnedImg;
}
