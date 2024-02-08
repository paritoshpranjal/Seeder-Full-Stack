package com.seeder.contractservice.service;

import com.seeder.contractservice.dto.ContractDTO;
import com.seeder.contractservice.entity.Contract;
import com.seeder.contractservice.exception.ContractNotFoundException;
import com.seeder.contractservice.repository.ContractRepository;
import com.seeder.contractservice.service.implementation.ContractServiceImpl;
import com.seeder.contractservice.utils.mapper.ContractMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContractServiceImplTest {

    @Mock
    private ContractRepository contractRepository;

    @Mock
    private ContractMapper contractMapper;

    @InjectMocks
    private ContractServiceImpl contractService;

    @Test
    void getAllContracts_shouldReturnListOfContracts() {
        // Arrange
        List<Contract> contracts = Arrays.asList(
                new Contract(1, "Contract1", "Type1", 5.0, 100.0, 12, 1000.0, 500.0, "ACTIVE", 50.0, 20.0),
                new Contract(2, "Contract2", "Type2", 7.5, 150.0, 24, 2000.0, 1000.0, "INACTIVE", 75.0, 30.0)
        );
        List<ContractDTO> contractDTOs = Arrays.asList(
                new ContractDTO(1, "Contract1", "Type1", 5.0, 100.0, 12, 1000.0, 500.0, "ACTIVE", 50.0, 20.0),
                new ContractDTO(2, "Contract2", "Type2", 7.5, 150.0, 24, 2000.0, 1000.0, "INACTIVE", 75.0, 30.0)
        );
        when(contractRepository.findAll()).thenReturn(contracts);
        when(contractMapper.entityToDTO(any())).thenReturn(new ContractDTO()); // You can customize the behavior based on your mapper logic

        // Act
        List<ContractDTO> result = contractService.getAllContracts();

        // Assert
        assertEquals(contractDTOs.size(), result.size());

    }

    @Test
    void getContractById_shouldReturnContractById() {
        // Arrange
        int contractId = 1;
        Contract contract = new Contract(contractId, "Contract1", "Type1", 5.0, 100.0, 12, 1000.0, 500.0, "ACTIVE", 50.0, 20.0);
        ContractDTO contractDTO = new ContractDTO(contractId, "Contract1", "Type1", 5.0, 100.0, 12, 1000.0, 500.0, "ACTIVE", 50.0, 20.0);
        when(contractRepository.findById(contractId)).thenReturn(Optional.of(contract));
        when(contractMapper.entityToDTO(contract)).thenReturn(contractDTO);

        // Act
        ContractDTO result = contractService.getContractById(contractId);

        // Assert
        assertEquals(contractDTO, result);
    }

    @Test
    void getContractById_shouldThrowContractNotFoundException() {
        // Arrange
        int nonExistingContractId = 99;
        when(contractRepository.findById(nonExistingContractId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(ContractNotFoundException.class, () -> contractService.getContractById(nonExistingContractId));
    }
}
