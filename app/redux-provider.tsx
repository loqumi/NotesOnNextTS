'use client';

import { ReactNode } from 'react';
import store from '../store/store';
import { Provider } from 'react-redux';

interface ReduxProviderProps {
    children: ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
