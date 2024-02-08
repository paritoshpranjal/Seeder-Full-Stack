package com.seeder.cashkickservice.utils.mapper.implementation;

import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.entity.CashKickEntity;
import com.seeder.cashkickservice.exception.CashKickException;
import com.seeder.cashkickservice.repository.CashKickRepository;
import com.seeder.cashkickservice.service.CashKickService;
import com.seeder.cashkickservice.utils.mapper.CashKickMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CashKickServiceImpl implements CashKickService {

    private final CashKickRepository cashKickRepository;
    private final CashKickMapper cashKickMapper;

    @Autowired
    public CashKickServiceImpl(CashKickRepository cashKickRepository, CashKickMapper cashKickMapper) {
        this.cashKickRepository = cashKickRepository;
        this.cashKickMapper = cashKickMapper;
    }

    @Override
    public List<CashKickDto> getCashKicksByUserId(int userId) {
        try {
            List<CashKickEntity> cashKicks = cashKickRepository.findByUserId(userId);
            return cashKicks.stream()
                    .map(cashKickMapper::entityToDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new CashKickException("User not found with id: " + userId);
        }
    }
    @Override
    public CashKickDto postCashKick(CashKickDto cashKickDto) {
        try {
            CashKickEntity cashKickEntity = cashKickMapper.dtoToEntity(cashKickDto);
            CashKickEntity savedCashKick = cashKickRepository.save(cashKickEntity);
            return cashKickMapper.entityToDTO(savedCashKick);
        } catch (Exception e) {
            throw new CashKickException("Unable to post");
        }
    }
}
