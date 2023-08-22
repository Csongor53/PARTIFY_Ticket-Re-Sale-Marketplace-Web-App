"use client"
import React from "react";
import store from "@/app/redux/store";
import {Provider} from "react-redux";

const StoreProvider = ({children}) => (
    <Provider store={store}>
        {children}
    </Provider>
);

export default StoreProvider;