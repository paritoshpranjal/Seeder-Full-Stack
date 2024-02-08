package com.seeder.contractservice.exception;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ContractErrorResponse
{
    private int status;
    private String message;
    private long timeStamp;
}
