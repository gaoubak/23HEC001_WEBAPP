// user.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
    username: string;
    email: string;
    id?: number;
}

interface UserState {
    value: FormData | null;
}

const initialState: UserState = {
    value: {
        username: '',
        email: '',
    } as FormData,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<FormData>) => ({
            ...state,
            value: action.payload,
        }),
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
