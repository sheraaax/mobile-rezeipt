import createDataContext from './createDataContext';
import RezeiptApi from '../api/rezeiptApi';

const customerReducer = (state, action) => {
    switch (action.type){
        case 'fetch_customer':
            return { customer: action.payload};
        case 'fetch_customerPoints':
                return { customer: action.payload};
        default:
            return state;
    }
};

const fetchCustomer = dispatch => async () => {
    const response = await RezeiptApi.get('/customer');
    console.log(response.data);
    dispatch({ type: 'fetch_customer', payload:response.data});
};

const fetchCustomerPoints = dispatch => async () => {
    const response = await RezeiptApi.get('/customerPoints');
    console.log(response.data);
    dispatch({ type: 'fetch_customerPoints', payload:response.data});
};

export const { Context, Provider } = createDataContext(
    customerReducer, 
    { fetchCustomer, fetchCustomerPoints },
    {customer:[]}
);