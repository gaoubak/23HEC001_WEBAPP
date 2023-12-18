import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    value: string | null;
}

const initialState: UserState = {
    value: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSend: (state, action: PayloadAction<string>) => ({
            ...state,
            value: action.payload,
        }),
    },
});

export const { userSend } = userSlice.actions;

export default userSlice.reducer;
