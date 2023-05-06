import React, { useState, useEffect, Component } from 'react'
import { GiHamburgerMenu, GiSkills } from "react-icons/gi"
import { FaBriefcase, FaUserGraduate } from "react-icons/fa"
import { BsFillShareFill } from "react-icons/bs"
import { GrAdd } from "react-icons/gr"
import { IoArrowBackCircle } from "react-icons/io5"
import { AiFillCloseCircle } from "react-icons/ai"
import { ImFilesEmpty } from "react-icons/im"
import { FiEdit2 } from "react-icons/fi"
import Multiselect from "multiselect-react-dropdown"
import { primarySkills, secondarySkills, educationLevels, experience, location } from '../constraints/arrays'
import { slide as Menu } from 'react-burger-menu'
import axios from 'axios'
import { FileUpload } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import '../styles/userProfile.css'
import { Routes, Link, Route, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import TextField from '@mui/material/TextField'
import { Box, Button, Container } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import avatar from "../images/avatar.jpg"
import ProfilePic from './UserProfileComponents/ProfilePic'
import Education from './UserProfileComponents/Education'
import Experience from './UserProfileComponents/Experience'
import SecondarySkills from './UserProfileComponents/SecondarySkills'
import PrimarySkills from './UserProfileComponents/PrimarySkills'
import EducationForm from './multiForm/EducationForm'




const UserProfile = () => {

//Primary Skills Start
    const [priData, setPriData] = useState([])

    function getPrimaryData() {
        fetch(`http://localhost:8000/primarySkills/63f331a9870eb03618057960`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((result) => result.json())
            .then((resp) => {
                console.log("resp", resp)
                setPriData(resp)
                console.log("priData", priData)
            })
            .catch(error => {
                console.log(error)
            })
    }

    
    useEffect(() => {
        getPrimaryData()
    }, [])
//Primary Skills end




//Secondary Skills Start
const [secData, setSecData] = useState([])

function getSecData() {
    fetch(`http://localhost:8000/secondarySkills/63f331a9870eb03618057960`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((result) => result.json())
        .then((resp) => {
            console.log("resp", resp)
            setSecData(resp)
            console.log("secData",secData)
        })
        .catch(error => {
            console.log(error)
        })
}


useEffect(() => {
    getSecData()
}, [])
//Secondary Skills End



    const Navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userDetails"))
    //  console.log(user)
    if (!user) Navigate("/login")

    const [userInfo, setUserInfo] = useState([])

 
    useEffect(() => {
        // console.log(user._id)
        fetch(`http://localhost:8000/personal/${user._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => { console.log(data); setUserInfo(data.data) })
            .catch(err => console.log(err))
        console.log(userInfo)
    }, [])


//Education Start
    //Education Pop-Up Start
    const [educationMain, setEducationMain] = useState(false)
    const EducationMain = () => {
        return <Education edu={educationMain => setEducationMain(false)}/>
    }
    //Education Pop-Up End

    //Education Form Start
    const [educationForm, setEducationForm] = useState(false)
    const EducationForm = () => {
        return <EducationForm eduForm={educationForm => setEducationForm(false)}/>
    }
    //Education Form End
//Education Start


    //Experience Pop-Up Start

    const [experienceMain, setExperienceMain] = useState(false)
    const ExperienceMain = () => {
        return <Experience exp={experienceMain => setExperienceMain(false)}/>
    }
    //Experience Pop-Up End


    //Primary skills Start 
    const [primarySkillMain, setPrimarySkillMain] = useState(false)
    const PrimarySkillsMain = () => {
        return <PrimarySkills  />
    }
    //Primary Skills End


    //Secondary Skills Start
    const [secondarySkillMain, setSecondarySkillMain] = useState(false)
    const SecondarySkillsMain = () => {
        return <SecondarySkills />
    }
    //Secondary Skills End


    return (
        <>

            <nav className='main-nav'>
                <div className='logo'>
                    <h2>HicLOUSIA</h2>
                </div>

                <div className='menu-link'>
                    <ul>
                        <li>
                            <a href='#jobs'><FaBriefcase />Jobs</a>
                        </li>

                        <li>
                            <a href='#career'><FaUserGraduate />Career Profile</a>
                        </li>

                        <li>
                            <a href='#upskilling'><GiSkills />Upskilling</a>
                        </li>

                        <li>
                            <a href='#share'><BsFillShareFill />Share</a>
                        </li>

                        <li>
                            <a href='#mydocs'><ImFilesEmpty />MyDocs</a>
                        </li>
                    </ul>

                    <div className='hamburger-menu'>
                        <a onClick={() => setShowMediaIcons(!showMediaIcons)}>
                            <Menu />
                        </a>
                    </div>
                </div>
            </nav>







            <section>

                <div className='Profile'>
                    <ProfilePic />
                </div>


        

                <div className='edu-exp'>

               
                    <div className='edu'>
                        <h3 className='headings' >Education</h3>

                        <button onClick={() => setEducationMain(true)} className='edit-btn'>
                            <FiEdit2 />
                        </button>
                        {educationMain && <EducationMain  />}

                        <button className='edit-btn' style={{marginRight: '10px',}} onClick={() => setEducationForm(true)} ><GrAdd/></button>
                        {educationForm && <EducationForm/>}
                       
                       

                        <br></br>
                        <br></br>


                        {userInfo.educationData?.map((education) => (
                            <Grid item xs={8} sm={8} key={education._id} >

                                <div style={{ margin: '10%', marginTop: '6%', }}>

                                    <h5 style={{ fontFamily: "'Sans-Serif', Arial", }}>{education.educationLevel}</h5> <p style={{ fontSize: '10px', }}>from</p> <p>{education.collegeName}</p>
                                    <hr></hr>
                                </div>


                            </Grid>
                        ))}


                    </div>

          


                    &nbsp;&nbsp;&nbsp;

               
                    <div className='exp'>
                        <h3 className='headings'>Experience</h3>
                        <button className='edit-btn' onClick={() => setExperienceMain(true)}>
                            <FiEdit2 />
                        </button>
                        <button className='edit-btn' style={{marginRight: '10px',}}><GrAdd/></button>
                        {experienceMain && <ExperienceMain />}

                        <br></br>
                        <br></br>



                        {userInfo.experienceData?.map((experience) => (
                            <Grid item xs={8} sm={8} key={experience._id} >
                                <div style={{ margin: '10%', marginTop: '6%', }}>

                                    <h5 style={{ fontFamily: "'Sans-Serif', Arial", }}>{experience.jobTitle}</h5> at <p>{experience.companyName}</p>
                                    <hr></hr>



                                </div>

                            </Grid>
                        ))}

                    </div>
               
                </div>

           



                <div className="skills">
                    <div className='primary'>
                        <h3 className='headings' >Primary Skills</h3>
                        <button onClick={() => {setPrimarySkillMain(true);getPrimaryData()}} className='edit-btn'>
                            <FiEdit2 />
                        </button>
                        {primarySkillMain && <PrimarySkillsMain />}
                    </div>



                    <div className='secondary'>
                        <h3 className='headings' >Secondary Skills</h3>

                        <button onClick={() => {setSecondarySkillMain(true);getSecData()}} className='edit-btn'>
                            <FiEdit2 />
                        </button>
                        {secondarySkillMain && <SecondarySkillsMain />}
                    </div>
                </div>


            </section>
        </>
    )
}

export default UserProfile

