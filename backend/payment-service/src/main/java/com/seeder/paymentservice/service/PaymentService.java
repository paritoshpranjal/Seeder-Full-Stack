package com.seeder.paymentservice.service;

import com.seeder.paymentservice.dto.PaymentDto;

import java.util.List;

public interface PaymentService {
    List<PaymentDto> getAllPayments();

    List<PaymentDto>getPaymentByUserId(int userId);

    PaymentDto savePayment(PaymentDto paymentDto);
}
