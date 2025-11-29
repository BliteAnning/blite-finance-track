import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"

const Input = ({value, onChange, placeholder, label, type}) => {
    const [showPassword, setShowPaswword] = useState(false)

    const toggleShowPassword = ()=>{
        setShowPaswword(!showPassword)
    };

  return (
    <div>
        <label className="text-[18px] text-slate-800">{label}</label>

        <div className='input-box'>
            <input 
                type={type =="password"? showPassword ? "text": "password":type}
                placeholder={placeholder}
                className='w-full bg-transparent outline-none'
                value={value}
                onChange={(e)=>onChange(e)}
            />
            {
                type == "password" && (
                    <>
                        {
                            showPassword ? (
                                <FaRegEye
                                    size ={22}
                                    className="text-primary cursor-pointer"
                                    onClick = {()=>toggleShowPassword()}
                                />
                            ):(
                                <FaRegEyeSlash
                                    size ={22}
                                    className="text-primary cursor-pointer"
                                    onClick = {()=>toggleShowPassword()}
                                />
                            )
                        }
                    </>
                )

            }
        </div>
    </div>
  )
}

export default Input