package com.seeder.paymentservice.mapper;

import com.seeder.paymentservice.dto.PaymentDto;
import com.seeder.paymentservice.entity.Payment;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {
    private final ModelMapper modelMapper;

    public PaymentMapper(ModelMapper modelMapper) {
        this.modelMapper = new ModelMapper();
    }

    public Payment convertToEntity(PaymentDto paymentDto) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(paymentDto, Payment.class);
    }

    public PaymentDto convertToDto(Payment payment) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(payment, PaymentDto.class);
    }
}
