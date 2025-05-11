import api from './axios';
 
export const processPayment = (id:Number ) => {
    return api.post(`/payment/process/${id}`);
};
