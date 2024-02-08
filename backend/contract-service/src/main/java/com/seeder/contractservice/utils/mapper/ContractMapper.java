package com.seeder.contractservice.utils.mapper;

import com.seeder.contractservice.dto.ContractDTO;
import com.seeder.contractservice.entity.Contract;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ContractMapper {

    @Autowired
    ModelMapper modelMapper;

    public Contract dtoToEntity(ContractDTO contractDTO){
        return modelMapper.map(contractDTO, Contract.class);
    }

    public ContractDTO entityToDTO(Contract contract){
        return modelMapper.map(contract, ContractDTO.class);
    }
}
