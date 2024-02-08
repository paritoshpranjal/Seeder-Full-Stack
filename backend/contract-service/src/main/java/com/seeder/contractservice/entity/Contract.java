package com.seeder.contractservice.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "contract")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "rate_of_interest")
    private double rateOfInterest;

    @Column(name = "payment_amount")
    private double paymentAmount;

    @Column(name = "term_length")
    private int termLength;

    @Column(name = "total_available")
    private double totalAvailable;

    @Column(name = "total_financed")
    private double totalFinanced;

    @Column(name = "status")
    private String status;

    @Column(name = "per_payment")
    private double perPayment;

    @Column(name = "partial_amount")
    private double partialAmount;


}