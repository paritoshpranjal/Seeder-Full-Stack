import { NewUser } from '../../components/organisms/SignUp';
import { UserDataProps } from '../../context';
import { TOTAL_AMOUNT } from '../../utils/constant';
import {
    CashKickContractsPropsType,
    CashKickType
} from '../../utils/interfaces';
import api from '../api';

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getAllUsersDetail = async () => {
    return api.get(`/users`);
};

export const updatePasswordByUserId = async (
    userId: number,
    password: string
) => {
    return await api.patch(`/users/${userId}/reset-password`, { password });
};

export const getUserByEmailId = async (email?: string) => {
    return await api.get(`/users/email`, {
        params: {
            email: email
        }
    });
};

export const registerUser = async (userData: NewUser) => {
    try {
        const response = await api.post('/users/signup', {
            ...userData,
            availableCredit: TOTAL_AMOUNT
        });
        return response.data;
    } catch (error) {
        console.error('Failed to post user data' + error);
    }
};

export const getAllContracts = async () => {
    return api.get('/contracts');
};

export const createNewCashkick = async (data: CashKickType) => {
    const response = await api.post('/cash-kicks', data);
    return response;
};

export const createCashkickContract = async (
    cashkickContracts: CashKickContractsPropsType[]
) => {
    try {
        const promises = cashkickContracts.map(
            async (cashkickContract: CashKickContractsPropsType) => {
                const response = await api.post('contracts/cashkick-contract', {
                    userId: cashkickContract.userId,
                    cashKickId: cashkickContract.cashkickId,
                    contractId: cashkickContract.contractId
                });
                return response;
            }
        );

        const responses = await Promise.all(promises);

        return responses;
    } catch (error) {
        console.error(error);
    }
};

export const updateAvailableCreditOfUser = async (
    userId: number,
    user: UserDataProps
) => {
    try {
        const response = await api.put(`/users/${userId}/update-credit`, {
            ...user
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
export const fetchTransactionDetails = async () => {
    return await api.get(`/payments`);
};

export const fetchTransaction = async (id: number) => {
    return await api.get(`/payments?userId=${id}`);
};

export const fetchCashKicks = async (userId: number) => {
    return await api.get(`/cash-kicks/${userId}`);
};

export const fetchCashKickContract = async (id: number) => {
    return await api.get(`/contracts/cashkick-contract/cashkick/${id}`);
};

export const fetchContracts = async (id: number) => {
    return await api.get(`/contracts/${id}`);
};

export const postPayment = async (paymentData: any) => {
    return await api.post('/payments', paymentData);
};

export const getToken = async (data: any) => {
    return await api.post('/users/login', data);
};
