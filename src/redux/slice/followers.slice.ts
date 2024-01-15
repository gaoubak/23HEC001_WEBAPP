// followers.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FollowersState {
    value: any;
}

const initialState: FollowersState = {
    value: [],
};

const followersSlice = createSlice({
    name: 'followers',
    initialState,
    reducers: {
        setFollowers: (state, action: PayloadAction<FollowersState>) => ({
            ...state,
            value: action.payload,
        }),
    },
});

export const { setFollowers } = followersSlice.actions;
export default followersSlice.reducer;
