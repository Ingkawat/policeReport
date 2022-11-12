import createDataContext from "./createDataContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Constants from 'expo-constants';

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return {errorMessage: action.error, username: action.payload};
    case 'register':
      return {...state, Message: action.error}
    default:
      return state;
  }
};

const clearLocal = (dispatch) => async () => {
  await AsyncStorage.removeItem("username");
  dispatch({ type: "signin", payload: null });
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("username");
  console.log(token)
  if (token) {
    axios
      .post(`http://${Constants.expoConfig.extra.apiUrl}:3000/user/${token}`)
      .then(async (res) => {
        dispatch({ type: "signin", payload: token });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const login = (dispatch) => {
  return ({ user_name, password }) => {
    axios
      .post(`http://${Constants.expoConfig.extra.apiUrl}:3000/login`, {
        user_name: user_name,
        password: password,
      })
      .then(async (res) => {
        console.log(res.data)
        if(res.data == "Login success"){
        console.log("login is success")
        await AsyncStorage.setItem("username", user_name);
        dispatch({ type: "signin", payload: user_name });
        }else{
          dispatch({ type: "signin", error: res.data });
        }
      })
      .catch((err) => {
        dispatch({
          type: "add_error",
          payload: "Incorrect Username or Password!",
        });
      });
  };
};

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}

const register = (dispatch) => {
  return({user_name, password, name, email, phone, image}) => {
    const data = new FormData();
    
    if(image != undefined){
      var blob = dataURItoBlob(image);
      data.append("images", blob)
    }else{
      data.append("images", null)
    }
    
    data.append("user_name", user_name)
    data.append("password", password)
    data.append("name", name)
    data.append("email", email)
    data.append("phone", phone)
    
      axios
      //use your ip address type in cmd ipconfig***
      .post(`http://${Constants.expoConfig.extra.apiUrl}:3000/signup`,data, {headers:{'Content-Type': "multipart/form-data"}} 
      )
      .then( async (res) => {
         dispatch({type: 'register', error: res.data})
         
      })
      .catch((err) => {
        dispatch({ type: 'add_error', payload: 'Register Error' })
        console.log(err)
      });
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, register, tryLocalSignin, clearLocal},
  { username: null, errorMessage: '', Message:''}
);
