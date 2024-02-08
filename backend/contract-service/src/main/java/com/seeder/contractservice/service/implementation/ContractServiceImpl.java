package com.seeder.contractservice.service.implementation;

import com.seeder.contractservice.dto.ContractDTO;
import com.seeder.contractservice.entity.Contract;
import com.seeder.contractservice.exception.ContractNotFoundException;
import com.seeder.contractservice.repository.ContractRepository;
import com.seeder.contractservice.service.ContractService;
import com.seeder.contractservice.utils.mapper.ContractMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ContractServiceImpl implements ContractService {

    private final ContractRepository contractRepository;
    private final ContractMapper contractMapper;

    @Autowired
    public ContractServiceImpl(ContractRepository contractRepository,ContractMapper contractMapper){
        this.contractRepository=contractRepository;
        this.contractMapper=contractMapper;
    }

    @Override
    public List<ContractDTO> getAllContracts() {
        log.info("Inside getAllContracts method in Service Layer");
        List<Contract> contractList = contractRepository.findAll();
        return contractList.stream()
                .map(contractMapper::entityToDTO)
                .toList();
    }

    @Override
    public ContractDTO getContractById(int contractId) {
        log.info("Inside getContractById method in Service Layer");
        Optional<Contract> contracts = contractRepository.findById(contractId);
        Contract contract = contracts.orElseThrow(() -> new ContractNotFoundException("Did not find contract with id - " + contractId));
        return contractMapper.entityToDTO(contract);
    }
}
