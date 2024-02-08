package com.seeder.contractservice.service.implementation;


import com.seeder.contractservice.dto.SelectedContractDTO;
import com.seeder.contractservice.entity.SelectedContract;
import com.seeder.contractservice.exception.ContractNotFoundException;
import com.seeder.contractservice.repository.SelectedContractsRepository;
import com.seeder.contractservice.service.SelectedContractService;
import com.seeder.contractservice.utils.mapper.SelectedContractMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class SelectedContractServiceImpl implements SelectedContractService {
    private final SelectedContractsRepository selectedContractsRepository;
    private final SelectedContractMapper selectedContractMapper;
    
    @Autowired
    public SelectedContractServiceImpl(SelectedContractsRepository selectedContractRepo,SelectedContractMapper selectedContractMapper) {
        this.selectedContractsRepository = selectedContractRepo;
        this.selectedContractMapper=selectedContractMapper;
    }

    @Override
    public List<SelectedContract> findAllSelectedContracts() {
        log.info("Inside findAllSelectedContracts method in Service Layer");
        return selectedContractsRepository.findAll();
    }

    @Override
    public List<SelectedContract> getSelectedContractsByUserID(int userId) {
        log.info("Inside getSelectedContractsByUserID method in Service Layer");
        List<SelectedContract> contracts = selectedContractsRepository.findContractsByUserId(userId);

        if (contracts.isEmpty()) {
            throw new ContractNotFoundException("Did not find contracts with user id - " + userId);
        }

        return contracts;
    }

    @Override
    public List<SelectedContract> getSelectedContractsByCashKickId(int cashKickId) {
        log.info("Inside getSelectedContractsByCashKickId method in Service Layer");
        List<SelectedContract> contracts = selectedContractsRepository.findContractsByCashKickId(cashKickId);

        if (contracts.isEmpty()) {
            throw new ContractNotFoundException("Did not find contracts with cash kick id - " + cashKickId);
        }

        return contracts;
    }

    @Override
    public SelectedContractDTO saveContract(SelectedContractDTO selectedContractsDTO) {
        log.info("Inside saveContract method in Service Layer");
        return selectedContractMapper.entityToDTO(selectedContractsRepository.save(selectedContractMapper.dtoToEntity(selectedContractsDTO)));
    }
}
