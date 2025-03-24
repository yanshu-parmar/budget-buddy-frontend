import axios from "axios";
// import React from "react";
import { useForm } from "react-hook-form";

export const Sample = () => {
  const { register, handleSubmit } = useForm();
  const submitHandler = async(data) => {
    data.roleId = ""
    const res = await axios.post("/user/signup",data)
    console.log(res) 
    console.log(res.data) 
    
    if(res.status===201){
      
      //naviget
    }
    else{
      //user not added..
      //login..
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>USER SIGNUP...</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>FirstName</label>
          <input type="text" {...register("firstName")}></input>
        </div>
        
        <div>
          <label>LastName</label>
          <input type="text" {...register("lastName")}></input>
        </div>

        <div>
          <label>email</label>
          <input type="text" {...register("email")}></input>
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register("password")}></input>
        </div>
        
        <div>
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
};