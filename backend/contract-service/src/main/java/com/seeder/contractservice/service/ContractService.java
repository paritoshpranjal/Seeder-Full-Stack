package com.seeder.contractservice.service;

import com.seeder.contractservice.dto.ContractDTO;

import java.util.List;

public interface ContractService {
    List<ContractDTO> getAllContracts();
   ContractDTO getContractById(int contractId);
}
