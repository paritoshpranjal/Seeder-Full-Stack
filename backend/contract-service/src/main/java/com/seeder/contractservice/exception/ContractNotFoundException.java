package com.seeder.contractservice.exception;

public class ContractNotFoundException extends RuntimeException {
    public ContractNotFoundException(String message){
        super(message);
    }
}
