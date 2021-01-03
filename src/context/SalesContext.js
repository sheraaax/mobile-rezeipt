import createDataContext from './createDataContext';
import rezeiptApi from '../api/rezeiptApi';

const salesReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_sales':
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

const fetchSales = dispatch => async () => {
    const response = await rezeiptApi.get('/sales');
    dispatch({ type: 'fetch_sales', payload: response.data });
};

const updateSale = dispatch => async (id,customerId) => {
    try{
    const response = await rezeiptApi.put(`/sales/${id}`);
    }catch (err) {
        dispatch({ type: 'add_error', payload: 'Invalid QR Code! Please try again'});
    }};

export const { Provider, Context } = createDataContext(
    salesReducer,
    { fetchSales, updateSale, clearErrorMessage },
    []
);