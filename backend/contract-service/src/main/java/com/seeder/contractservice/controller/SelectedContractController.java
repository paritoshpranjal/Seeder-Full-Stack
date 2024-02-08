package com.seeder.contractservice.controller;

import com.seeder.contractservice.dto.SelectedContractDTO;
import com.seeder.contractservice.entity.SelectedContract;
import com.seeder.contractservice.service.SelectedContractService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/contracts/cashkick-contract")
public class SelectedContractController {

    private final SelectedContractService selectedContractService;

    public SelectedContractController(SelectedContractService selectedContractService){
        this.selectedContractService=selectedContractService;
    }
    @GetMapping
    public ResponseEntity<List<SelectedContract>> findAllContracts() {
        log.info("Request received to find all contracts.");
        return ResponseEntity.ok(selectedContractService.findAllSelectedContracts());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SelectedContract>> findContractsByUserId(@PathVariable int userId) {
        log.info("Request received to find contracts by userId");
        return ResponseEntity.ok(selectedContractService.getSelectedContractsByUserID(userId));
    }

    @GetMapping("/cashkick/{cashKickId}")
    public ResponseEntity<List<SelectedContract>> findContractsByCashKickId(@PathVariable int cashKickId) {
        log.info("Request received to find contracts by cashkickId.");
        return ResponseEntity.ok(selectedContractService.getSelectedContractsByCashKickId(cashKickId));

    }

    @PostMapping
    public ResponseEntity<SelectedContractDTO> saveContract(@RequestBody SelectedContractDTO theSelectedContractDto) {
        log.info("Request received to save selected contract");
        return ResponseEntity.status(HttpStatus.CREATED).body(selectedContractService.saveContract(theSelectedContractDto));
    }
}
