import React, { useRef, useState } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

const ProfilePicSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleImageChange = (event)=>{
        const file = event.target.files[0];
        if (file){
            const preview = URL.createObjectURL(file);
            console.log(preview);
            setImage(file)
            setPreviewUrl(preview);
        }
    }

    const onChoosFile = ()=>{
        inputRef.current.click();
    }


    const handleRemoveImage =()=>{
        setImage(null)
        setPreviewUrl(null)
    }

  return (
    <div className='flex justify-center mb-5'>
        <input 
        type="file" 
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
        />

        {
            !image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
                    <LuUser className='text-4xl text-primary'/>
                    <button 
                    type='button' 
                    className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-2' 
                    onClick={onChoosFile}>
                        <LuUpload/>
                    </button>
                </div>
            ) : (

                <div className='relative'>
                    <img src={previewUrl} alt="profile pic" className='w-20 h-20 rounded-full object-cover' />

                    <button type='button' onClick={handleRemoveImage} className='w-8 h-8 flex rounded-full absolute -bottom-1 -right-1 items-center justify-center bg-red-500 text'>
                        <LuTrash/>
                    </button>
                </div>
            )
        }

    </div>
  )
}

export default ProfilePicSelector