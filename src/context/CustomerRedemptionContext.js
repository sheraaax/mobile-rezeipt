import createDataContext from './createDataContext';
import RezeiptApi from '../api/rezeiptApi';
import { navigate } from '../navigationRef';

const customerRedemptionReducer = (state, action) => {
    switch (action.type){
        case 'fetch_customerRedemptions':
            return {customerRedemptions: action.payload};
        case 'fetch_customerRedemptionDetails':
            return action.payload;
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

const createCustomerRedemption = dispatch => async (redemptionId) => {
    try {
        await RezeiptApi.post('/customerRedemption', {redemptionId});
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'You have already redeemed this reward!'});
    }
};

const fetchCustomerRedemptions = dispatch => async () => {
    const response = await RezeiptApi.get('/customerRedemption');
    dispatch({ type: 'fetch_customerRedemptions', payload: response.data });
  };

const fetchCustomerRedemptionDetails = dispatch => async(id) => {
    const response = await RezeiptApi.get(`/customerRedemption/${id}`);
    dispatch({ type: 'fetch_customerRedemptionDetails', payload:response.data});
};

const updateCustomerRedemptionStatus = dispatch => async(id,status) => {
    await RezeiptApi.put(`/redeemStatus/${id}`, {status});
    navigate('CustomerRedemption');
};

const updateCustomerPoints = dispatch => async (id,points) => {
    await RezeiptApi.put(`/customerRedeemPoints/${id}`, {points});
}



export const { Context, Provider } = createDataContext(
    customerRedemptionReducer, 
    { createCustomerRedemption, 
      fetchCustomerRedemptions, 
      fetchCustomerRedemptionDetails, 
      clearErrorMessage, 
      updateCustomerRedemptionStatus, 
      updateCustomerPoints 
    },
    { errorMessage:'', customerRedemptions:[] }
  );