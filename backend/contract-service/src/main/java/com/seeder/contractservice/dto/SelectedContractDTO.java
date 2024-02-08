package com.seeder.contractservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SelectedContractDTO {
    private int id;
    private int userId;
    private int cashKickId;
    private int contractId;
}
