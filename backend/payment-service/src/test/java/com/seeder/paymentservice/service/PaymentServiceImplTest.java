package com.seeder.paymentservice.service;

import com.seeder.paymentservice.dto.PaymentDto;
import com.seeder.paymentservice.entity.Payment;
import com.seeder.paymentservice.exception.ErrorException;
import com.seeder.paymentservice.exception.NotFound;
import com.seeder.paymentservice.mapper.PaymentMapper;
import com.seeder.paymentservice.repository.PaymentRepository;
import com.seeder.paymentservice.service.impl.PaymentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PaymentServiceImplTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private PaymentMapper paymentMapper;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllPayments() {
        List<Payment> paymentList = new ArrayList<>();
        when(paymentRepository.findAll()).thenReturn(paymentList);

        List<PaymentDto> result = paymentService.getAllPayments();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(paymentRepository, times(1)).findAll();
    }

    @Test
    void getPaymentByUserIdNotFound() {
        int userId = 1;
        when(paymentRepository.findByUserId(userId)).thenReturn(null);

        assertThrows(ErrorException.class, () -> paymentService.getPaymentByUserId(userId));
        verify(paymentRepository, times(1)).findByUserId(userId);
        verify(paymentMapper, never()).convertToDto(any());
    }


    @Test
    void getAllPaymentsWithException() {
        when(paymentRepository.findAll()).thenThrow(new RuntimeException("Simulated error during findAll"));

        assertThrows(ErrorException.class, () -> paymentService.getAllPayments());
        verify(paymentRepository, times(1)).findAll();
        verify(paymentMapper, never()).convertToDto(any());
    }

    @Test
    void testGetPaymentByUserId() {
        // Arrange
        int userId = 1;
        List<Payment> mockPayments = new ArrayList<>();
        Payment mockPayment = new Payment();
        mockPayments.add(mockPayment);

        when(paymentRepository.findByUserId(userId)).thenReturn(mockPayments);
        when(paymentMapper.convertToDto(mockPayment)).thenReturn(new PaymentDto());

        List<PaymentDto> result = paymentService.getPaymentByUserId(userId);

        assertNotNull(result);
        assertEquals(1, result.size());

        verify(paymentRepository, times(1)).findByUserId(userId);

        verify(paymentMapper, times(1)).convertToDto(mockPayment);
    }

    @Test
    void testGetPaymentByUserIdNotFound() {
        int userId = 2;

        when(paymentRepository.findByUserId(userId)).thenReturn(null);

        Exception exception = assertThrows(ErrorException.class, () -> paymentService.getPaymentByUserId(userId));

        verify(paymentRepository, times(1)).findByUserId(userId);

        assertInstanceOf(NotFound.class, exception.getCause());
        assertEquals("Payment with userID: 2 is not found", exception.getCause().getMessage());
    }

    @Test
    void testGetPaymentByUserIdWithError() {
        int userId = 3;

        when(paymentRepository.findByUserId(userId)).thenThrow(new RuntimeException("Simulated error"));

        assertThrows(ErrorException.class, () -> paymentService.getPaymentByUserId(userId));

        verify(paymentRepository, times(1)).findByUserId(userId);
    }

    @Test
    void savePayment() {
        PaymentDto paymentDto = new PaymentDto();
        Payment savePayment = new Payment();
        when(paymentMapper.convertToEntity(paymentDto)).thenReturn(savePayment);
        when(paymentRepository.save(savePayment)).thenReturn(savePayment);
        when(paymentMapper.convertToDto(savePayment)).thenReturn(paymentDto);

        PaymentDto result = paymentService.savePayment(paymentDto);

        assertNotNull(result);
        verify(paymentMapper, times(1)).convertToEntity(paymentDto);
        verify(paymentRepository, times(1)).save(savePayment);
        verify(paymentMapper, times(1)).convertToDto(savePayment);
    }

    @Test
    void savePaymentWithError() {
        PaymentDto paymentDto = new PaymentDto();
        when(paymentMapper.convertToEntity(paymentDto)).thenReturn(new Payment());
        when(paymentRepository.save(any())).thenThrow(new RuntimeException("Some error"));

        assertThrows(ErrorException.class, () -> paymentService.savePayment(paymentDto));
        verify(paymentMapper, times(1)).convertToEntity(paymentDto);
        verify(paymentRepository, times(1)).save(any());
        verify(paymentMapper, never()).convertToDto(any());
    }
}
