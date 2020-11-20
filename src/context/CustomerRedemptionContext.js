import createDataContext from './createDataContext';
import RezeiptApi from '../api/rezeiptApi';

const customerRedemptionReducer = (state, action) => {
    switch (action.type){
        case 'fetch_customerRedemptions':
            return action.payload;
        
        case 'fetch_customerRedemptionDetails':
            return action.payload;
            
        default:
            return state;
    }
};

const createCustomerRedemption = dispatch => async (customerId, redemptionId) => {
    await RezeiptApi.post('/customerRedemption', {customerId, redemptionId});

};

const fetchCustomerRedemptions = dispatch => async () => {
    const response = await RezeiptApi.get('/customerRedemption');
    dispatch({ type: 'fetch_customerRedemptions', payload: response.data });
  };

const fetchCustomerRedemptionDetails = dispatch => async() => {
    const response = await RezeiptApi.get('/customerRedemption/:id');
    dispatch({ type: 'fetch_customerRedemptionDetails', payload:response.data});
};

export const { Context, Provider } = createDataContext(
    customerRedemptionReducer, 
    { createCustomerRedemption, fetchCustomerRedemptions, fetchCustomerRedemptionDetails },
    []
  );