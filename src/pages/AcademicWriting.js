import React from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import im1 from '../assets/images/IELTS_Academic_A1.png'
import im2 from '../assets/images/IELTS_Academic_A2.png'
import "../test.css"
import axios from 'axios';
import {useSelector, useDispatch } from 'react-redux'
import { updateWriting } from '../actions'

const WritingSection = () => {
    const dispatch = useDispatch();
    scroll(0,0);
    window.onbeforeunload = function() { return "Your work will be lost."; };
    const history = useHistory();
    const {register, handleSubmit, formState:{errors}} = useForm();
    var Dones = {reading:useSelector(state=>state.Reading),
        listening:useSelector(state=>state.Listening),
        writing:useSelector(state=>state.Writing),
        email:useSelector(state=>state.Email)}
    
    const handleChange1 = () =>{
        let countWord1 = (event.target.value).split(' ');
        let span = document.getElementById('countWord1');
        let amount = 151 - countWord1.length;
        if(amount < 0){span.textContent = '+' + String(-amount)}
        else { span.textContent = amount;}
        
    }

    const handleChange2 = () =>{
        let countWord2 = (event.target.value).split(' ');
        let span = document.getElementById('countWord2');
        let amount = 251 - countWord2.length;
        if(amount < 0){span.textContent = '+' + String(-amount);}
        else { span.textContent = amount;}
    }
    var report = {}
    const onSubmiWriting = data => {
        dispatch(updateWriting())
        console.log('writingDones', Dones)
        const Writing1 = document.getElementById('Writing1').value;
        const Writing2 = document.getElementById('Writing2').value;
        console.log(Writing1,Writing2)
        report['Email Address'] = Dones.email
        report['Timestamp'] = new Date().toLocaleString();
        report['Writing Task 1'] = Writing1
        report['Writing Task 2'] = Writing2
        axios.post('https://sheet.best/api/sheets/b6879cbc-6815-4f88-b88c-ebbd0820fe93/tabs/AC Writ A', report).then(response=>{console.log('response',response), console.log('Dones',Dones)})
        

        if(Dones.listening){
            if(Dones.reading){alert('Test registered!\nEm breve seu resultado será enviado');window.location.reload();}
            else{history.push({pathname:'/reading'})}
        }else{history.push({pathname:'/listening'})}
        
    }
    return(
        <div>
        <div>
        <div className='test-background'></div>
        <div className='test_container'>
            <form onSubmit={handleSubmit(onSubmiWriting)}>
            <div>
                <h2>WRITING TASK 1</h2>
                <p>You should spend about 20 minutes on this task.</p>
                <div >
                    <p className='description'><b><i>The chart below shows the value of one country's exports in various categories during 2015 and 2016.
                        The table shows the percentage change in each category of exports in 2016 compared with 2015.</i></b>
                    </p>
                    <p><b><i>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</i></b></p>
                </div>
                <p style={{fontWeight:'bold'}}>&nbsp;&nbsp;&nbsp;&nbsp; Write at least 150 words.</p>
                <div className='middle'>
                    <div className='middle2' >
                        <img className='middle2' style={{height:'50%',width:'60%'}} src={im1}/>
                        <img className='middle2' style={{height:'30%',width:'30%'}} src={im2}/>
                    </div>
                </div>
                <textarea spellcheck="false" onChange={handleChange1} type="text" id="Writing1" required placeholder='Write your essay here'></textarea>
                <label>Word count: <span id='countWord1'></span></label>
            </div>

            <div>
                <h2>WRITING TASK 2</h2>
                <p>You should spend about 40 minutes on this task.</p>
                <p>Write about the following topic.</p>
                <div>
                    <p className='description'><b><i>Some people say that the main environmental problem of our time is the loss of particular species of plants and animals.
                        Others say that there are more important environmental problems.</i></b>
                    </p>
                    <p><b><i>Discuss both these views and give your own opinion.</i></b></p>
                </div>
                <p>Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                <p>Write at least 250 words.</p>
                
                <textarea spellcheck="false" type='text' onChange={handleChange2} id="Writing2" required></textarea>
                <label>Word count: <span id='countWord2'></span></label>
            </div>
            <input className='submit' type="submit" value={"Submit Tasks"}/>
            </form>
        </div>
        </div>
        
        
        </div>
        )
}

export default WritingSection