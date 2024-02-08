export type YourContractsType = {
    id: number;
    name: string;
    status:string;
    type: string;
    perPayment: number;
    totalFinanced:string;
    totalAvailable:number;
    termLength: number;
    termRate: number;
    paymentAmount: number;
    partialAmount: number;
};

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface CashKickType {
    name: string;
    status: string;
    maturity: Date;
    totalFinanced: number;
    totalReceived: number;
    userId: number;
  }

  export interface CashKickContractsPropsType {
    userId: number;
    cashkickId: number;
    contractId: number;
  }
  export interface ContractPropType {
      id: number;
      name: string;
      status: string;
      type: string;
      perPayment: number;
      totalFinanced: string;
      totalAvailable: number;
      termLength: number;
      termRate: number;
      paymentAmount: number;
  }

  export interface MyContractType {
      id: number;
      name: string;
      perPayment: number;
      type: string;
      termLength: number;
      paymentAmount: number;
  }
