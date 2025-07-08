package com.luxorive.backend.dto;

import com.luxorive.backend.enums.UserRole;
import lombok.Data;

@Data
public class UserDTO {

    private Long Id;
    private String name;
    private String email;
    private UserRole userRole;
}
