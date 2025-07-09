package com.luxorive.backend.services.auth;

import com.luxorive.backend.dto.SignupRequest;
import com.luxorive.backend.dto.UserDTO;

public interface AuthService {

    UserDTO signup(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);
}
