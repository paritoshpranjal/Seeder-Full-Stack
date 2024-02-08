package com.seeder.contractservice.service;


import com.seeder.contractservice.dto.SelectedContractDTO;
import com.seeder.contractservice.entity.SelectedContract;

import java.util.List;

public interface SelectedContractService {
    List<SelectedContract> findAllSelectedContracts();

    List<SelectedContract> getSelectedContractsByUserID(int userId);

    List<SelectedContract> getSelectedContractsByCashKickId(int cashKickId);

    SelectedContractDTO saveContract(SelectedContractDTO selectedContractsDTO);
}
