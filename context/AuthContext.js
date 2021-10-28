import createDataContext from "./createDataContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";



const authReducer = (state, action) => {
    switch (action.type) {
        case 'register':
            return {...state, isSignin: true}
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage: '' , username: action.payload};
        default:
            return state;
    }
};

const clearLocal = dispatch => async () => {
    await AsyncStorage.removeItem("username");
    dispatch({type: 'signin', payload: null})
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem("username")
    if(token){
        dispatch({type: 'signin', payload: token});   
    }
}

const register = (dispatch) => {
    return({id, fname, lname, password}) => {
        axios
        //use your ip address type in cmd ipconfig***
        .post("http://192.168.1.37:3000/register", {
          id: id,
          f_name: fname,
          l_name: lname,
          password: password,
        })
        .then( async (res) => {
           console.log('register sucess')
           dispatch({type: 'register', payload: true})
           
        })
        .catch((err) => {
          dispatch({ type: 'add_error', payload: 'Register Error' })
        });
    }
}

const signin = (dispatch) => {
    return ({email, password, navigation}) => {
        axios
        //use your ip address type in cmd ipconfig***
        .post("http://192.168.1.37:3000/login", {
          id: email,
          password: password,
        })
        .then( async (res) => {
           await AsyncStorage.setItem('username', email)
           dispatch({type: 'signin', payload: email})
           navigation.navigate("Home")
        })
        .catch((err) => {
          dispatch({ type: 'add_error', payload: 'Login Error' })
        });

    }
}

const signout = (dispatch) => {
    return()=>{
        //make signout
        // axios.get("http://localhost:3000/user")
        // .then((res) => {
        //     console.log(res)
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, register, tryLocalSignin, clearLocal},
    {username: null, errorMessage:'', isSignin: false}
)