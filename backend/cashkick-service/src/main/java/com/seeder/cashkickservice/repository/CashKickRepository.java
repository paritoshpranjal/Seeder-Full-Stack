package com.seeder.cashkickservice.repository;

import com.seeder.cashkickservice.entity.CashKickEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface CashKickRepository extends JpaRepository<CashKickEntity,Integer> {

    List<CashKickEntity> findByUserId(int userId);
}