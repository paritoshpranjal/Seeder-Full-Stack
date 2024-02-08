package com.seeder.cashkickservice.utils.mapper;

import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.entity.CashKickEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class CashKickMapper {
    @Autowired
    ModelMapper modelMapper;

    public CashKickEntity dtoToEntity(CashKickDto userDTO){
        return modelMapper.map(userDTO, CashKickEntity.class);
    }

    public CashKickDto entityToDTO(CashKickEntity userEntity){
        return modelMapper.map(userEntity, CashKickDto.class);
    }
}