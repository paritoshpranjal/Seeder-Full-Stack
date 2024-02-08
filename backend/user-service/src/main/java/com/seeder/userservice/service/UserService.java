package com.seeder.userservice.service;

import com.seeder.userservice.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> findAll();
    UserDto findByEmail(String email);
    UserDto save(UserDto user);
    UserDto updatePassword(int id, UserDto userDto);
    UserDto updateAvailableCredit(int id, UserDto userDto);

}
