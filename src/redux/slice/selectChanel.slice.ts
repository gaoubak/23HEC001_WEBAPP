import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChanelCard } from '../../interface/components/other/chanelCard.interface';

interface SelectChanelState {
    value: ChanelCard | null;
}

const initialState: SelectChanelState = {
    value: null,
};

const selectChanelSlice = createSlice({
    name: 'selectChanel',
    initialState,
    reducers: {
        setSelectChanel: (state, action: PayloadAction<any>) => ({
            ...state,
            value: action.payload,
        }),
    },
});

export const { setSelectChanel } = selectChanelSlice.actions;

export default selectChanelSlice.reducer;
