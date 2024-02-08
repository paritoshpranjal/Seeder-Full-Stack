package com.seeder.cashkickservice.service;
import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.entity.CashKickEntity;
import com.seeder.cashkickservice.exception.CashKickException;
import com.seeder.cashkickservice.repository.CashKickRepository;
import com.seeder.cashkickservice.utils.mapper.CashKickMapper;
import com.seeder.cashkickservice.utils.mapper.implementation.CashKickServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CashKickServiceImplTest {

    @Mock
    private CashKickRepository cashKickRepository;

    @Mock
    private CashKickMapper cashKickMapper;

    @InjectMocks
    private CashKickServiceImpl cashKickService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetCashKicksByUserId_UserFound_ReturnsListOfCashKickDto() {
        int userId = 1;
        List<CashKickEntity> cashKicksEntities = List.of(new CashKickEntity(), new CashKickEntity());
        when(cashKickRepository.findByUserId(userId)).thenReturn(cashKicksEntities);
        when(cashKickMapper.entityToDTO(any(CashKickEntity.class))).thenReturn(new CashKickDto());

        List<CashKickDto> result = cashKickService.getCashKicksByUserId(userId);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(cashKickRepository, times(1)).findByUserId(userId);
        verify(cashKickMapper, times(2)).entityToDTO(any(CashKickEntity.class));
    }

    @Test
    void testGetCashKicksByUserId_UserNotFound_ThrowsCashKickException() {
        int userId = 1;
        when(cashKickRepository.findByUserId(userId)).thenReturn(null);

        assertThrows(CashKickException.class, () -> cashKickService.getCashKicksByUserId(userId));
        verify(cashKickRepository, times(1)).findByUserId(userId);
        verify(cashKickMapper, never()).entityToDTO(any(CashKickEntity.class));
    }

    @Test
    void testPostCashKick_Success_ReturnsCashKickDto() {
        CashKickDto cashKickDto = new CashKickDto();
        CashKickEntity cashKickEntity = new CashKickEntity();
        when(cashKickMapper.dtoToEntity(cashKickDto)).thenReturn(cashKickEntity);
        when(cashKickRepository.save(cashKickEntity)).thenReturn(cashKickEntity);
        when(cashKickMapper.entityToDTO(cashKickEntity)).thenReturn(cashKickDto);

        CashKickDto result = cashKickService.postCashKick(cashKickDto);

        assertNotNull(result);
        assertEquals(cashKickDto, result);
        verify(cashKickMapper, times(1)).dtoToEntity(cashKickDto);
        verify(cashKickRepository, times(1)).save(cashKickEntity);
        verify(cashKickMapper, times(1)).entityToDTO(cashKickEntity);
    }

    @Test
    void testPostCashKick_ExceptionThrown_ThrowsCashKickException() {
        CashKickDto cashKickDto = new CashKickDto();
        when(cashKickMapper.dtoToEntity(cashKickDto)).thenThrow(RuntimeException.class);

        assertThrows(CashKickException.class, () -> cashKickService.postCashKick(cashKickDto));
        verify(cashKickMapper, times(1)).dtoToEntity(cashKickDto);
        verify(cashKickRepository, never()).save(any(CashKickEntity.class));
        verify(cashKickMapper, never()).entityToDTO(any(CashKickEntity.class));
    }
}

