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
            return {errorMessage: '' , username: action.payload, role: action.role};
        case 'getReport':
            return {...state, report: action.payload};
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
        axios.post(`http://192.168.1.37:3000/user/${token}`)
        .then( async (res) => {
            
            dispatch({type: 'signin', payload: token, role: res.data.role})
        })
        .catch((err) => {
            console.log(err)
        });
    
        
    }
    ;
}
const getReport = (dispatch) => {
    return async () => {
        axios
        //use your ip address type in cmd ipconfig***
        .post(`http://192.168.1.37:3000/report/${await AsyncStorage.getItem("username")}`)
        .then( async (res) =>dispatch({ type: 'getReport', payload: res.data }))
        .catch((err) => {
            console.log(err)
        });
    }
}



const register = (dispatch) => {
    return({id_Card, fname, lname, password,phoneNumber,email}) => {
        axios
        //use your ip address type in cmd ipconfig***
        .post("http://192.168.1.37:3000/register", {
          id_Card: id_Card,
          f_name: fname,
          l_name: lname,
          password: password,
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
        .post("http://192.168.1.37:3000/login", {
          id_card: id_card,
          password: password,
        })
        .then( async (res) => {
           await AsyncStorage.setItem('username', id_card)
           dispatch({type: 'signin', payload: id_card, role: res.data.role})
      
        })
        .catch((err) => {

            dispatch({ type: 'add_error', payload: 'Incorrect Username and/or Password!'})
        
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
    {login, signout, register, tryLocalSignin, clearLocal, getReport},
    {username: null, errorMessage:'', isSignin: false, report: [], role:''}
)