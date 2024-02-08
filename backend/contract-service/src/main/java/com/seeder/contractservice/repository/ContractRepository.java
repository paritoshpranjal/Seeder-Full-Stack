package com.seeder.contractservice.repository;

import com.seeder.contractservice.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository extends JpaRepository<Contract,Integer> {
}
