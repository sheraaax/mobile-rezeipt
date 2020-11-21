import createDataContext from './createDataContext';
import rezeiptApi from '../api/rezeiptApi';

const salesReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_sales':
            return action.payload;
        default:
            return state;
    }
};

const fetchSales = dispatch => async () => {
    const response = await rezeiptApi.get('/sales');
    dispatch({ type: 'fetch_sales', payload: response.data });
};

export const { Provider, Context } = createDataContext(
    salesReducer,
    { fetchSales },
    []
);