package com.seeder.cashkickservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GenerationType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cashkick")
public class CashKickEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "maturity_date")
    private Date maturity;

    @Column(name = "total_financed")
    private BigDecimal totalFinanced;

    @Column(name = "status")
    private String status;

    @Column(name = "total_received")
    private BigDecimal totalReceived;

    @Column(name = "user_id")
    private int userId;

}
