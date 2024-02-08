package com.seeder.paymentservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "due_date")
    private Date dueDate;
    @Column(name = "status")
    private String status;
    @Column(name = "outstanding_amount")
    private double outstandingAmount;
    @Column(name = "expected_amount")
    private double expectedAmount;
    @Column(name = "user_id")
    private int userId;
}
