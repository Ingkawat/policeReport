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
    return({id_Card, fname, lname, password,confirmpassword,phoneNumber,email}) => {
        axios
        //use your ip address type in cmd ipconfig***
        .post("http://192.168.1.36:3000/register", {
          id_Card: id_Card,
          f_name: fname,
          l_name: lname,
          password: password,
          confirmpassword: confirmpassword,
          phoneNumber: phoneNumber,
          email: email
        })
        .then( async (res) => {
           console.log('register sucess')
           dispatch({type: 'register'})
           
        })
        .catch((err) => {
          dispatch({ type: 'add_error', payload: 'Register Error' })
          console.log("error")
        });
    }
}

const login = (dispatch) => {
    return ({id_card, password}) => {
        axios
        //use your ip address type in cmd ipconfig***
        .post("http://192.168.1.36:3000/login", {
          id_card: id_card,
          password: password,
        })
        .then( async (res) => {
           await AsyncStorage.setItem('username', id_card)
           dispatch({type: 'signin', payload: id_card})
      
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
    {login, signout, register, tryLocalSignin, clearLocal},
    {username: null, errorMessage:'', isSignin: false}
)