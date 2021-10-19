import { combineReducers } from 'redux';

import userReducer from './userReducer';
import serieFormReducer from './serieFormReducer';
import seriesReducer from './seriesReducer';
import userGoogleReducer from './userGoogleReducer';

export default combineReducers({
	user: userReducer,
	serieForm: serieFormReducer,
	series: seriesReducer,
	userGoogle: userGoogleReducer,
});

