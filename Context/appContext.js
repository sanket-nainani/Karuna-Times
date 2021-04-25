import { createContext } from 'react';
import { initialState } from '../reducers/appReducer';

const appContext = createContext(initialState);

export default appContext;
