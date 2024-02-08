package com.seeder.userservice.repository;

import com.seeder.userservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    public UserEntity findByEmail(String email);
}
