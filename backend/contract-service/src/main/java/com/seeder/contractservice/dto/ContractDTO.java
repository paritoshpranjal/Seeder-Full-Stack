package com.seeder.contractservice.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ContractDTO {

    private int id;
    private String name;
    private String type;
    private double rateOfInterest;
    private double paymentAmount;
    private int termLength;
    private double totalAvailable;
    private double totalFinanced;
    private String status;
    private double perPayment;
    private double partialAmount;
}
