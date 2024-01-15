// menuSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
    isBurgerMenuOpen: boolean;
}

const initialState: MenuState = {
    isBurgerMenuOpen: true,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleBurgerMenu: (state) => ({
            ...state,
            isBurgerMenuOpen: !state.isBurgerMenuOpen,
        }),
    },
});

export const { toggleBurgerMenu } = menuSlice.actions;

export default menuSlice.reducer;
