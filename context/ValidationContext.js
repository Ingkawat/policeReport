import createDataContext from "./createDataContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validate = (state, action) => {
    switch (action.type) {
        case 'idcard':
            return {...state, errorIdcard: action.error}
        case 'password':
            return {...state, errorPassword: action.error}
        case 'email':
            return {...state, errorEmail: action.error}
        case 'fname':
            return {...state, errorFname: action.error}
        case 'lname':
             return {...state, errorLname: action.error}
        case 'phonenumber':
            return {...state, errorPhonenumber: action.error}
        default:
            return state;
    }

};




const validate_Idcard = dispatch => async (value) => {
    
    if(value.length > 12 && value.length < 14 && !isNaN(value)){
        dispatch({type:'idcard', status: true, error:""});   
      }
      else{
        dispatch({type:'idcard', error:"IdCrad must be a number and have 13 characters.",status: false});
      }

}



const validate_Password = dispatch => async (value) => {
    var pass = value;
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@_=;:()*"':{}[%\$%\^&\*])(?=.{8,})/;
    
    if(reg.test(value) === true){
        dispatch({type:'password', error:""});   
      }
      else{
        dispatch({type:'password', error:"Password must have a large, small, special, and must have 8 characters."});
      }

}




const validate_Email = dispatch => async (value) => {
    let reg1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
    
    if(reg1.test(value) === true){
        dispatch({type:'email', error:""});   
      }
      else{
        dispatch({type:'email', error:"Is not e-mail rules."});
      }

}

const validate_Fname = dispatch => async (value) => {
    if(value.length >= 4){
        dispatch({type:'fname', error:""});   
      }
      else{
        dispatch({type:'fname', error:"Name must contain at least 6 characters."});
      }

}

const validate_Lname = dispatch => async (value) => { 
    if(value.length >= 4){
        dispatch({type:'lname', error:""});   
      }
      else{
        dispatch({type:'lname', error:"Lastname must contain at least 6 characters."});
      }

}

const validate_Phonenumber = dispatch => async (value) => { 
    if(value.length > 9 && value.length < 11 && !isNaN(value)){
        dispatch({type:'phonenumber', error:""});   
      }
      else{
        dispatch({type:'phonenumber', error:"Phonenumber must be a number and have 10 characters."});
      }

}






export const {Provider, Context} = createDataContext(
    validate,
    {validate_Idcard, validate_Password, validate_Email,validate_Fname,validate_Lname,validate_Phonenumber},
    {errorIdcard: '', errorPassword:'', errorEmail:'', errorFname:'',errorLname:'', errorPhonenumber:''}
    
)