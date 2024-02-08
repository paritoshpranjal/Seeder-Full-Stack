package com.seeder.cashkickservice.controller;

import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.service.CashKickService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
class CashKickControllerTest {

    @Mock
    private CashKickService cashKickService;

    @InjectMocks
    private CashKickController cashKickController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(cashKickController).build();
    }

    @Test
    void testGetCashKicksByUserId_ReturnsListOfCashKicks() {
        int userId = 1;
        List<CashKickDto> cashKickList = Arrays.asList(
                new CashKickDto(1, "Cash Kick One", new Date(), BigDecimal.ZERO, "pending", BigDecimal.ZERO, userId),
                new CashKickDto(2, "Cash Kick Two", new Date(), BigDecimal.ZERO, "pending", BigDecimal.ZERO, userId)
        );

        when(cashKickService.getCashKicksByUserId(userId)).thenReturn(cashKickList);

        ResponseEntity<List<CashKickDto>> response = cashKickController.getCashKicksByUserId(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(cashKickList, response.getBody());
    }

    @Test
    void testPostCashKick_ReturnsCreatedCashKick() {
        CashKickDto cashKickDto = new CashKickDto(1, "Cash Kick", new Date(), BigDecimal.ZERO, "pending", BigDecimal.ZERO, 1);
        CashKickDto savedCashKick = new CashKickDto(1, "Cash Kick", new Date(), BigDecimal.ZERO, "pending", BigDecimal.ZERO, 1);

        when(cashKickService.postCashKick(cashKickDto)).thenReturn(savedCashKick);

        ResponseEntity<CashKickDto> response = cashKickController.postCashKick(cashKickDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedCashKick, response.getBody());
    }
}
