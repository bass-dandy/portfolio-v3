import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import {thunk} from 'redux-thunk';
import windows from './windows';

// const devToolsCompose = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({ windows });

export default function store(defaultState = {}) {
	return createStore(
		reducer,
		defaultState,
		compose(applyMiddleware(thunk))
	);
};
