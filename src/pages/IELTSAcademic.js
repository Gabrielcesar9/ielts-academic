import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import ListeningSection from './AcademicListening';
import ReadingSection from './AcademicReading';
import WritingSection from './AcademicWriting';

const IELTSAcademic = () => {
    return (<Router basename='IELTSAcademic'>
            <Redirect to="/AcademicReading"/>
                <Route exact path="/AcademicListening"><ListeningSection/></Route>
                <Route exact path="/AcademicReading"><ReadingSection/></Route>
                <Route exact path="/AcademicWriting"><WritingSection/></Route>
            </Router>)
}

export default IELTSAcademic;