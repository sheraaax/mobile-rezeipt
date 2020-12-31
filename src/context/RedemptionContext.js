import createDataContext from './createDataContext';
import RezeiptApi from '../api/rezeiptApi';

const redemptionReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_redemptions':
      return {redemptions: action.payload};
    default:
      return state;
  }
};

const fetchRedemptions = dispatch => async () => {
  const response = await RezeiptApi.get('/redemption');
  dispatch({ type: 'fetch_redemptions', payload: response.data });
};

export const { Context, Provider } = createDataContext(
  redemptionReducer, 
  { fetchRedemptions },
  {redemptions:null}
);
