// AuthActions.js
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_PASSWORD = "SET_USER_PASSWORD";

export const userEmail = (email) => {
  return {
    type: SET_USER_EMAIL,
    payload: email,
  };
};

export const userPass = (password) => {
  return {
    type: SET_USER_PASSWORD,
    payload: password,
  };
};

export  const userName = (data)=>{
    return{
        type:"User_Name",
        payload:data
    }
}
export  const userMobile = (data)=>{
    return{
        type:"User_Mobile",
        payload:data
    }
}
export  const userGender = (data)=>{
    return{
        type:"User_Gender",
        payload:data
    }
}
export  const userType = (data)=>{
    return{
        type:"User_Type",
        payload:data
    }
}