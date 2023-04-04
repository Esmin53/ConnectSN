import React, { useEffect, useState } from 'react'
import "./login.css"
import {useFormik} from "formik"
import { loginSchema } from './loginschema'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login } from "../../redux/rootSlice"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import Loading from '../../components/loading/Loading'

const Login = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user)
    const [isFetching, setIsFetching] = useState(false)
    const [response, setResponse] = useState(null)

    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        try {
            setIsFetching(true)
            const res = await axios.post("http://localhost:3001/api/v1/auth/login", {
                email: values.email,
                password: values.password
            })
            await dispatch(login(res.data))
            setIsFetching(false)
            setResponse(`Welcome back, ${res.data.firstName}`)
            navigate("/home");
        } catch (error) {
            setResponse(error.response.data.msg)
            setIsFetching(false)
        }
    }

    const {values,handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            "email": "",
            "password": ""
        },
        validationSchema: loginSchema,
        onSubmit,
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            setResponse(null)
        }, 3000);

        return () => {
            clearTimeout(timeout)
        }
    }, [response])
    
    if(currentUser) {
        return <Navigate to="/home" />
    }
   
  return (
    <div className='flex login_page_container'>
        {isFetching && <Loading />}
        <div className='login_form_container'>
                <img src='https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1676586373~exp=1676586973~hmac=dce813afaf4dfd5ac85addbcf2f63a9b04e6b64d1465edc1c5d7b3d9c8116dc4' alt="login image" className='form_image' />
            <form className='login_form' onSubmit={handleSubmit}>
                <div className='login_form_header'>
                    <h2>Connect</h2>
                    <h3 className='text'>
                    <span style={{color: "#145DA0"}}>Sign in</span> to your account</h3>
                {response && <p className='auth_error'>{response}</p>}
                </div>
               
                <div className='center fr'>

                    <input type="email" placeholder='Email'
                    value={values.email} onChange={handleChange} id="email" onBlur={handleBlur}
                    className="form_input" />
                
                
                <input type="password" placeholder='Password' id="password" onBlur={handleBlur}
                value={values.password} onChange={handleChange}
                className="form_input" />
                </div>

                <div className='fr'>
                    <button className='form_button' type='submit'>Sign in</button>
                    <Link to="/register" className='link'>Don't have an account? Sign up!</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login