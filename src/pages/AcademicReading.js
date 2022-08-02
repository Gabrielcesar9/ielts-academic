import React from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import {useSelector, useDispatch } from 'react-redux';
import { updateReading } from '../actions';

const ReadingSection = () => {
    //scroll(0,0);
    window.onbeforeunload = function() { return "Your work will be lost."; };  
    const history = useHistory();
    const dispatch = useDispatch()
    var Dones = {reading:useSelector(state=>state.Reading),
        listening:useSelector(state=>state.Listening),
        writing:useSelector(state=>state.Writing),
        email:useSelector(state=>state.Email)}
    console.log('Dones', Dones) 

    window.addEventListener("keydown", (e) => {
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
          e.preventDefault();
        }
      })

    
    const answers = {
        '1':['four','14','1four'],
        '2':['young','2young'],
        '3':['food','3food'],
        '4':['light','4light'],
        '5':['aggressively','5aggressively'],
        '6':['location','6location'],
        '7':['neurons','7neurons'],
        '8':['chemicals','8chemicals'],
        '9':['on'],
        '10':['on'],
        '11':['on'],
        '12':['on'],
        '13':['on'],
        '14':['on'],//b
        '15':['on'],//e
        '16':['on'],//c
        '17':['on'],//a
        '18':['on'],//true
        '19':['on'],//true
        '20':['on'],//not given
        '21':['on'],//false
        '22':['on'],//not given
        '23':['true'],//b
        '24':['true'],//d
        '25':['true'],//b
        '26':['true'],//e
        '27':['on'],//false
        '28':['on'],//not given
        '29':['on'],//false
        '30':['on'],//true
        '31':['on'],//false
        '32':['on'],//true
        '33':['on'],//not given
        '34':['large','34large'],
        '35':['microplastic','35microplastic'],
        '36':['populations','36populations'],
        '37':['concentrations','37concentrations'],
        '38':['predators','38predators'],
        '39':['disasters','39disasters'],
        '40':['on']//a
    }
    var report = {
    }
    const {register, handleSubmit, formState:{errors}} = useForm();

    const doubleCheckBox1 = ()=>{
        let countcheck = 0;
        let checks = ['1-A','1-B','1-C','1-D','1-E'];
        for(let i=0; i<checks.length;i++){
            if(document.getElementById(checks[i]).checked){countcheck++; if(countcheck==3){alert('Please select only two boxes');
            for(let j=0; i<checks.length;j++){document.getElementById(checks[j]).checked=false}}};
            
        }}
    
    const doubleCheckBox2 = ()=>{
        let countcheck = 0;
        let checks = ['2-A','2-B','2-C','2-D','2-E'];
        for(let i=0; i<checks.length;i++){
            if(document.getElementById(checks[i]).checked){countcheck++; if(countcheck==3){alert('Please select only two boxes');
            for(let j=0; i<checks.length;j++){document.getElementById(checks[j]).checked=false}}};
        }}

    const onSubmitReading = data => {
        dispatch(updateReading())
        
        console.log('readingDones', Dones)
        let countRight = 0;
        for(let i=1; i<=40;i++){
            if((i>=9&&i<=22) || (i>=27&&i<=33) || i==40){
                console.log(i)
               if(document.getElementById(i.toString()).checked){countRight+=1} else{console.log('WRONG',i)};
               //console.log(document.getElementById(i.toString()));
            }
            else {
                let ans = answers[i.toString()];
                let inp = data[i.toString()].toString().replace(/\s+|[.,!'"><~^\[\]\{\}\(\)\-_@#$%¨&]/g, '');
                if(ans.includes(inp)){
                    countRight+=1;} 
                    else{console.log('ans',ans,typeof(ans),'inp', inp)};
            }
            console.log('countRight', countRight);
            //history.push('/AcademicWriting')
            //if(ans.includes(inp)){console.log('ok');countRight+=1; console.log(countRight);console.log(inp)} else{console.log('ans',ans,typeof(ans),'inp', inp, typeof(inp), false)};
        }
        for(let i=1; i<=8;i++){
            report['Question '+i.toString()] = data[i.toString()].toString().replace(/\s+|[.,!'"><~^\[\]\{\}\(\)\-_@#$%¨&]/g, '');
        }
        for(let i=9; i<=13;i++){
            report['Questions 9 - 13 ['+i.toString()+']'] = document.querySelector(`input[name="${i.toString()}"]:checked`).value;
        }
        for(let i=14; i<=17;i++){
            report['Questions 14 - 17 ['+i.toString()+']'] = document.querySelector(`input[name="${i.toString()}"]:checked`).value;
        }
        for(let i=18; i<=22;i++){
            report['Questions 18 - 22 ['+i.toString()+']'] = document.querySelector(`input[name="${i.toString()}"]:checked`).value;
        }
        for(let i=23;i<=24;i++){
            let checks = ['1-A','1-B','1-C','1-D','1-E'];
            let thirteen_fourteen = ''
            for(let j=0; j<checks.length;j++){
                if(document.getElementById(checks[j]).checked){thirteen_fourteen+=document.getElementById(checks[j]).value+' '}}
            report['Questions 23 and 24'] = thirteen_fourteen;
        }
        for(let i=25;i<=26;i++){
            let checks = ['2-A','2-B','2-C','2-D','2-E'];
            let thirteen_fourteen = ''
            for(let j=0; j<checks.length;j++){
                if(document.getElementById(checks[j]).checked){thirteen_fourteen+=document.getElementById(checks[j]).value+' '}}
            report['Questions 25 and 26'] = thirteen_fourteen;
        }
        for(let i=27;i<=33;i++){
            'Questions 27 - 33 [27]'
            report['Questions 27 - 33 ['+i.toString()+']'] = document.querySelector(`input[name="${i.toString()}"]:checked`).value;
        }
        for(let i=34; i<=39;i++){
            report['Question '+i.toString()] = data[i.toString()].toString().replace(/\s+|[.,!'"><~^\[\]\{\}\(\)\-_@#$%¨&]/g, '');
        }
        report['Email Address'] = Dones.email
        report['Timestamp'] = new Date().toLocaleString();
        report['Score'] = countRight.toString();
        report['Question 40'] = document.querySelector(`input[name="40"]:checked`).value;
        console.log('report',report)
        axios.post('https://sheet.best/api/sheets/b6879cbc-6815-4f88-b88c-ebbd0820fe93/tabs/AC Read A', report).then(response=>{console.log('response',response)})
        
        if(Dones.listening){
            if(Dones.writing){alert('Test registered!\nEm breve seu resultado será enviado');window.location.reload();}
            else{history.push({pathname:'/writing',})}
        }else{history.push({pathname:'/listening'})}
         
    }

    return(
        <form onSubmit={handleSubmit(onSubmitReading)}>
            <div style={{border:'solid black'}}>
                <h2> READING PASSAGE 1</h2>
                <h4><i>You should spend about 20 minutes on <b>Questions 1-13</b>, which are based on Reading Passage 1 below.</i></h4>
                <h2>The secret of staying young</h2>
                <p>Pheidole dentata, a native ant of the south-eastern U.S., isn’t immortal. But scientists have found that it doesn’t seem to show any signs of aging. 
                    Old worker ants can do everything just as well as the youngsters, and their brains appear just as sharp. ‘We get a picture that these ants really don’t decline,’
                    says Ysabel Giraldo, who studies the ants for her doctoral thesis at Boston University.</p>

                <p>Such age-defying feats are rare in the animal kingdom. Naked mole rats can live for almost 30 years and stay fit for nearly their entire lives.
                    They can still reproduce even when old, and they never get cancer. But the vast majority of animals deteriorate with age just like people do.
                    Like the naked mole rat, ants are social creatures that usually live in highly organized colonies, ‘It’s this social complexity that makes P.dentata
                    useful for studying aging in people,’ says Giraldo, now at the California Institute of Technology. Humans are also highly social, a trait that has
                        been connected to healthier aging. By contrast, most animal studies of aging use mice, worms or fruit flies, which all lead much more isolated lives;</p>

                <p>In the lab, P.dentata worker ants typically live for around 140 days. Giraldo focused on ants at four age ranges: 20 to 22 days, 45 to 47 days,
                    95 to 97 days and 120 to 122 days. Unlike all previous studies, which only estimated how old the ants were, her work tracked the ants from the
                    time the pupae became adults, so she knew their exact ages. Then she put them through a range of tests.</p>

                <p>Giraldo watched how well the ants took care of the young of the colony, recording how often each ant attended to, carried and fed them. She compared how
                    well 20-day-old and 95-day-old ants followed the telltale scent that the insects usually leave to mark a trail to food. She tested how ants responded 
                    to light and also measured how active they were by counting how often ants in a small dish walked across a line. And she experimented with how ants react 
                    to live prey: a tethered fruit fly. Giraldo expected the older ants to perform poorly in all these tasks. But the elderly insects were all good caretakers
                    and trail-followers – the 95-day-old ants could track the scent even longer than their younger counterparts. They all responded to light well, and the 
                    older ants were more active. And when it came to reacting to prey, the older ants attacked the poor fruit fly just as aggressively as the young ones did,
                    flaring their mandibles or pulling at the fly’s legs.</p>
                <p>Then Giraldo compared the brains of 20-day-old and 95-day-old ants, identifying any cells that were close to death. She saw no major differences with a age,
                    nor was there any difference in the location of the dying cells, showing that age didn’t seem to affect specific brain functions. Ants and other insects have
                    structures in their brains called mushroom bodies, which are important for processing information, learning and memory. She also wanted to see if aging affects
                    the density of synaptic complexes within these structures – regions where neurons come together. Again, the answer was no. What was more, the old ants didn’t
                        experience any drop in the levels of either serotonin or dopamine – brain chemicals whose decline often coincides with aging. In humans, for example, a decrease
                        in serotonin has been linked to Alzheimer’s disease.</p>
                <p>‘This is the first time anyone has looked at both behavioral and neural changes in these ants so thoroughly,’ says Giraldo, who recently published the findings
                    in the Proceedings of the Royal Society B. Scientists have looked at some similar aspects in bees but the results of recent bee studies were mixed – some studies
                    showed age-related declines, which biologists call senescence, and others didn’t. ‘For now, the study raises more questions than it answers, ‘Giraldo says,
                    ‘including how P. dentata stays in such good shape.’</p>
                <p>Also, if the ants don’t deteriorate with age, why do they die at all? Out in the wild, the ants probably don’t live for a full 140 days thanks to predators, 
                    disease and just being in an environment that’s much harsher than the comforts of the lab. ‘The lucky ants that do live into old age may suffer a steep decline
                    just before dying,’ Giraldo says, but she can’t say for sure because her study wasn’t designed to follow an ant’s final moments.</p>
                <p>‘It will be important to extend these findings to other species of social insects,’ says Gene E. Robinson, an entomologist at the University of Illinois at
                    Urbana-Champaign. This ant might be unique, or it might represent a broader pattern among other social bugs with possible clues to the science of aging in
                    larger animals. Either way, it seems that for these ants, age really doesn’t matter.</p>
            </div>
            <div name="Reading-1">
                
                <h4>Complete the notes below.</h4>
                <h4>Choose <b>ONE WORD ONLY</b> from the passage each answer.</h4>
                <h4>Write your answer in the boxes <b>1-8</b> below</h4>
                
                <div style={{border:"solid black", width:'fit-content', margin:'auto'}}>
                    <h2>Ysabel Giraldo's research</h2>
                    <ul>
                        <label>Focused on a total of <b>1 </b><input {...register("1")} required/> different age groups of ants, analysing</label>
                        <h2 style={{'text-align':"left", }}>Behaviour</h2>
                        <li>how well ants looked after their <b>2 </b><input {...register("2")} required/></li>
                        <li>their ability to locate <b>3 </b><input {...register("3")} required/></li>
                        <li>the effect that <b>4 </b><input {...register("4")} required/> using a scent trail</li>
                        <li>how <b>5 </b><input {...register("5")} required/> they attacked prey</li>
                        <h2 style={{'text-align':'left'}}>Brains:</h2>
                        <li>comparison between age and the <b>6 </b><input {...register("6")} required/> of dying cells in the brain of ants</li>
                        <li>condition of synaptic complexes (areas in which <b>7</b><input {...register("7")} required/> meet) in the brain's 'mushroom bodies'</li>
                        <li>level of two <b>8 </b><input {...register("8")} required/> in the brain associated with ageing</li>
                    </ul>
                </div>

                <h4>Questions 9-13</h4>
                <h4>Do the following statements agree with the information given in Reading Passage 1?</h4>
                <h4><i>For the statements 9-13 below, mark</i> </h4>
                <table>
                    <tbody>
                        <tr><td style={{padding:'2%', 'white-space': 'nowrap'}}><b style={{'font-family': 'Space Mono, monospace'}}>TRUE</b></td><td><i style={{'font-family': 'Space Mono, monospace'}}>&nbsp;&nbsp;&nbsp;&nbsp;if the statement agrees with the information</i></td></tr>
                        <tr><td style={{padding:'2%', 'white-space': 'nowrap'}}><b style={{'font-family': 'Space Mono, monospace'}}>FALSE</b></td><td><i style={{'font-family': 'Space Mono, monospace'}}>&nbsp;&nbsp;&nbsp;&nbsp;f the statement contradicts the information</i></td></tr>
                        <tr><td style={{padding:'2%', 'white-space': 'nowrap'}}><b style={{'font-family': 'Space Mono, monospace'}}>NOT GIVEN</b></td><td><i style={{'font-family': 'Space Mono, monospace'}}>&nbsp;&nbsp;&nbsp;&nbsp;if there is no information on this</i></td></tr>
                    </tbody>
                </table>
                <div>
                    <ol style={{marginLeft:'2%'}} start="9">
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>TRUE</h4></td>
                                    <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>FALSE</h4></td>
                                    <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>NOT GIVEN</h4></td>
                                </tr>
                                <tr>
                                    <td><li><p><i>Pheidole dentata</i> ants are the only known animals which remain active for almost their whole lives.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="9" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="9" id="9" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="9" required/></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>Ysabel Giraldo was the first person to study <i>Pheidole dentata</i> ants using precise data about the insects' ages.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="10" id="10" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="10" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="10" required/></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>The ants in Giraldo's experiments behave as she had predicted that they would.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="11" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="11" id='11' required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="11" required/></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>The recent studies of bees used different methods of measuring age-related decline.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="12" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="12" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="12" id='12' required/></td>
                                </tr>
                                <tr>
                                <td><li><p style={{'white-space': 'nowrap'}}><i>Pheidole dentata</i> ants kept in laboratory conditions tend to live longer lives.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="13" id="13" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="13" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="13" required/></td>
                                </tr>
                            </tbody>
                        </table> 
                    </ol>
                </div>
            </div> 

            
            <div style={{border:'solid black', padding:'2%'}}>
                <h2> READING PASSAGE 2</h2>
                <h4><i>You should spend about 20 minutes on <b>Questions 14-25</b>, which are based on Reading Passage 2 below.</i></h4>
                <h2>Why zoos are good</h2>
                <h4><i>Scientist David Hone makes the case for zoos</i></h4>
                <ol type="A">
                    <li><p>In my view, it is perfectly possible for many species of animals living in zoos or wildlife parks to have a quality of life as high as,
                         or higher than, in the wild. Animals in good zoos get a varied and high-quality diet with all the supplements required,
                          and any illnesses they might have will be treated. Their movement might be somewhat restricted, but they have a safe environment in which to live,
                           and they are spared bullying and social ostracism by others of their kind. They do not suffer from the threat or stress of predators, or the irritation
                            and pain of parasites or injuries. The average captive animal will have a greater life expectancy compared with its wild counterpart, and will not die 
                            of drought, of starvation or in the jaws of a predator. A lot of vey nasty things happen to truly ‘wild’ animals that simply don’t happen in good zoos,
                             and to view a life that is ‘free’ as one that is automatically ‘good’ is, I think, an error. Furthermore, zoos serve several key purposes.</p>
                    </li>
                    <li><p>Firstly, zoos aid conservation. Colossal numbers of species are becoming extinct across the world, and many more are increasingly threatened
                         and therefore risk extinction. Moreover, some of these collapses have been sudden, dramatic and unexpected, or were simply discovered very late
                          in the day; A species protected in captivity can be bred up to provide a reservoir population against a population crash or extinction in the wild.
                           A good number of species only exist in captivity, with many of these living in zoos. Still more only exist in the wild because they have been 
                           reintroduced from zoos, or have wild population that have been boosted by captive bred animals. Without these efforts there would be fewer species
                            alive today. Although reintroduction successes are few and far between, the numbers are increasing, and the very fact that species have been saved
                             or reintroduced as a result of captive breeding proves the value of such initiatives.</p>
                    </li>
                    <li><p>Zoos also provide education. Many children and adults, especially those in cities, will never see a wild animal beyond a fox or pigeon.
                         While it is true that television documentaries are becoming ever more detailed and impressive, and many natural history specimens are on display
                          in museums, there really is nothing to compare with seeing a living creature in the flesh, hearing it, smelling it, watching what it does and having
                           the time to absorb details. That alone will bring a greater understanding and perspective to many, and hopefully give them a greater appreciation for
                            wildlife, conservation efforts and how they can contribute.</p>
                    </li>
                    <li><p>In addition to this, there is also the education that can take place in zoos through signs, talks and presentations which directly communicate
                         information to visitors about the animals they are seeing and their place in the world. This was an area where zoos used to be lacking, but they 
                         are now increasingly sophisticated in their communication and outreach work. Many zoos also work directly to educate conservation workers in other
                          countries, or send their animal keepers abroad to contribute their knowledge and skills to those working in zoos and reserves, thereby helping to
                           improve conditions and reintroductions all over the world.</p>
                    </li>
                    <li><p>Zoos also play a key role in research. If we are to save wild species and restore and repair ecosystems we need to know about how key species
                         live, ac and react. Being able to undertake research on animals in zoos where there is less risk and fewer variables means real changes can be
                          affected on wild populations. Finding out about, for example, the oestrus cycle of an animal or its breeding rate helps us manage wild populations.
                           Procedures such as capturing and moving at-risk or dangerous individuals are bolstered by knowledge gained in zoos about doses for anaesthetics,
                            and by experience in handling and transporting animals. This can make a real difference to conservation efforts and to the reduction of human-animal
                             conflicts, and can provide a knowledge base for helping with the increasing threats of habitat destruction and other problems.</p>
                    </li>
                    <li><p>In conclusion, considering the many ongoing global threats to the environment, it is hard for me to see zoos as anything other than essential
                         to the long-term survival of numerous species. They are vital not just in terms of protecting animals, but as a means of learning about them 
                         to aid those still in the wild, as well as education and informing the general population about these animals and their world so that they can
                          assist or at least accept the need to be more environmentally conscious. Without them, the world would be, and would increasingly become, a
                           much poorer place.</p>
                    </li>
                </ol>
            </div>
            <div name="Reading-2">
                
                <h4>Questions 14-17.</h4>
                <h4>Reading Passage 2 has six paragraphs, <b>A-F</b>.</h4>
                <h4>Which paragraph contains the following information?</h4>
                <p><i>Write the correct letter, <b>A-F</b>, in boxes 14-17 on your answer sheet.</i></p>
                <ol start="14">
                    <table>
                        <tbody>
                            <tr><td></td> <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>A</h4></td> <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>B</h4></td>
                            <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>C</h4></td><td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>D</h4></td>
                            <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>E</h4></td><td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>F</h4></td></tr>
                            <tr>
                                <td><li><p style={{'white-space': 'nowrap'}}>a reference to how quickly animal species can die out</p></li></td>
                                <td className='tdradio'><input className='radio' value="A" type="radio" name="14" required/></td>
                                <td className='tdradio'><input className='radio' value="B" type="radio" name="14" id="14" required/></td>
                                <td className='tdradio'><input className='radio' value="C" type="radio" name="14" required/></td>
                                <td className='tdradio'><input className='radio' value="D" type="radio" name="14" required/></td>
                                <td className='tdradio'><input className='radio' value="E" type="radio" name="14" required/></td>
                                <td className='tdradio'><input className='radio' value="F" type="radio" name="14" required/></td>
                            </tr>
                            <tr>
                                <td><li><p style={{'white-space': 'nowrap'}}>reasons why it is preferable to study animals in captivity rather than in the wild</p></li></td>
                                <td className='tdradio'><input className='radio' value="A" type="radio" name="15" required/></td>
                                <td className='tdradio'><input className='radio' value="B" type="radio" name="15" required/></td>
                                <td className='tdradio'><input className='radio' value="C" type="radio" name="15" required/></td>
                                <td className='tdradio'><input className='radio' value="D" type="radio" name="15" required/></td>
                                <td className='tdradio'><input className='radio' value="E" type="radio" name="15" id="15" required/></td>
                                <td className='tdradio'><input className='radio' value="F" type="radio" name="15" required/></td>
                            </tr>
                            <tr>
                                <td><li><p style={{'white-space': 'nowrap'}}>mention of two ways of learning about animals other than visiting them in zoos</p></li></td>
                                <td className='tdradio'><input className='radio' value="A" type="radio" name="16" required/></td>
                                <td className='tdradio'><input className='radio' value="B" type="radio" name="16" required/></td>
                                <td className='tdradio'><input className='radio' value="F" type="radio" name="16" id="16" required/></td>
                                <td className='tdradio'><input className='radio' value="C" type="radio" name="16" required/></td>
                                <td className='tdradio'><input className='radio' value="D" type="radio" name="16" required/></td>
                                <td className='tdradio'><input className='radio' value="E" type="radio" name="16" required/></td>
                            </tr>
                            <tr>
                                <td><li><p style={{'white-space': 'nowrap'}}>reasons why animals in zoos may be healthier than those in the wild</p></li></td>
                                <td className='tdradio'><input className='radio' value="A" type="radio" name="17" id="17"/></td>
                                <td className='tdradio'><input className='radio' value="B" type="radio" name="17" required/></td>
                                <td className='tdradio'><input className='radio' value="C" type="radio" name="17" required/></td>
                                <td className='tdradio'><input className='radio' value="D" type="radio" name="17" required/></td>
                                <td className='tdradio'><input className='radio' value="E" type="radio" name="17" required/></td>
                                <td className='tdradio'><input className='radio' value="F" type="radio" name="17" required/></td>
                            </tr>
                        </tbody>
                    </table>
                </ol>
                <h4>Questions 18-22</h4>
                <h4>Do the following statements agree with the information given in Reading Passage 2?</h4>
                <h4><i>For the statements 18-22 below, mark</i> </h4>
                <table>
                    <tbody>
                        <tr><td style={{padding:'2%', 'white-space': 'nowrap'}}><b style={{'font-family': 'Space Mono, monospace'}}>TRUE</b></td><td><i style={{'font-family': 'Space Mono, monospace'}}>&nbsp;&nbsp;&nbsp;&nbsp;if the statement agrees with the information</i></td></tr>
                        <tr><td style={{padding:'2%', 'white-space': 'nowrap'}}><b style={{'font-family': 'Space Mono, monospace'}}>FALSE</b></td><td><i style={{'font-family': 'Space Mono, monospace'}}>&nbsp;&nbsp;&nbsp;&nbsp;if the statement contradicts the information</i></td></tr>
                        <tr><td style={{padding:'2%', 'white-space': 'nowrap'}}><b style={{'font-family': 'Space Mono, monospace'}}>NOT GIVEN</b></td><td><i style={{'font-family': 'Space Mono, monospace'}}>&nbsp;&nbsp;&nbsp;&nbsp;if there is no information on this</i></td></tr>
                    </tbody>
                </table>
                <div>
                    <ol start="18">
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>TRUE</h4></td>
                                    <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>FALSE</h4></td>
                                    <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>NOT GIVEN</h4></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>An animal is likely to live longer in a zoo than in the wild.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="18" id="18" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="18" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="18" required/></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>There are some species in zoos which can no longer be found in the wild.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="19" id="19" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="19" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="19" required/></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>Improvements in the quality of TV wildlife documentaries have resulted in increased numbers of zoo visitors.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="20" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="20" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="20" id='20' required/></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>Zoos have always excelled at transmitting information about animals to the public.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="21" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="21" id='21' required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="21" required/></td>
                                </tr>
                                <tr>
                                <td><li><p style={{'white-space': 'nowrap'}}>Studying animals in zoos is less stressful for the animals than studying them in the wild.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="22" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="22" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="22" id="22" required/></td>
                                </tr>
                            </tbody> 
                        </table> 
                    </ol>
                </div>

                <div name="Questions23-24">

                    <h2>Questions 23 and 24</h2>
                    <h4>Choose <b>TWO</b> letters, <b>A-E</b>.</h4>
                    <h4>Which <b>TWO</b> of the following are stated about zoo staff in the text?</h4>
                    <ol type="A">
                        <li> Some take part in television documentaries about animals.</li>
                        <li> Some travel to overseas locations to join teams in zoos.</li>
                        <li> Some get experience with species in the wild before taking up zoo jobs.</li>
                        <li> Some teach people who are involved with conservation projects.</li>
                        <li> Some specialise in caring for species which are under threat.</li>
                    </ol>

                    <label>A<input type="checkbox" onChange={doubleCheckBox1} id="1-A"/></label>
                    <label>B<input type="checkbox" id="1-B" {...register("23",{onChange:doubleCheckBox1})}/></label>
                    <label>C<input type="checkbox" onChange={doubleCheckBox1} id="1-C"/></label>
                    <label>D<input type="checkbox" id="1-D" {...register("24",{onChange:doubleCheckBox1})}/></label>
                    <label>E<input type="checkbox" onChange={doubleCheckBox1} id="1-E"/></label>
                </div>

                <div name="Questions25-26">

                    <h2>Questions 25 and 26</h2>
                    <h4>Choose <b>TWO</b> letters, <b>A-E</b>.</h4>
                    <h4>Which <b>TWO</b> of these beliefs about zoos does the writer mention in the text?</h4>
                    <ol type="A">
                        <li> They can help children overcome their fears of wild animals.</li>
                        <li> They can increase public awareness of environmental issues.</li>
                        <li> They can provide employment for a range of professional people.</li>
                        <li> They can generate income to support wildlife conservation projects.</li>
                        <li> They can raise animals which can later be released into the wild.</li>
                    </ol>

                    <label>A<input type="checkbox" onChange={doubleCheckBox2} id="2-A"/></label>
                    <label>B<input type="checkbox" id="2-B" {...register("25",{onChange:doubleCheckBox2})}/></label>
                    <label>C<input type="checkbox" onChange={doubleCheckBox2} id="2-C"/></label>
                    <label>D<input type="checkbox" onChange={doubleCheckBox2} id="2-D"/></label>
                    <label>E<input type="checkbox" id="2-E" {...register("26",{onChange:doubleCheckBox2})}/></label>
                </div>
            </div> 

            /*___________
            <div style={{border:'solid black'}}>
                <h2> READING PASSAGE 3</h2>
                <h4><i>You should spend about 20 minutes on <b>Questions 27-40</b>, which are based on Reading Passage 3 below.</i></h4>
                <p>Chelsea Rochman, an ecologist at the University of California, Davis, has been trying to answer a dismal question: 
                    Is everything terrible, or are things just very, very bad?</p>
                <p>Rochman is a member of the National center for Ecological Analysis and Synthesis’s marine-debris working group, 
                    a collection of scientists who study, among other things, the growing problem of marine debris, also known as ocean trash.
                     Plenty of studies have sounded alarm bells about the state of marine debris; in a recent paper published in the journal Ecology,
                      Rochman and her colleagues set out to determine how many of those perceived risks are real.</p>
                <p>Often, Rochman says, scientists will end a paper by speculating about the broader impacts of what they’ve found. For example,
                     a study could show that certain seabirds eat plastic bags, and go on to warn that whole bird populations are at risk of dying out.
                      ‘But the truth was that nobody had yet tested those perceived threats,’ Rochman says. ‘There wasn’t a lot of information.’</p>
                <p>Rochman and her colleagues examined more than a hundred papers on the impacts of marine debris that were published through 2013. 
                    Within each paper, they asked what threats scientists had studied – 366 perceived threats in all – and what they’d actually found.</p>
                <p>In 83 percent of cases, the perceived dangers of ocean trash were proven true. In the remaining cases, the working group found the
                     studies had weaknesses in design and content which affected the validity of their conclusions – they lacked a control group, for
                      example, or used faulty statistics.</p>
                <p>Strikingly, Rochman says, only one well-designed study failed to find the effect it was looking for, an investigation of mussels ingesting
                     microscopic plastic bits. The plastic moved from the mussels’ stomachs to their bloodstreams, scientists found, and stayed there for weeks
                      – but didn’t seem to stress out the shellfish.</p>
                <p>While mussels may be fine eating trash, though, the analysis also gave a clearer picture of the many ways that ocean debris is bothersome.</p>
                <p>Within the studies they looked at, most of the proven threats came from plastic debris, rather than other materials like metal or wood.
                     Most of the dangers also involved large pieces of debris – animals getting entangled in trash, for example, or eating it and severely injuring themselves.</p>
                <p>But a lot of ocean debris is ‘microplastic’, or pieces smaller than five millimeters. These may be ingredients used in cosmetics and toiletries,
                     fibers shed by synthetic clothing in the wash, or eroded remnants of larger debris. Rochman’s group found little research on the effects of these tiny bits.
                      ‘There are a lot of open questions still for microplastic,’ Rochman says, though she notes that more papers on the subject have been published since 2013,
                       the cutoff point for the group’s analysis.</p>
                <p>There are also, she adds, a lot of open questions about the ways that ocean debris can lead to sea-creature death. Many studies have looked at how plastic
                     affects an individual animal, or that animal’s tissues or cells, rather than whole populations. And in the lab, scientists often use higher concentrations 
                     of plastic than what’s really in the ocean. None of that tells us how many birds or fish or sea turtles could die from plastic pollutions – or how deaths
                      in one species could affect that animal’s predators, or the rest of the ecosystem.</p>
                <p>‘We need to be asking more ecologically relevant questions,’ Rochman says. Usually, scientists don’t know exactly how disasters such as a tanker
                     accidentally spilling its whole cargo of oil and polluting huge areas of the ocean will affect the environment until after they’ve happened.
                      ‘We don’t ask the right questions early enough,’ she says. But if ecologists can understand how the slow-moving effect of ocean trash is
                       damaging ecosystems, they might be able to prevent things from getting worse.</p>
                <p>Asking the right questions can help policy makers, and the public, figure out where to focus their attention. The problems that look or sound most dramatic
                     may not be the best places to start. For example, the name of the ‘Great Pacific Garbage Patch’ – a collection of marine debris in the northern Pacific Ocean
                      – might conjure up a vast, floating trash island. In reality though, much of the debris is tiny or below the surface; a person could sail through the area
                       without seeing any trash at all. A Dutch group called ‘The Ocean Cleanup’ is currently working on plans to put mechanical devises in the Pacific Garbage
                        Patch and similar areas to suck up plastic. But a recent paper used simulations to show that strategically positioning the cleanup devices closer to
                         shore would more effectively reduce pollution over the long term.</p>
                <p>‘I think clearing up some of these misperceptions is really important,’ Rochman says. Among scientists as well as in the media, she says,
                     ‘A lot of the images about strandings and entanglement and all of that cause the perception that plastic debris is killing everything in
                      the ocean.’ Interrogating the existing scientific literature can help ecologists figure out which problems really need addressing, and
                       which ones they’d be better off – like the mussels – absorbing and ignoring.</p>
            </div>

            <div name="Reading-3">
                <h4>Questions 27-33</h4>
                <h4>Do the following statements agree with the information given in Reading Passage 3?</h4>
                <h4><i>For the statements 27-33 below, mark</i> </h4>
                <table>
                    <tbody>
                        <tr><td style={{padding:'2%', 'white-space': 'nowrap'}}><b style={{'font-family': 'Space Mono, monospace'}}>TRUE</b></td><td><i style={{'font-family': 'Space Mono, monospace'}}>&nbsp;&nbsp;&nbsp;&nbsp;if the statement agrees with the information</i></td></tr>
                        <tr><td style={{padding:'2%', 'white-space': 'nowrap'}}><b style={{'font-family': 'Space Mono, monospace'}}>FALSE</b></td><td><i style={{'font-family': 'Space Mono, monospace'}}>&nbsp;&nbsp;&nbsp;&nbsp;if the statement contradicts the information</i></td></tr>
                        <tr><td style={{padding:'2%', 'white-space': 'nowrap'}}><b style={{'font-family': 'Space Mono, monospace'}}>NOT GIVEN</b></td><td><i style={{'font-family': 'Space Mono, monospace'}}>&nbsp;&nbsp;&nbsp;&nbsp;if there is no information on this</i></td></tr>
                    </tbody>
                </table>
                <div>
                    <ol start="27">
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>TRUE</h4></td>
                                    <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>FALSE</h4></td>
                                    <td className='tdradio' style={{'font-family': 'Space Mono, monospace', 'font-weight':'bold'}}><h4>NOT GIVEN</h4></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>Rochman and her colleagues were the first people to research the problem of marine debris.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="27" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="27" id="27" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="27" required/></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>The creatures most in danger from ocean trash are certain seabirds.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="28" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="28" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="28" id="28" required/></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>The studies Rochman has reviewed have already proven that populations of some birds will soon become extinct.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="29" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="29" id='29' required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="29" required/></td>
                                </tr>
                                <tr>
                                    <td><li><p style={{'white-space': 'nowrap'}}>Rochman analysed papers on the different kinds of danger caused by ocean trash.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="30" id='30' required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="30" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="30" required/></td>
                                </tr>
                                <tr>
                                <td><li><p style={{'white-space': 'nowrap'}}>Most of the research analysed by Rochman and her colleagues was badly designed.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="31" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="31" id="31" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="31" required/></td>
                                </tr>
                                <tr>
                                <td><li><p style={{'white-space': 'nowrap'}}>One study examined by Rochman was expecting to find that mussels were harmed by eating plastic.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="32" id="32" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="32" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="32" required/></td>
                                </tr>
                                <tr>
                                <td><li><p style={{'white-space': 'nowrap'}}>Some mussels choose to eat plastic in preference to their natural diet.</p></li></td>
                                    <td className='tdradio'><input className='radio' value="TRUE" type="radio" name="33" required/></td>
                                    <td className='tdradio'><input className='radio' value="FALSE" type="radio" name="33" required/></td>
                                    <td className='tdradio'><input className='radio' value="NOT GIVEN" type="radio" name="33" id="33" required/></td>
                                </tr>
                            </tbody>
                            
                        </table> 
                    </ol>
                </div>

                <div name="Questions34-39">
                    <h2> Questions 34 - 39</h2>
                    <h4>Complete the notes below.</h4>
                    <h4>Write <b>ONE WORD ONLY</b> from the passage for each answer.</h4>
                    
                    <div style={{border:"solid black", width:'fit-content', margin:'auto'}}>
                        <h2>Findings related to marine debris</h2>
                        <ul>
                            <h4 style={{'margin-left':0}}>Studies of marine debris found the biggest threats were</h4>
                            <li className='formli'>plastic (not metal or wood)</li>
                            <li className='formli'>bits of debris that were <b>34</b> <input {...register("34")} required/> (harmful to animals)</li>
                            <h4>There was little research into <b style={{fontSize:'x-large', fontFamily: "'Space Mono', monospace"}}>35</b> <input {...register("35")} required/> e.g. from synthetic fibres.</h4>
                            <h4>Drawbacks of the studies examined</h4>
                            <li className='formli'>most of them focused on individual animals, not entire <b>36</b> <input {...register("36")} required/></li>
                            <li className='formli'>the <b>37</b> <input {...register("37")} required/> of plastic used in the lab did not always reflected those in the ocean</li>
                            <li className='formli'>there was insufficient information on</li>
                            <ul type="none">
                                <li>- numbers of animals which could be affected</li>
                                <li>- the impact of a reduction in numbers on the <b>38</b> <input {...register("38")} required/> of that species</li>
                                <li>- the impact on the ecosystem</li>
                            </ul>
                            <h4>Rochman says more information is needed on the possible impact of future <br/> <b style={{fontSize:'x-large', fontFamily: "'Space Mono', monospace"}}>39</b> <input {...register("39")} required/> (e.g. involving oil).</h4>
                        </ul>
                    </div>
                </div>
                <div name="Question40">
                    <p><i>Choose the correct letter, <b>A</b>, <b>B</b>, <b>C</b> or <b>D</b></i>.</p>
                    <p><b style={{fontSize:'x-large', fontFamily: "'Space Mono', monospace"}}>40</b> What would be the best tittle for this passage?</p>
                    <ol type='A'>
                        <table>
                            <tbody>
                                <tr>
                                    <td><li>Assessing the threat of marine debris </li></td>
                                    <td className='tdradio'><input type="radio" value='A' className='radio' name="40" id="40" required/></td>
                                </tr>
                                <tr>
                                    <td><li>Marine debris: who is to blame </li></td>
                                    <td className='tdradio'><input type="radio" value='B' className='radio' name="40" required/></td>
                                </tr>
                                <tr>
                                    <td><li>A new solution to the problem of marine debris </li></td>
                                    <td className='tdradio'><input type="radio" value='C' className='radio' name="40" required/></td>
                                </tr>
                                <tr>
                                    <td><li>Marine debris: the need for international action </li></td>
                                    <td className='tdradio'><input type="radio" value='D' className='radio' name="40" required/></td>
                                </tr>
                            </tbody>
                        </table>
                    </ol>

                </div>
            </div>
            {errors.type === "required" && alert('First name is required')}
            <input className='submit' type="submit" value={"Submit Answers"}/>
        </form>
    )
}

export default ReadingSection;