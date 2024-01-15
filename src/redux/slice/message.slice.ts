import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageData } from '../../interface/components/other/message.interface';

interface MessageState {
    value: MessageData[];
}

const initialState: MessageState = {
    value: [],
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<any>) => ({
            ...state,
            value: action.payload,
        }),
    },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
