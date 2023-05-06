import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext';
import Profile from '../../images/Profile.jpg'


const ProfilePic = () => {
    const [image, setImage] = useState("")
    const [displayBasic,setDisplayBasic] = useState(false)
    return (
        <div className='profile_img text-center p-4'>
            <div className='flex flex-column justify-content-center align-items-center'>
                <img
                   style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid black',
                   }}
                   src={Profile}
                   alt=''
                />
                <labe htmlFor="" className='mt-3 font-semibold text-5xl'>lol</labe>
                <InputText
                    type='file'
                    accept='/image/*'
                    onChange={(event) => {
                        const file = event.target.files[0]
                        if (file && file.type.substring(0, 5) === "image") {
                            setimage(file)
                        } else {
                            setImage(null)
                        }
                    }}
                />
            </div>
        </div>
    )
}


export default ProfilePic