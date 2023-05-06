import React, { useState, useEffect } from 'react'
import { primarySkills } from '../../constraints/arrays'
import '../../styles/userProfile.css'
import { Routes, Link, Route, useNavigate } from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown'


const PrimarySkills = () => {


    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <h3 style={{ textAlign: 'center', marginBottom: '15px', fontFamily: "'Ubuntu', sans-serif", }}>Add Skills</h3>
                    
                    <Multiselect
                        isObject={false}
                        options={primarySkills}
                    />

                    <button>save</button>
                    <button>cancel</button>
                </div>
            </div>
        </>
    )
}

export default PrimarySkills