package com.seeder.cashkickservice;

import com.seeder.cashkickservice.utils.mapper.CashKickMapper;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaClient
public class CashkickServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CashkickServiceApplication.class, args);
    }
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
    @Bean
    CashKickMapper cashKickMapper(){
        return new CashKickMapper();
    }
}
