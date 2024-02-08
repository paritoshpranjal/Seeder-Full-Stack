package com.seeder.paymentservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seeder.paymentservice.dto.PaymentDto;
import com.seeder.paymentservice.service.PaymentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class PaymentControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();
    @Mock
    private PaymentService paymentService;
    @InjectMocks
    private PaymentController paymentController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllPayments() {
        when(paymentService.getAllPayments()).thenReturn(Collections.emptyList());

        ResponseEntity<List<PaymentDto>> responseEntity = paymentController.getAllPayments();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(Collections.emptyList(), responseEntity.getBody());
        verify(paymentService, times(1)).getAllPayments();
    }

    @Test
    void testGetPaymentByUserId() {
        int userId = 1;
        List<PaymentDto> mockPaymentList = new ArrayList<>();
        mockPaymentList.add(new PaymentDto());

        when(paymentService.getPaymentByUserId(userId)).thenReturn(mockPaymentList);

        ResponseEntity<List<PaymentDto>> responseEntity = paymentController.getPaymentByUserId(userId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockPaymentList, responseEntity.getBody());

        verify(paymentService, times(1)).getPaymentByUserId(userId);
    }

    @Test
    void testSavePaymentDetails() {
        PaymentDto mockPaymentDto = new PaymentDto();

        when(paymentService.savePayment(mockPaymentDto)).thenReturn(mockPaymentDto);

        ResponseEntity<PaymentDto> responseEntity = paymentController.savePaymentDetails(mockPaymentDto);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(mockPaymentDto, responseEntity.getBody());

        verify(paymentService, times(1)).savePayment(mockPaymentDto);
    }
}
