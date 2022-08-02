
import React, {useEffect, useState} from 'react';
import "../Choose.css"
import {useSelector} from 'react-redux'
import  { Redirect, useHistory } from 'react-router-dom'

const ChooseTest = () => {
    window.onbeforeunload = () =>{alert('Your work will be lost')}
    const [test, setTest] = useState('listening');
    const [confirm, setConfirm] = useState(false);
    const history = useHistory();

    function handleChange(selected){
        setTest(selected)
    }
    console.log('State',useSelector(state=>state.Email))

    useEffect(()=>{
        const tests = ['listening','reading','writing'];
        document.getElementById(test).style.border='solid red';
        for(let i=0;i<tests.length;i++){if(tests[i]!=test){;document.getElementById(tests[i]).style.border='solid rgb(20, 184, 196)'}}
    })

    return(
        <div>
            <div className='background'></div>
            <div className="testContainer">
                <div className='test noselect' id='listening' onClick={()=>{handleChange('listening')}}><label>Listening</label></div>
                <div className='test noselect' id='reading' onClick={()=>{handleChange('reading')}}><label>Reading</label></div>
                <div className='test noselect' id='writing' onClick={()=>{handleChange('writing')}}><label>Writing</label></div>
            </div>
            <button className="button" onClick={()=>{setConfirm(true)}}><label>Start</label></button>
            {confirm?history.push({pathname:`/${test}`}):null}
        </div>
    )
}

export default ChooseTest;