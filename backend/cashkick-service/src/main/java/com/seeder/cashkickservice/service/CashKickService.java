package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashKickDto;

import java.util.List;

public interface CashKickService {

    List<CashKickDto> getCashKicksByUserId(int userId);

    CashKickDto postCashKick(CashKickDto cashKickDto);

}
