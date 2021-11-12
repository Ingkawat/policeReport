import createDataContext from "./createDataContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const account = (state, action) => {
    switch (action.type) {
        case 'edit':
            return {...state, f_name: action.f_name,l_name:action.l_name,phone:action.phonenumber, email:action.email}
       
        default:
            return state;
    }

};




const changepassword = () => {

    return (newpass,oldpass, id) => {
 
        axios
        //use your ip address type in cmd ipconfig***
        .put("http://192.168.1.36:3000/changepassword",{
            newpass: newpass,
            oldpass: oldpass,
            id:id
        })
        .then( (res) => {    
            console.log(res.data)               
        })
        .catch((err) => {
            console.log("error changepassword")
        
        });

    }
}


const editprofile = () => {

    return (email,phone, id) => {

        axios
        //use your ip address type in cmd ipconfig***
        .put("http://192.168.1.36:3000/editprofile",{
            email: email,
            phone: phone,
            id:id
        })
        .then( (res) => {    
            console.log(res.data)               
        })
        .catch((err) => {
            console.log("error editprofile")
        
        });

    }
}




export const {Provider, Context} = createDataContext(
    account,
    {changepassword,editprofile},
    {f_name:'',l_name:'',email:'',phone:''}
    
)