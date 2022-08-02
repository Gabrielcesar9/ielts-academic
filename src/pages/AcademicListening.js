import React from 'react'
import { useForm } from 'react-hook-form'
import S1 from '../assets/audios/S1.mp3'
import S2 from '../assets/audios/S2.mp3'
import S3 from '../assets/audios/S3.mp3'
import S4 from '../assets/audios/S4.mp3'
import {useHistory} from 'react-router-dom'
import notebook from '../assets/images/notebook.jpg'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { updateListening } from '../actions'

const ListeningSection = () =>{
    const dispatch = useDispatch()
    
    scroll(0,0);
    window.onbeforeunload = function() { return "Your work will be lost."; };
    const history = useHistory();
    const answers = {
        '1':['canadian','1canadian'],
        '2':['furniture','2furniture'],
        '3':['park','3park'],
        '4':['250','sterling','4250','4sterling'],
        '5':['phone','5phone'],
        '6':['10september', '10thseptember', 'september10', 'september10th','610september', '610thseptember', '6september10', '6september10th'],
        '7':['museum','7museum'],
        '8':['time','8time'],
        '9':['blond','blonde','9blond','9blonde'],
        '10':['8795482361','108795482361'],
        '11':['a','A'],
        '12':['d','D'],
        '13':['b','B'],
        '14':['e','E'],
        '15':['on'],//b
        '16':['on'],//b
        '17':['on'],//c
        '18':['on'],//a
        '19':['on'],//a
        '20':['on'],//c
        '21':['on'],//b
        '22':['on'],//a
        '23':['on'],//c
        '24':['on'],//b
        '25':['on'],//a
        '26':['on'],//b
        '27':['on'],//a
        '28':['on'],//f
        '29':['on'],//g
        '30':['on'],//c
        '31':['industry','31industry'],
        '32':['constant','32constant'],
        '33':['direction','33direction'],
        '34':['floor','34floor'],
        '35':['predictable','35predictable'],
        '36':['bay','36bay'],
        '37':['gates','37gates'],
        '38':['fuel','38fuel'],
        '39':['jobs','39jobs'],
        '40':['migration','40migration']
    }
    var report = {
    }
    var Dones = {reading:useSelector(state=>state.Reading),
        listening:useSelector(state=>state.Listening),
        writing:useSelector(state=>state.Writing),
        email:useSelector(state=>state.Email)}
    console.log('listeningDones1', Dones)
    const {register, handleSubmit, formState:{errors}} = useForm();

    const doubleCheckBox1 = ()=>{
        let countcheck = 0;
        let checks = ['1-A','1-B','1-C','1-D','1-E'];
        for(let i=0; i<checks.length;i++){
            if(document.getElementById(checks[i]).checked){countcheck++; if(countcheck==3){alert('Please select only two boxes');
             for(let j=0; i<checks.length;j++){document.getElementById(checks[j]).checked=false}}}
        }}
    
    const doubleCheckBox2 = ()=>{
        let countcheck = 0;
        let checks = ['2-A','2-B','2-C','2-D','2-E'];
        for(let i=0; i<checks.length;i++){
            if(document.getElementById(checks[i]).checked){countcheck++; if(countcheck==3){alert('Please select only two boxes');
             for(let j=0; i<checks.length;j++){document.getElementById(checks[j]).checked=false}}}
        }}

    const onSubmitListening = data => {
        dispatch(updateListening())
        
        console.log('listeningDones', Dones)
        let countRight = 0;
        for(let i=1; i<=40;i++){
            if(i>=15&&i<=30){
               if(document.getElementById(i.toString()).checked){countRight+=1} else{console.log('WRONG',i)};
               //report['Question '+i.toString()] = document.getElementById(i.toString()).value;
            }
            else {
                let ans = answers[i.toString()];
                let inp = data[i.toString()].toString().toLowerCase().replace(/\s+|[.,!'"><~^\[\]\{\}\(\)\-_@#$%¨&]/g, '');
                if(ans.includes(inp)){countRight+=1;} else{console.log('WRONG',i, ans,inp)};
            } 
        }
        for(let i=1; i<=10;i++){
            report['Question '+i.toString()] = data[i.toString()].toString().replace(/\s+|[.,!'"><~^\[\]\{\}\(\)\-_@#$%¨&]/g, '');
        }
        
        for(let i=11;i<=12;i++){
            let checks = ['1-A','1-B','1-C','1-D','1-E'];
            let eleven_twelve = ''
            for(let j=0; j<checks.length;j++){
                if(document.getElementById(checks[j]).checked){eleven_twelve+=document.getElementById(checks[j]).value+' '}}
            report['Questions 11 and 12'] = eleven_twelve;
        }

        for(let i=13;i<=14;i++){
            let checks = ['2-A','2-B','2-C','2-D','2-E'];
            let thirteen_fourteen = ''
            for(let j=0; j<checks.length;j++){
                if(document.getElementById(checks[j]).checked){thirteen_fourteen+=document.getElementById(checks[j]).value+' '}}
            report['Questions 13 and 14'] = thirteen_fourteen;
        }
        for(let i=15;i<=20;i++){
            report['Questions 15 - 20 ['+i.toString()+']'] = document.querySelector(`input[name="${i.toString()}"]:checked`).value;
        }
        for(let i=21;i<=25;i++){
            report['Question '+i.toString()] = document.querySelector(`input[name="${i.toString()}"]:checked`).value;
        }
        for(let i=26;i<=30;i++){
            report['Questions 26 - 30 ['+i.toString()+']'] = document.querySelector(`input[name="${i.toString()}"]:checked`).value;
        }
        for(let i=31;i<=40;i++){
            report['Question '+i.toString()] = (data[i.toString()].toString().replace(/\s+|[.,!'"><~^\[\]\{\}\(\)\-_@#$%¨&]/g, '')).toString();
        }
        console.log('countRight', countRight);
        //console.log('Report',report)
        
        report['Email Address'] = Dones.email
        report['Timestamp'] = new Date().toLocaleString();
        report['Score'] = countRight.toString();
        console.log('data', data)
        console.log('report',report)
        axios.post('https://sheet.best/api/sheets/b6879cbc-6815-4f88-b88c-ebbd0820fe93/tabs/AC List A', report).then(response=>{console.log('response',response)})
        //history.push({pathname:'/reading', listening:true})


        if(Dones.reading){
            if(Dones.writing){alert('Test registered!\nEm breve seu resultado será enviado');window.location.reload();}
            else{history.push({pathname:'/writing',Dones})}
        }else{history.push({pathname:'/reading',Dones})}
        console.log('Dones',Dones)
    }
    

    return(
        <>
        <form onSubmit={handleSubmit(onSubmitListening)} style={{border:'solid black'}}>
        <div className='background'></div>
            <h2 style={{marginTop:'5%'}}> SECTION 1</h2>
            <div name="Questions1-10">   
                <h2> Questions 1 - 10</h2>
                <div className='audio'><audio src={S1} controls>Play audio</audio></div>
                <h4>Complete the form below.</h4>
                <h2 style={{textAlign:'left', marginLeft:'1%', }}>Write <b>ONE WORD AND/OR A NUMBER</b> for each answer.</h2>
                
                <div style={{border:"solid black", width:'50%', margin:'auto', backgroundImage:"url("+notebook+")"}}>
                    <h2 style={{'border-bottom':'solid black', 'paddingBottom':'2%'}}>CRIME REPORT FORM</h2>
                    <div style={{'border-bottom':'solid black', 'paddingBottom':'2%'}}>
                        <b style={{display:"inline", 'font-family': 'Space Mono, monospace', marginLeft:'1%', fontSize:'x-large'}}>Type of crime:</b><h4 style={{display:"inline",marginLeft:"15%"}}>theft</h4>
                        <br></br>
                        <b style={{'font-family': 'Space Mono, monospace', marginLeft:'1%', fontSize:'x-large'}}>Personal information</b>
                    </div>
                    <table style={{width:'100%', borderCollapse:'collapse', margin:'0'}}>
                        <tbody>
                            <tr><td className='form'><h4 style={{display:'inline'}}><i>Example</i></h4></td></tr>
                            <tr style={{borderBottom:'solid black', height:'40%'}}>
                                <td className='form'><h4 style={{display:'inline'}}>Name</h4></td>  
                                <td className='form'><h4 style={{fontWeight:'bold', display:'inline'}}>Louise</h4><u style={{marginLeft:"1%", display:'inline'}}>&nbsp;&nbsp;<i style={{'font-family': 'Schoolbell, arial, serif', fontWeight:'bold'}}>Taylor</i></u></td>
                            </tr>
                            <tr>
                                <td className='form' style={{paddingTop:'2%'}}><h4 style={{display:'inline'}}>Nationality</h4></td>
                                <td className='form'><p className='letter'>1)</p><input type="text" {...register("1")} required/></td>
                            </tr>
                            <tr>
                                <td className='form'><h4 style={{display:"inline"}}>Date of Birth</h4></td><td className='form'><h4 style={{display:'inline'}}>14 December 1977</h4></td>
                            </tr>
                            <tr>
                                <td className='form'><h4 style={{display:"inline"}}>Ocupation</h4></td><td className='form'><h4 style={{display:'inline'}}>Interior designer</h4></td>
                            </tr>
                            <tr>
                                <td className='form'><h4 style={{display:"inline"}}>Reason for visit</h4></td><td className='form'><h4 style={{display:"inline"}}>business (to buy antique</h4> <p className='letter'>2)</p><input type="text" {...register("2")} required/><h4 style={{display:'inline'}}>)</h4></td>
                            </tr>
                            <tr>
                                <td className='form'><h4 style={{display:"inline"}}>Lenght of stay</h4></td><td className='form'><h4 style={{display:'inline'}}>two months</h4></td>
                            </tr>
                            <tr>
                                <td className='form'><h4 style={{display:"inline"}}>Current address</h4></td><td className='form'><p className='letter'>3)</p><input type="text" {...register("3")} required/><h4 style={{display:'inline'}}>Apartments (No 15)</h4></td>
                            </tr>
                            <tr>
                                <td className='form' style={{lineHeight:'400%'}}><p style={{display:"inline" , fontWeight:'bold'}}>Details of theft</p></td><td className='form'><p className='letter'></p><h4 style={{diplay:'inline'}}></h4></td>
                            </tr>
                            <tr>
                                <td className='form'><h4 style={{display:"inline"}}>Items stolen</h4></td><td className='form'><h4 style={{display:"inline"}}> - a wallet containing approximately</h4> <p className='letter'>4)</p><h4 style={{display:'inline'}}>£</h4><input type="text" {...register("4")} required/></td>
                            </tr>
                            <tr>
                                <td className='form'></td><td className='form'><h4 style={{display:"inline"}}> - a <p className='letter'>5)</p> £ </h4><input type="text" {...register("5")} required/></td>
                            </tr>
                            <tr>
                                <td className='form'><h4 style={{display:"inline"}}>Date of theft</h4></td><td className='form'><h4 style={{display:"inline"}}><p className='letter'>6)</p></h4><input type="text" {...register("6")} required/></td>
                            </tr>
                            <tr>
                                <td className='form' style={{lineHeight:'400%'}}><p style={{display:"inline" , fontWeight:'bold'}}>Possible time and place of theft</p></td>
                            </tr>
                            <tr>
                                <td className='form'><h4 style={{display:"inline"}}>Location</h4></td><td className='form'><h4 style={{display:"inline"}}> outside the</h4><p className='letter'>7)</p><input type="text" {...register("7")} required/><h4 style={{display:'inline'}}>at about 4 pm</h4></td>
                            </tr>
                            <tr>
                                <td className='form'><h4 style={{display:"inline"}}>Details of suspect</h4></td><td className='form'><h4 style={{display:"inline", lineHeight:'150%'}}> - some boys asked for the<p className='letter'>8)</p><input type="text" {...register("8")} required/>then ran off</h4></td>
                            </tr>
                            <tr>
                                <td className='form'><p></p></td><td className='form'><h4 style={{display:"inline"}}> - one had a T-shirt with a picture of a tiger</h4></td>
                            </tr>
                            <tr>
                                <td className='form'></td><td className='form'><h4 style={{display:"inline"}}> - he was about 12, slim build with</h4> <p className='letter'>9)</p><input type="text" {...register("9")} required/><h4 style={{display:'inline'}}>hair</h4></td>
                            </tr>
                            <tr>
                                <td className='form' style={{lineHeight:'300%'}}><p style={{display:"inline" , fontWeight:'bold'}}>Crime reference number allocated</p></td><td className='form'><h4 style={{display:"inline"}}><p className='letter'>10)</p></h4><input type="text" {...register("10")} required/></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>

                <h2> SECTION 2</h2>

                <div name="Questions11-12" style={{width:'70%', margin:'auto'}}>

                    <h2>Questions 11 - 12</h2>
                    <div className='audio'><audio src={S2} controls>Play audio</audio></div>
                    <h2>Introduction talk for new apprentices</h2>
                    <h2>Choose TWO letters, <b>A-E</b>.</h2>
                    <h2>Which TWO pieces of advice for the first week of an apprenticeship does the manager give?</h2>
                    <ol type="A">
                        <li> get to know colleagues</li>
                        <li> learn from any mistakes</li>
                        <li> ask lots of questions</li>
                        <li> react positively to feedback</li>
                        <li> enjoy new challenges</li>
                    </ol>

                    <label>A<input type="checkbox" value="A" id="1-A" {...register("11",{onChange:doubleCheckBox1})}/></label>
                    <label>B<input type="checkbox" value="B" onChange={doubleCheckBox1}  id="1-B"/></label>
                    <label>C<input type="checkbox" value="C" onChange={doubleCheckBox1}  id="1-C"/></label>
                    <label>D<input type="checkbox" value="D" id="1-D" {...register("12", {onChange:doubleCheckBox1})}/></label>
                    <label>E<input type="checkbox" value="E" onChange={doubleCheckBox1}  id="1-E"/></label>
                </div>
             
                <div name="Questions13-14" style={{width:'70%', margin:'auto'}}>

                    <h2>Questions 13 - 14</h2>
                    <h2>Choose <b>TWO</b> letters, <b>A-E</b>.</h2>
                    <h2>Which <b>TWO</b> things does the manager say mentors can help with?</h2>
                    <ol type="A">
                        <li> confidence-building</li>
                        <li> making career plans</li>
                        <li> completing difficult tasks</li>
                        <li> making a weekly timetable</li>
                        <li> reviewing progress</li>
                    </ol>

                    <label>A<input type="checkbox" value="A" onChange={doubleCheckBox2} id="2-A"/></label>
                    <label>B<input type="checkbox" value="B" id="2-B" {...register("13",{onChange:doubleCheckBox2})}/></label>
                    <label>C<input type="checkbox" value="C" onChange={doubleCheckBox2} id="2-C"/></label>
                    <label>D<input type="checkbox" value="D" onChange={doubleCheckBox2} id="2-D"/></label>
                    <label>E<input type="checkbox" value="E" id="2-E" {...register("14",{onChange:doubleCheckBox2})}/></label>
                </div>

                <div name="Questions15-20" style={{width:'70%', margin:'auto'}}>

                    <h2>Questions 15 - 20</h2>
                    <h2>What does the manager say about each of the following aspects of the company policy for apprentices?</h2>
                    <h2>Write the correct letter, <b>A</b>, <b>B</b>, <b>C</b>, next to Questions 15-20.</h2>
                    <div style={{border:'solid black', width:'fit-content', padding:'1%', margin:'auto'}}>
                        <ol type="A">
                            <li>It is encouraged.</li>
                            <li>There are some restrictions.</li>
                            <li>It is against the rules.</li>
                        </ol>
                    </div>
                    <h4>Company policy for apprentices</h4>
                    <ol start="15">
                        <table>
                            <tbody>
                            <tr style={{border:'solid pink'}}>
                                <td></td>
                                <td style={{textAlign:'center'}}><h4 style={{lineHeight:'0%'}}>A</h4></td>
                                <td style={{textAlign:'center'}}><h4 style={{lineHeight:'0%'}}>B</h4></td>
                                <td style={{textAlign:'center'}}><h4 style={{lineHeight:'0%'}}>C</h4></td>
                            </tr>
                            <tr>
                                <td><li>Using the internet.</li></td>
                                <td><input name="15" type="radio" value="A"/></td>
                                <td><input name="15" type="radio" value="B" id="15" {...register("15")}/></td>
                                <td><input name="15" type="radio" value="C"/></td>
                            </tr>
                            <tr>
                                <td><li>Flexible working.</li></td>
                                <td><input name="16" type="radio" value="A"/></td>
                                <td><input name="16" type="radio" value="B" id="16" {...register("16")}/></td>
                                <td><input name="16" type="radio" value="C"/></td>
                            </tr>
                            <tr>
                                <td><li>Booking holidays.</li></td>
                                <td><input name="17" type="radio" value="A"/></td>
                                <td><input name="17" type="radio" value="B"/></td>
                                <td><input name="17" type="radio" value="C" id="17" {...register("17")}/></td>
                            </tr>
                            <tr>
                                <td><li>Working overtime.</li></td>
                                <td><input name="18" type="radio" value="A" id="18" {...register("18")}/></td>
                                <td><input name="18" type="radio" value="B"/></td>
                                <td><input name="18" type="radio" value="C"/></td>
                            </tr>
                            <tr>
                                <td><li>Wearing trainers.</li></td>
                                <td><input name="19" type="radio" value="A" id="19" {...register("19")}/></td>
                                <td><input name="19" type="radio" value="B"/></td>
                                <td><input name="19" type="radio" value="C"/></td>
                            </tr>
                            <tr>
                                <td><li>Bringing food to work.</li></td>
                                <td><input name="20" type="radio" value="A"/></td>
                                <td><input name="20" type="radio" value="B"/></td>
                                <td><input name="20" type="radio" value="C" id="20" {...register("20")}/></td>
                            </tr>
                            </tbody>
                            
                        </table>
                    </ol>
                    
                </div>

                <h2> SECTION 3</h2>

                <div name="Questions21-30" style={{width:'70%', margin:'auto'}}>
                    <div>
                        <h2>Question 21</h2>
                        <div className='audio'><audio src={S3} controls>Play audio</audio></div>
                        <h2>Carla and Rob were surprised to learn that coastal cities</h2>
                        <ol type="A">
                            <li><input name="21" type="radio" value="A"/>contain nearly half the world's population.</li>
                            <li><input name="21" type="radio" value="B" id="21"  {...register("21")}/>include most of the world's largest cities.</li>
                            <li><input name="21" type="radio" value="C"/>are growing twice as fast as other cities.</li>
                        </ol>
                    </div>

                    <div>
                        <h2>Question 22</h2>
                        <h2>According to Rob, building coastal cities near to rivers</h2>
                        <ol type="A">
                            <li><input name="22" type="radio" value="A" id="22" {...register("22")}/>may bring pollution to the cities.</li>
                            <li><input name="22" type="radio" value="B"/>may reduce the land available for agriculture.</li>
                            <li><input name="22" type="radio" value="C"/>may mean the countryside is spoiled by industry.</li>
                        </ol>
                    </div>

                    <div>
                        <h2>Question 23</h2>
                        <h2>What mistake was made when building water drainage channels in Miami is the 1950s?</h2>
                        <ol type="A">
                            <li><input name="23" type="radio" value="A"/>There were not enough og them.</li>
                            <li><input name="23" type="radio" value="B"/>They were made of unsuitable materials.</li>
                            <li><input name="23" type="radio" value="C" id="23" {...register("23")}/>They did not allow for the effects of climate change.</li>
                        </ol>
                    </div>

                    <div>
                        <h2>Question 24</h2>
                        <h2>What do Rob and Carla think that the authorities in Miami should do immediately?</h2>
                        <ol type="A">
                            <li><input name="24" type="radio" value="A"/>take measures to restore ecosystems</li>
                            <li><input name="24" type="radio" value="B" id="24" {...register("24")}/>pay for a new flood prevention system</li>
                            <li><input name="24" type="radio" value="C"/>stop disposing of waste materials into the ocean</li>
                        </ol>
                    </div>

                    <div>
                        <h2>Question 25</h2>
                        <h2>What do they agree should be the prioruty for international action?</h2>
                        <ol type="A">
                            <li><input name="25" type="radio" value="A" id="25" {...register("25")}/>greater coordination of activities</li>
                            <li><input name="25" type="radio" value="B"/>more sharing of information</li>
                            <li><input name="25" type="radio" value="C"/>agreement oin shared policies</li>
                        </ol>
                    </div>

                    <div>
                        <h2>Questions 26 - 30</h2>
                        <h2>What decision do the students make about each of the following parts of their presentaion?</h2>
                        <h2>Choose <b>FIVE</b> answers from the box and write the correct letter, <b>A-G</b>, next to Questions 26-30</h2>
                        <div style={{border:'solid black', width:'fit-content', padding:'1%', margin:'auto'}}>
                            <h2>Decisions</h2>
                            <ol type="A">
                                <li>use visuals</li>
                                <li>keep it short</li>
                                <li>involve other students</li>
                                <li>check the information is accurate</li>
                                <li>provide a handout</li>
                                <li>focus on one example</li>
                                <li>do online research</li>
                            </ol>
                        </div>
                        <h4>Parts of the presentation</h4>
                        <ol start="26">
                            <table>
                                <tbody>
                                <tr><td></td><td style={{textAlign:'center'}}><h4 style={{lineHeight:'0%'}}>A</h4></td><td style={{textAlign:'center'}}><h4 style={{lineHeight:'0%'}}>B</h4></td><td style={{textAlign:'center'}}><h4 style={{lineHeight:'0%'}}>C</h4></td><td style={{textAlign:'center'}}><h4 style={{lineHeight:'0%'}}>D</h4></td><td style={{textAlign:'center'}}><h4 style={{lineHeight:'0%'}}>E</h4></td><td style={{textAlign:'center'}}><h4 style={{lineHeight:'0%'}}>F</h4></td><td style={{textAlign:'center'}}><h4 style={{lineHeight:'0%'}}>G</h4></td></tr>
                                <tr>
                                   <td><li>Historical background.</li></td>
                                   <td><input name="26" type="radio" value="A"/></td>
                                   <td><input name="26" type="radio" value="B" id="26" {...register("26")}/></td>
                                   <td><input name="26" type="radio" value="C"/></td>
                                   <td><input name="26" type="radio" value="D"/></td>
                                   <td><input name="26" type="radio" value="E"/></td>
                                   <td><input name="26" type="radio" value="F"/></td>
                                   <td><input name="26" type="radio" value="G"/></td>                       
                                </tr>
                                <tr>
                                    <td><li>Geographical factors.</li></td>
                                    <td><input name="27" type="radio" value="A" id="27" {...register("27")}/></td>
                                    <td><input name="27" type="radio" value="B"/></td>
                                    <td><input name="27" type="radio" value="C"/></td>
                                    <td><input name="27" type="radio" value="D"/></td>
                                    <td><input name="27" type="radio" value="E"/></td>
                                    <td><input name="27" type="radio" value="F"/></td>
                                    <td><input name="27" type="radio" value="G"/></td>
                                </tr>
                                <tr>
                                    <td><li>Past mistakes.</li></td>
                                    <td><input name="28" type="radio" value="A"/></td>
                                    <td><input name="28" type="radio" value="B"/></td>
                                    <td><input name="28" type="radio" value="C"/></td>
                                    <td><input name="28" type="radio" value="D"/></td>
                                    <td><input name="28" type="radio" value="E"/></td>
                                    <td><input name="28" type="radio" value="F" id="28" {...register("28")}/></td>
                                    <td><input name="28" type="radio" value="G"/></td>
                                </tr>
                                <tr>
                                    <td><li>Future risks.</li></td>
                                    <td><input name="29" type="radio" value="A"/></td>
                                    <td><input name="29" type="radio" value="B"/></td>
                                    <td><input name="29" type="radio" value="C"/></td>
                                    <td><input name="29" type="radio" value="D"/></td>
                                    <td><input name="29" type="radio" value="E"/></td>
                                    <td><input name="29" type="radio" value="F"/></td>
                                    <td><input name="29" type="radio" value="G" id="29" {...register("29")}/></td>
                                </tr>
                                <tr>
                                    <td><li>International implications.</li></td>
                                    <td><input name="30" type="radio" value="A"/></td>
                                    <td><input name="30" type="radio" value="B"/></td>
                                    <td><input name="30" type="radio" value="C" id="30" {...register("30")}/></td>
                                    <td><input name="30" type="radio" value="D"/></td>
                                    <td><input name="30" type="radio" value="E"/></td>
                                    <td><input name="30" type="radio" value="F"/></td>
                                    <td><input name="30" type="radio" value="G"/></td>
                                </tr>
                                </tbody>  
                            </table>
                        </ol>
                        </div>
                </div>

                <h2> SECTION 4</h2>
                <div name="Questions31-40">
                <h2> Questions 31 - 40</h2>
                <div className='audio'><audio src={S4} controls>Play audio</audio></div>
                <h4 style={{textAlign: 'center'}}>Complete the form below.</h4>
                <h2>Write <b>ONE WORD ONLY</b> for each answer.</h2>
                
                <div style={{border:"solid black", width:'70%', margin:'auto', paddingLeft:'2%', paddingBottom:'1%', backgroundImage:"url("+notebook+")"}}>
                    <h2>Marine renewable energy (ocean energy)</h2>
                    <p style={{fontWeight:'bold', marginBottom:'1%', fontFamily:'Cambria'}}>Introduction</p>
                    <label>More energy required because of growth in popular and <b>31 </b><input {...register("31")} required/></label>
                    <label><br/>What's needed:</label>
                    <ul>
                        <li>renewable energy sources</li>
                        <li>methods that won't create pollution</li>
                    </ul>
                    <p style={{fontWeight:'bold', marginBottom:'1%', fontFamily:'Cambria'}}>Wave energy</p>
                    <p style={{fontWeight:'bold', marginBottom:'1%', fontFamily:'Cambria'}}>Advantage: </p>
                    <label>waves provide a <b>32</b> <input {...register("32")} required/> source of renewable energy<br/>
                    Electricity can be generated using offshore or onshore systems<br/>Onshore systems may use a reservoir</label>
                    <p style={{fontWeight:'bold', marginBottom:'1%', fontFamily:'Cambria'}}>Problems:</p>
                    <label>
                        <ul>
                            <li>waves can move in any <b>33 </b><input {...register("33")} required/></li>
                            <li>movement of sand, etc. on the <b>34 </b><input {...register("34")} required/>of the ocean may be affected</li>
                        </ul>
                    </label>
                    <p style={{fontWeight:'bold', marginBottom:'1%', fontFamily:'Cambria'}}>Tidal energy</p>
                    <label>Tides are more <b>35 </b><input {...register("35")} required/> than waves<br/>Planned tidal lagoon in Wales:
                    <ul>
                        <li>will be created in a <b>36 </b> <input {...register("36")} required/> at Swansea</li>
                        <li>breakwater (dam) containing 16 turbines</li>
                        <li>rising tide forces water through turbines, generating electricity</li>
                        <li>stored water is released through <b>37 </b><input {...register("37")} required/>, driving the turbines in the reverse direction</li>
                        <p style={{fontWeight:'bold', marginBottom:'1%', fontFamily:'Cambria'}}>Advantages:</p>
                        <li>not dependent on weather</li>
                        <li>no <b>38 </b><input {...register("38")} required/> is required to make it work</li>
                        <li>likely to create a number of <b>39 </b><input {...register("39")} required/></li>
                    
                    <p style={{fontWeight:'bold', marginBottom:'1%', fontFamily:'Cambria'}}><b></b>Problem:</p>
                    <li>may harm fish and birds, e.g. by affecting <b>40</b> <input {...register("40")} required/> and building up silt</li></ul>
                    <p style={{fontWeight:'bold', fontFamily:'Cambria'}}>Ocean thermal energy conversion</p>
                    Uses a difference in temperature between the surface and lower levels<br/>Water brought to the surface in a pipe
                    <br></br>
                    </label>
                </div>
            {errors.type === "required" && alert('First name is required')}
            </div>
            <input className='submit' type="submit" value={"Submit Answers"}/>
            
        </form>

        </>
        
    )
}

export default ListeningSection;