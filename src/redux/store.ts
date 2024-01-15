import { configureStore } from '@reduxjs/toolkit';
import chanelReducer from './slice/chanel.slice';
import userReducer from './slice/user.slice';
import menuReducer from './slice/menu.slice';
import messageReducer from './slice/message.slice';
import selectChanelReducer from './slice/selectChanel.slice';
import initialReducer from './slice/initial.slice';
import usersReducer from './slice/users.slice';
import followersReducer from './slice/followers.slice';

const store = configureStore({
    reducer: {
        chanel: chanelReducer,
        user: userReducer,
        users: usersReducer,
        menu: menuReducer,
        message: messageReducer,
        selectChanel: selectChanelReducer,
        initial: initialReducer,
        followers: followersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
