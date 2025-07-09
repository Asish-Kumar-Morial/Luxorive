package com.luxorive.backend.services.auth;

import com.luxorive.backend.dto.SignupRequest;
import com.luxorive.backend.dto.UserDTO;
import com.luxorive.backend.enums.UserRole;
import com.luxorive.backend.model.User;
import com.luxorive.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;

    @PostConstruct
    public void createAdminAccount() {
        Optional<User> optionalAdmin = userRepository.findByUserRole(UserRole.ADMIN);
        if (optionalAdmin.isEmpty()) {
            User admin = new User();
            admin.setName("Asish");
            admin.setEmail("asish@gmail.com");
            admin.setUserRole(UserRole.ADMIN);
            admin.setPassword(new BCryptPasswordEncoder().encode("asish2003"));
            userRepository.save(admin);
            System.out.println("Admin account created successfully");
        }   else {
            System.out.println("Admin account already exists!");
        }
    }

    @Override
    public UserDTO signup(SignupRequest signupRequest) {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.CUSTOMER);
        return userRepository.save(user).getUserDTO();
    }

    @Override
    public Boolean hasUserWithEmail(String email) {
        return userRepository.findUserByEmail(email).isPresent();
    }
}
