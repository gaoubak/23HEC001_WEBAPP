import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChanelState {
    value: string | null | number;
}

const initialState: ChanelState = {
    value: null,
};

const chanelSlice = createSlice({
    name: 'chanel',
    initialState,
    reducers: {
        chanelSend: (state, action: PayloadAction<number>) => ({
            ...state,
            value: action.payload,
        }),
    },
});

export const { chanelSend } = chanelSlice.actions;

export default chanelSlice.reducer;
