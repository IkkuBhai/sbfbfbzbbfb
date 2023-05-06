import React,{useState,useEffect} from 'react'
import { secondarySkills } from '../../constraints/arrays'
import '../../styles/userProfile.css'
import { Routes, Link, Route, useNavigate } from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown'

const SecondarySkills = () => {

    const [secondarySkill, setSecondarySkill] = useState(false)
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <h3 style={{ textAlign: 'center', marginBottom: '15px', fontFamily: "'Ubuntu', sans-serif", }}>Add Skills</h3>
                    <Multiselect
                        isObject={false}
                        options={secondarySkills}
                    />
                    <button className="modal-btn" >save</button>
                    <button className="modal-btn" onClick={() => setSecondarySkill(false)}>cancel</button>
                </div>
            </div>
        </>
    )
}

export default SecondarySkills