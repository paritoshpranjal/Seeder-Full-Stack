package com.seeder.contractservice.controller;

import com.seeder.contractservice.controller.SelectedContractController;
import com.seeder.contractservice.dto.SelectedContractDTO;
import com.seeder.contractservice.entity.SelectedContract;
import com.seeder.contractservice.service.SelectedContractService;
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
class SelectedContractControllerTest {

    @Mock
    private SelectedContractService selectedContractService;

    @InjectMocks
    private SelectedContractController selectedContractController;

    @Test
    void findAllContracts_shouldReturnListOfContracts() {
        // Arrange
        List<SelectedContract> selectedContracts = Arrays.asList(
                new SelectedContract(1, 101, 1, 1),
                new SelectedContract(2, 102, 2, 2)
        );
        when(selectedContractService.findAllSelectedContracts()).thenReturn(selectedContracts);

        // Act
        ResponseEntity<List<SelectedContract>> responseEntity = selectedContractController.findAllContracts();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(selectedContracts, responseEntity.getBody());
    }

    @Test
    void findContractsByUserId_shouldReturnContractsByUserId() {
        // Arrange
        int userId = 1;
        List<SelectedContract> selectedContracts = Arrays.asList(
                new SelectedContract(1, userId, 1, 1),
                new SelectedContract(2, userId, 2, 2)
        );
        when(selectedContractService.getSelectedContractsByUserID(userId)).thenReturn(selectedContracts);

        // Act
        ResponseEntity<List<SelectedContract>> responseEntity = selectedContractController.findContractsByUserId(userId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(selectedContracts, responseEntity.getBody());
    }

    @Test
    void findContractsByCashKickId_shouldReturnContractsByCashKickId() {
        // Arrange
        int cashKickId = 101;
        List<SelectedContract> selectedContracts = Arrays.asList(
                new SelectedContract(1, 1, cashKickId, 1),
                new SelectedContract(2, 2, cashKickId, 2)
        );
        when(selectedContractService.getSelectedContractsByCashKickId(cashKickId)).thenReturn(selectedContracts);

        // Act
        ResponseEntity<List<SelectedContract>> responseEntity = selectedContractController.findContractsByCashKickId(cashKickId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(selectedContracts, responseEntity.getBody());
    }

    @Test
    void saveContract_shouldReturnSavedContractDTO() {
        // Arrange
        SelectedContractDTO selectedContractDTO = new SelectedContractDTO(1, 101, 1, 1);
        when(selectedContractService.saveContract(selectedContractDTO)).thenReturn(selectedContractDTO);

        // Act
        ResponseEntity<SelectedContractDTO> responseEntity = selectedContractController.saveContract(selectedContractDTO);

        // Assert
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(selectedContractDTO, responseEntity.getBody());
    }
}
