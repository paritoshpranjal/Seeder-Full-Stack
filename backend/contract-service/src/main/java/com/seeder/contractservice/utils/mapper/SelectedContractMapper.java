package com.seeder.contractservice.utils.mapper;

import com.seeder.contractservice.dto.SelectedContractDTO;
import com.seeder.contractservice.entity.SelectedContract;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SelectedContractMapper {

    @Autowired
    ModelMapper modelMapper;

    public SelectedContract dtoToEntity(SelectedContractDTO selectedContractDTO){
        return modelMapper.map(selectedContractDTO, SelectedContract.class);
    }

    public SelectedContractDTO entityToDTO(SelectedContract selectedContract){
        return modelMapper.map(selectedContract, SelectedContractDTO.class);
    }
}
