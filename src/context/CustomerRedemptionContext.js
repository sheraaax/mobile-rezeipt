import createDataContext from './createDataContext';
import RezeiptApi from '../api/rezeiptApi';

const customerRedemptionReducer = (state, action) => {
    switch (action.type){
        case 'fetch_customerRedemptions':
            return action.payload;
        case 'fetch_customerRedemptionDetails':
            return action.payload;
        case 'fetch_customer':
            return { customer: action.payload};
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' });
};

const createCustomerRedemption = dispatch => async (customerId, redemptionId) => {
    console.log(customerId, redemptionId);
    try {
        await RezeiptApi.post('/customerRedemption', {customerId, redemptionId});
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'You have already redeemed this reward!'});
    }

};

const fetchCustomerRedemptions = dispatch => async () => {
    const response = await RezeiptApi.get('/customerRedemption');
    dispatch({ type: 'fetch_customerRedemptions', payload: response.data });
  };

const fetchCustomerRedemptionDetails = dispatch => async() => {
    const response = await RezeiptApi.get('/customerRedemption/:id');
    dispatch({ type: 'fetch_customerRedemptionDetails', payload:response.data});
};

const fetchCustomer = dispatch => async () => {
    const response = await RezeiptApi.get('/customer');
    dispatch({ type: 'fetch_customer', payload:response.data});
};

export const { Context, Provider } = createDataContext(
    customerRedemptionReducer, 
    { createCustomerRedemption, fetchCustomerRedemptions, fetchCustomerRedemptionDetails, clearErrorMessage, fetchCustomer },
    { errorMessage:'', customer: null }
  );