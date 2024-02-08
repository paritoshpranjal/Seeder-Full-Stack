package com.seeder.userservice.controller;

import com.seeder.userservice.config.JwtService;
import com.seeder.userservice.dto.AuthDto;
import com.seeder.userservice.dto.UserDto;
import com.seeder.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

import static com.seeder.userservice.utils.constants.AppConstants.*;

@RestController
@Slf4j
@RequestMapping(BASE_URL)
public class UserController {
    private UserService userService;

    private JwtService jwtService;

    @Autowired
    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    @GetMapping
    public ResponseEntity<List<UserDto>> getAll() {
        log.info("Request received at getAllUsers.");
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping(EMAIL)
    public ResponseEntity<UserDto> getByEmail(@RequestParam String email) {
        log.info("Request received at getByEmail.");
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @PostMapping(SIGN_UP)
    public ResponseEntity<UserDto> create(@RequestBody UserDto userDTO) {
        log.info("Request received at createUser.");
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userDTO));
    }

    @PostMapping(LOGIN)
    public String getToken(@RequestBody AuthDto auth){
        log.info("Inside getToken method in Controller Layer");
        return jwtService.generateToken(auth.getEmail(), auth.getPassword());
    }

    @PatchMapping(RESET_PASSWORD)
    public ResponseEntity<UserDto> updatePassword(
            @PathVariable int id,
            @RequestBody UserDto userDto) {
        log.info("Request received at updatePassword.");
        return ResponseEntity.ok(userService.updatePassword(id, userDto));
    }

    @PutMapping(UPDATE_CREDIT)
    public ResponseEntity<UserDto> updateAvailableBalance(
            @PathVariable int id,
            @RequestBody UserDto userDto) {
        log.info("Request received at updateAvailableBalance.");
        UserDto updatedUser = userService.updateAvailableCredit(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

}