package com.seeder.paymentservice.service.impl;

import com.seeder.paymentservice.dto.PaymentDto;
import com.seeder.paymentservice.entity.Payment;
import com.seeder.paymentservice.exception.ErrorException;
import com.seeder.paymentservice.exception.NotFound;
import com.seeder.paymentservice.mapper.PaymentMapper;
import com.seeder.paymentservice.repository.PaymentRepository;
import com.seeder.paymentservice.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository, PaymentMapper paymentMapper) {
        this.paymentRepository = paymentRepository;
        this.paymentMapper = paymentMapper;
    }

    @Override
    public List<PaymentDto> getAllPayments() {
        try {
            List<Payment> paymentList = paymentRepository.findAll();
            return paymentList.stream().map(paymentMapper::convertToDto).toList();
        } catch (Exception e) {
            throw new ErrorException("Error retrieving all payments", e);
        }
    }

    @Override
    public List<PaymentDto> getPaymentByUserId(int userId) {
        try {
            List<Payment> existingPayment = paymentRepository.findByUserId(userId);

            if (existingPayment == null) {
                throw new NotFound("Payment with userID: " + userId + " is not found");
            }
            return existingPayment.stream().map(paymentMapper::convertToDto).toList();
        } catch (Exception e) {
            throw new ErrorException("Error retrieving payment for userID: " + userId, e);
        }
    }

    @Override
    public PaymentDto savePayment(PaymentDto paymentDto) {
        try {
            Payment savePayment = paymentMapper.convertToEntity(paymentDto);
            savePayment = paymentRepository.save(savePayment);
            return paymentMapper.convertToDto(savePayment);
        } catch (Exception e) {
            throw new ErrorException("Error saving payment", e);
        }
    }
}
