package com.seeder.cashkickservice.controller;

import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.service.CashKickService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.seeder.cashkickservice.utils.constants.AppConstants.BASE_URL;
import static com.seeder.cashkickservice.utils.constants.AppConstants.USER_ID;

@RestController
@RequestMapping(BASE_URL)
public class CashKickController {

    private final CashKickService cashKickService;

    @Autowired
    public CashKickController(CashKickService cashKickService) {
        this.cashKickService = cashKickService;
    }

    @GetMapping(USER_ID)
    public ResponseEntity<List<CashKickDto>> getCashKicksByUserId(@PathVariable int userId) {
        List<CashKickDto> cashKicks = cashKickService.getCashKicksByUserId(userId);
        return new ResponseEntity<>(cashKicks, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CashKickDto> postCashKick(@RequestBody CashKickDto cashKickDto) {
        CashKickDto savedCashKick = cashKickService.postCashKick(cashKickDto);
        return new ResponseEntity<>(savedCashKick, HttpStatus.CREATED);
    }
}

