import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import validator from 'validator'
import  { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateEmail } from '../../actions'

const EmailForm = ()=>{
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm();
    let email = useSelector(state=>state.Email)
    const history = useHistory();
    const onSubmit = data => {
        console.log('data',data)
        if(validator.isEmail(data.email)){alert("Nice Email");
            dispatch(updateEmail(data.email))
            console.log('EMAIILL', email)
         //history.push({pathname:props.path,Dones})
        }
        else{alert("Please provide a valid E-mail");}    
    }
    return(
        <div>
            <div className='background'></div>
            <div className="login">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" style={{width:'80%', background:'white', border:'solid gray', display:'inline'}} className = "email" placeholder='E-mail' {...register("email")} />
                    <input type="submit" style={{width:'fit-content', padding:'3%', float:'right',}} className="confirm" value={"Confirm"}/>
                </form>
            </div>
        {useSelector(state=>state.Email)?history.push({pathname:`/Home/ChooseTest`}):console.log('not email yet')}
        </div>
        
        
        
        
        
            
    )

}

export default EmailForm