package com.seeder.contractservice.controller;

import com.seeder.contractservice.controller.ContractController;
import com.seeder.contractservice.dto.ContractDTO;
import com.seeder.contractservice.service.ContractService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContractControllerTest {

    @Mock
    private ContractService contractService;

    @InjectMocks
    private ContractController contractController;

    @Test
    void getAllContracts_shouldReturnListOfContracts() {
        // Arrange
        List<ContractDTO> contracts = Arrays.asList(
                new ContractDTO(1, "Contract1", "Type1", 5.0, 100.0, 12, 1000.0, 500.0, "ACTIVE", 50.0, 20.0),
                new ContractDTO(2, "Contract2", "Type2", 7.5, 150.0, 24, 2000.0, 1000.0, "INACTIVE", 75.0, 30.0)
        );
        when(contractService.getAllContracts()).thenReturn(contracts);

        // Act
        ResponseEntity<List<ContractDTO>> responseEntity = contractController.getAllContracts();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(contracts, responseEntity.getBody());
    }

    @Test
    void getContractById_shouldReturnContractById() {
        // Arrange
        int contractId = 1;
        ContractDTO contractDTO = new ContractDTO(contractId, "Contract1", "Type1", 5.0, 100.0, 12, 1000.0, 500.0, "ACTIVE", 50.0, 20.0);
        when(contractService.getContractById(contractId)).thenReturn(contractDTO);

        // Act
        ResponseEntity<ContractDTO> responseEntity = contractController.getContractById(contractId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(contractDTO, responseEntity.getBody());
    }
}
