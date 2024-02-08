package com.seeder.contractservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ContractRestExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ContractErrorResponse> handleContractNotFound(ContractNotFoundException exception) {
        ContractErrorResponse errorResponse = new ContractErrorResponse(HttpStatus.NOT_FOUND.value(), exception.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ContractErrorResponse> handleException(Exception exception) {
        ContractErrorResponse error = new ContractErrorResponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
