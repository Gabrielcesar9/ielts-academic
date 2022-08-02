import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import EmailForm from '../components/EmailForm/EmailForm';
import ListeningSection from './AcademicListening';
import ReadingSection from './AcademicReading';
import WritingSection from './AcademicWriting';
import ChooseTest from './ChooseTest';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';


const Home = () =>{

    //axios.post('https://sheet.best/api/sheets/b6879cbc-6815-4f88-b88c-ebbd0820fe93/tabs/AC List A', {'A':'Malu'})
    //.then(response=>{console.log(response)})
    
//await res.send(getRows.data);

    return (
        <>
        <Router>
        {useSelector(state=>state.Email)?<Redirect to={{pathname: '/Home/ChooseTest'}}/>:<Redirect to={{pathname: '/Home/Email'}}/>}
            <Route exact path="/listening"><ListeningSection/></Route>
            <Route exact path="/reading"><ReadingSection/></Route>
            <Route exact path="/writing"><WritingSection/></Route>
            <Route exact path="/Home/ChooseTest"><ChooseTest/></Route>
            <Route exact path="/Home/Email"><EmailForm/></Route>
        </Router>
        </>
        
    )
}

export default Home;