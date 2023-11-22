import {configureStore} from "@reduxjs/toolkit";

import {authReducer, carReducer} from "./slices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cars: carReducer
    }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export {
    store
}

export type {
    RootState,
    AppDispatch
}