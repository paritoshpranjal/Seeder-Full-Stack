package com.seeder.paymentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {

    @Max(value = 32, message = "Id must be at most 32")
    private int id;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date dueDate;

    @Pattern(regexp = "^[a-zA-Z]+$", message = "Status must contain only letters")
    private String status;

    @NotNull(message = "Amount cannot be null")
    @PositiveOrZero(message = "Amount must be a positive or zero double value")
    
    private double outstandingAmount;

    @NotNull(message = "Amount cannot be null")
    @PositiveOrZero(message = "Amount must be a positive or zero double value")
    
    private double expectedAmount;

    @PositiveOrZero(message = "UserId must be a positive integer")
    @Max(value = Integer.MAX_VALUE, message = "UserId must be at most 10 digits")
    @Digits(integer = 10, fraction = 0, message = "UserId must be a positive integer with at most 10 digits")
    private int userId;
}
