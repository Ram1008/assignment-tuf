import { createContext } from 'react';
import { HomeContextType } from './homeTypes';

const homeContext = createContext<HomeContextType | undefined>(undefined);

export default homeContext;
