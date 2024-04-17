import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChanelCard } from '../../interface/components/other/chanelCard.interface';

interface ChanelState {
    value: ChanelCard[];
}

const initialState: ChanelState = {
    value: [],
};

const chanelSlice = createSlice({
    name: 'chanel',
    initialState,
    reducers: {
        setChanel: (state, action: PayloadAction<any>) => ({
            ...state,
            value: action.payload,
        }),
    },
});

export const { setChanel } = chanelSlice.actions;

export default chanelSlice.reducer;
