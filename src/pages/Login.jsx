import React, { useContext, useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { validateEmail } from '../utils/helper'
import axiosInstance from '../axiosInstance'
import { UserContext } from '../context/userContext'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError("Please enter the password")
      return;
    }
    setError("")

    //api
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      })

      const user = response.data.data._id;
      const token = response.data.token;

      if (response.data.success) {
        alert(response.data.message)
        localStorage.setItem("token", token)
        updateUser(user)
        navigate('/dashboard')
      }

      if (response.data.error) {
        alert(response.data.message)
        setError(response.data.message)
      }



    } catch (error) {
        console.log(error);
        
    }
  }


  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h1 className='text-xl font-bold text-black'>Welcome back</h1>
        <p className='text-[15px] text-slate-700 mt-[5px] mb-5'>Please Enter your details to log in</p>

        <form action="" onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="Blite@gmail.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>LOGIN</button>
          <p className='text-[13px] text-slate-800 mt-3'>Don't have an account ? {""}
            <Link className='font-medium text-primary underline' to="/signup">Sign Up</Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default Login