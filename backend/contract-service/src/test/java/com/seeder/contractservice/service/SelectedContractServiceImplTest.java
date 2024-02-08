package com.seeder.contractservice.service;

import com.seeder.contractservice.dto.SelectedContractDTO;
import com.seeder.contractservice.entity.SelectedContract;
import com.seeder.contractservice.exception.ContractNotFoundException;
import com.seeder.contractservice.repository.SelectedContractsRepository;
import com.seeder.contractservice.service.implementation.SelectedContractServiceImpl;
import com.seeder.contractservice.utils.mapper.SelectedContractMapper;
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
class SelectedContractServiceImplTest {

    @Mock
    private SelectedContractsRepository selectedContractsRepository;

    @Mock
    private SelectedContractMapper selectedContractMapper;

    @InjectMocks
    private SelectedContractServiceImpl selectedContractService;

    @Test
    void findAllSelectedContracts_shouldReturnListOfSelectedContracts() {
        // Arrange
        List<SelectedContract> selectedContracts = Arrays.asList(
                new SelectedContract(1, 101, 1, 1),
                new SelectedContract(2, 102, 2, 2)
        );
        when(selectedContractsRepository.findAll()).thenReturn(selectedContracts);

        // Act
        List<SelectedContract> result = selectedContractService.findAllSelectedContracts();

        // Assert
        assertEquals(selectedContracts.size(), result.size());
        assertEquals(selectedContracts, result);
    }

    @Test
    void getSelectedContractsByUserId_shouldReturnContractsByUserId() {
        // Arrange
        int userId = 1;
        List<SelectedContract> selectedContracts = Arrays.asList(
                new SelectedContract(1, userId, 1, 1),
                new SelectedContract(2, userId, 2, 2)
        );
        when(selectedContractsRepository.findContractsByUserId(userId)).thenReturn(selectedContracts);

        // Act
        List<SelectedContract> result = selectedContractService.getSelectedContractsByUserID(userId);

        // Assert
        assertEquals(selectedContracts.size(), result.size());
        assertEquals(selectedContracts, result);
    }

    @Test
    void getSelectedContractsByUserId_shouldThrowContractNotFoundException() {
        // Arrange
        int userId = 99;
        when(selectedContractsRepository.findContractsByUserId(userId)).thenReturn(Arrays.asList());

        // Act and Assert
        assertThrows(ContractNotFoundException.class, () -> selectedContractService.getSelectedContractsByUserID(userId));
    }

    @Test
    void getSelectedContractsByCashKickId_shouldReturnContractsByCashKickId() {
        // Arrange
        int cashKickId = 101;
        List<SelectedContract> selectedContracts = Arrays.asList(
                new SelectedContract(1, 1, cashKickId, 1),
                new SelectedContract(2, 2, cashKickId, 2)
        );
        when(selectedContractsRepository.findContractsByCashKickId(cashKickId)).thenReturn(selectedContracts);

        // Act
        List<SelectedContract> result = selectedContractService.getSelectedContractsByCashKickId(cashKickId);

        // Assert
        assertEquals(selectedContracts.size(), result.size());
        assertEquals(selectedContracts, result);
    }

    @Test
    void getSelectedContractsByCashKickId_shouldThrowContractNotFoundException() {
        // Arrange
        int cashKickId = 99;
        when(selectedContractsRepository.findContractsByCashKickId(cashKickId)).thenReturn(Arrays.asList());

        // Act and Assert
        assertThrows(ContractNotFoundException.class, () -> selectedContractService.getSelectedContractsByCashKickId(cashKickId));
    }

    @Test
    void saveContract_shouldReturnSavedContractDTO() {
        // Arrange
        SelectedContractDTO selectedContractDTO = new SelectedContractDTO(1, 101, 1, 1);
        SelectedContract selectedContract = new SelectedContract(1, 101, 1, 1);
        when(selectedContractMapper.dtoToEntity(selectedContractDTO)).thenReturn(selectedContract);
        when(selectedContractsRepository.save(selectedContract)).thenReturn(selectedContract);
        when(selectedContractMapper.entityToDTO(selectedContract)).thenReturn(selectedContractDTO);

        // Act
        SelectedContractDTO result = selectedContractService.saveContract(selectedContractDTO);

        // Assert
        assertEquals(selectedContractDTO, result);
    }
}
