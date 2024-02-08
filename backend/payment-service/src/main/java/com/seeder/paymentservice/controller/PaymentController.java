package com.seeder.paymentservice.controller;

import com.seeder.paymentservice.dto.PaymentDto;
import com.seeder.paymentservice.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/payments")
@Validated
public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentDto>> getAllPayments() {
        return new ResponseEntity<>(paymentService.getAllPayments(), HttpStatus.OK);
    }


    @GetMapping(params = "userId")
    public ResponseEntity<List<PaymentDto>> getPaymentByUserId(@RequestParam int userId) {
        return new ResponseEntity<>(paymentService.getPaymentByUserId(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PaymentDto> savePaymentDetails(
            @Valid @RequestBody PaymentDto paymentDto) {
        return new ResponseEntity<>(paymentService.savePayment(paymentDto), HttpStatus.CREATED);
    }

}
