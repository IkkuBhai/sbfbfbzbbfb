import React, { useState, useEffect } from 'react'
import '../../styles/userProfile.css'
import Select from 'react-select'
import TextField from '@mui/material/TextField'
import { Box, Button, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { FaBriefcase, FaUserGraduate } from "react-icons/fa"
import { BsFillShareFill } from "react-icons/bs"
import { IoArrowBackCircle } from "react-icons/io5"
import { AiFillCloseCircle } from "react-icons/ai"
import { ImFilesEmpty } from "react-icons/im"
import { FiEdit2 } from "react-icons/fi"
import Multiselect from "multiselect-react-dropdown"
import { Routes, Link, Route, useNavigate } from 'react-router-dom'
import { educationLevels } from '../../constraints/arrays';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'


const Education = (props) => {

    const formField = {
        textAlign: 'center',
    }

    const cross = {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '25px',
        color: '#5c99ea',
        cursor: 'pointer',
        float: 'right',
        marginBottom: '14px',
        marginRight: '-7px',
    };






    //API things Start 

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

    const [eduData, setEduData] = useState([])

    function getEducationData() {
        fetch("http://localhost:8000/education/64047a3d01c89a38448f8de1", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((result) => result.json())
            .then((resp) => {
                console.log("resp", resp)
                setEduData(resp)
                console.log("eduData", eduData)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const Navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userDetails"))
    //  console.log(user)
    if (!user) Navigate("/login")

    const [userInfo, setUserInfo] = useState([])


    useEffect(() => {
        getEducationData()
    }, [])


    //API things End





    const [showEducationEdit, setShowModalEdit] = useState(false)

    const MyModalEducationSecond = () => {

        return (
            <div className="edu-Modal-wrapper">
                <div className="edu-Modal-container">

                    <div className="edu-modal-form">
                        <button style={cross} onClick={() => setShowModalEdit(false)}><AiFillCloseCircle /></button>
                        <form style={formField}>

                            <TextField className='textField' fullWidth label="College Name" id="fullWidth" name="collegeName" value={eduData.data?.collegeName} />

                            <TextField className='textField' fullWidth label="Authority" id="fullWidth" name='authority' value={eduData.data?.authority} />

                            <TextField className='textField' fullWidth label="Discipline" id="fullWidth" name='discipline' value={eduData.data?.discipline} />

                            <TextField className='textField' fullWidth label="Year of Passout" id="fullWidth" name='yearOfpassout' value={eduData.data?.yearOfpassout} />

                        </form>

                    </div>


                </div>
            </div>
        )
    }

    const [showModalEducation, setShowModalEducation] = useState(false)
    return (
        <>
            <div className="edu-Modal-wrapper">
                <div className="edu-Modal-container">
                    <button className='back-arrow' onClick={() => props.edu(false)}><IoArrowBackCircle /></button>


                    <h3 style={{ textAlign: 'center', marginBottom: '15px', fontFamily: "'Ubuntu', sans-serif", }}>Update Education</h3>

                    

                    <div className='education-data'>

                        {userInfo.educationData?.map((education) => (
                            <Grid item xs={8} sm={8} key={education._id} >

                                <div style={{ margin: '10%', marginTop: '6%', marginBottom: '1px', }}>



                                    <h5 style={{ fontFamily: "'Sans-Serif', Arial", fontSize: '19px', }}>{education.educationLevel}</h5> <p style={{ fontSize: '10px', }}>from</p> <p>{education.collegeName}</p>
                                    <button className="education-data-icon" onClick={() => { setShowModalEdit(true); getEducationData() }}><FiEdit2 /></button>
                                    {showEducationEdit && <MyModalEducationSecond />}
                                    <br />

                                    <p><span style={{ fontWeight: 'bold', color: 'black', }}>Authority: </span>{education.authority}</p>
                                    <br />
                                    <p><span style={{ fontWeight: 'bold', color: 'black', }}>Discipline: </span>{education.discipline}</p>
                                    <br />
                                    <p><span style={{ fontWeight: 'bold', color: 'black', }}>Year of Passout: </span>{education.yearofPassout}</p>

                                    <hr style={{ fontSize: '10px', }}></hr>
                                </div>


                            </Grid>
                        ))}

                    </div>

                </div>
            </div>

        </>
    )
}

export default Education