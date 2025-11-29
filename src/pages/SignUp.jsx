import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import UploadImages from '../utils/uploadImage'
import Input from '../components/Input'
import { validateEmail } from '../utils/helper'
import ProfilePicSelector from '../components/ProfilePicSelector'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImgUrl = "";
    if(!fullName){
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return;
    }

    if(!password){
      setError("Please enter the password")
      return;
    }
    setError("");
    //api

    try {
      //upload image if present
      if (profilePic){
        const imgUploadRes = await UploadImages(profilePic);
        profileImgUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post("/register",{
        fullName,
        email,
        password,
        profileImgUrl
      })

      if (response.data.success){
        console.log(response.data.data);
        
        alert(response.data.message)
        navigate("/login")
      }

      if(response.data.error){
        alert(response.data.message)
        setError(response.data.message)
      }
    } catch (error) {
      console.log(error);
      
    }

  }


  return (
    <AuthLayout>
      <div className='lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-bold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Sign Up by entering your details below</p>

        <form action="" onSubmit={handleSignUp}>
          <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullname(target.value)}
              label="Full name"
              placeholder="Enter your name"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="Blite@gmail.com"
              type="text"
            />
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>



          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>SIGN UP</button>
          <p className='text-[13px] text-slate-800 mt-3'>Already have an account ? {""}
            <Link className='font-medium text-primary underline' to="/signup">Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>

  )
}

export default SignUp