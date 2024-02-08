package com.seeder.paymentservice.exception;

public class ErrorException extends RuntimeException {
    public ErrorException(String message, Throwable cause) {
        super(message, cause);
    }
}
