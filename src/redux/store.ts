import { configureStore } from '@reduxjs/toolkit';
import chanelReducer from './chanel.slice';

const store = configureStore({
    reducer: {
        chanel: chanelReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
