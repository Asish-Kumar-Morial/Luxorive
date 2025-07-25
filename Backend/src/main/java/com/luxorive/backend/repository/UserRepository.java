package com.luxorive.backend.repository;

import com.luxorive.backend.enums.UserRole;
import com.luxorive.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByEmail(String email);

    Optional<User> findByUserRole(UserRole userRole);
}
