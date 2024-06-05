"use client"

import {SessionProvider} from "next-auth/react";
import React from "react";

const AuthProvider = ({children}) => {
    // confirm all gmail users exist in the database
    const syncUser = async () => {

    }
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider;