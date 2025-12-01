import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Expense from './pages/Expense'
import Income from './pages/Income'
import {Toaster} from "react-hot-toast"

function App() {
  

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Root/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/signup' exact element={<SignUp/>}/>
        <Route path='/dashboard' element={<Home/>}/>
        <Route path='/expense' element={<Expense/>}/>
        <Route path='/income' element={<Income/>}/>
      </Routes>
    </>
  )
}

export default App

const Root = ()=>{
  // check if token exists
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard"/>
  ) :(
    <Navigate to="/login"/>
  );
};