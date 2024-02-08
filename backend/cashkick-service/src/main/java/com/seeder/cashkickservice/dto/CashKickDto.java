package com.seeder.cashkickservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CashKickDto {

    private int id;
    private String name;
    private Date maturity;
    private BigDecimal totalFinanced;
    private String status;
    private BigDecimal totalReceived;
    private int userId;

}
