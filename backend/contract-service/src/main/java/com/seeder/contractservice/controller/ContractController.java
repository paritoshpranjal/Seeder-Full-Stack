package com.seeder.contractservice.controller;

import com.seeder.contractservice.dto.ContractDTO;


import com.seeder.contractservice.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/contracts")
public class ContractController {

    private final ContractService contractService;

    @Autowired
    public ContractController(ContractService contractService){
        this.contractService=contractService;
    }

    @GetMapping
    ResponseEntity<List<ContractDTO>> getAllContracts(){
        log.info("Request received to fetch all contracts.");
        return ResponseEntity.ok(contractService.getAllContracts());
    }

    @GetMapping("/{contractId}")
    ResponseEntity<ContractDTO> getContractById(@PathVariable  int contractId){
        log.info("Request received to fetch contract by contractId.");
        return ResponseEntity.ok(contractService.getContractById(contractId));
    }

}
