import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IAuth, IUser} from "../../interfaces";
import {authService} from "../../services";

interface IState {
    me: IUser,
    errors: boolean
}

const initialState: IState = {
    me: null,
    errors: null
}

const login = createAsyncThunk<IUser, {user: IAuth}>(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            return await authService.login(user)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload
            })
            .addMatcher(isFulfilled(login), state => {
                state.errors = false
            })
            .addMatcher(isRejected(login), state => {
                state.errors = true
            })
    }
})

const {reducer: authReducer, actions} = authSlice;

const authActions = {
    ...actions,
    login
}

export {
    authActions,
    authReducer
}