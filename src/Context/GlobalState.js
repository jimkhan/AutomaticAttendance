import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();


const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    refreshToken: null,
};


const loginReducer = (prevState, action) => {
    switch (action.type) {
        case 'RETRIEVE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case 'LOGIN':
            console.log("Called login")
            // console.log(action.userValue)
            return {
                ...prevState,
                userName: action.userValue.name,
                userEmail: action.userValue.email,
                userToken: action.userValue.access,
                refreshToken: action.userValue.refresh,
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                ...prevState,
                userName: null,
                userToken: null,
                isLoading: false,
            };
        case 'REGISTER':
            return {
                ...prevState,
                userName: action.id,
                userToken: action.token,
                isLoading: false,
            };
    }
};





const GlobalState = ({ authvalue, children }) => {

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (userValue) => {
            // console.log("sign in"+ userValue)

            try {
                await AsyncStorage.setItem('userName', userValue.name);
                await AsyncStorage.setItem('userEmail', userValue.email);
                await AsyncStorage.setItem('userToken', userValue.access);
                await AsyncStorage.setItem('refreshToken', userValue.refresh);
                // shopContext.setToken(userToken);
            } catch (e) {
                console.log(e);
            }

            dispatch({ type: 'LOGIN',  userValue });
        },
        signOut: async () => {

            try {
                await AsyncStorage.removeItem('userName');
                await AsyncStorage.removeItem('userEmail');
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('refreshToken');
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {

        },

    }), []);

    return (
        <AuthContext.Provider
            value={{ authContext, loginState }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default GlobalState;