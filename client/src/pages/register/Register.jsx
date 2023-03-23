import React, { useState } from 'react'
import "./register.css"
import { useFormik } from 'formik'
import { registerSchema } from './registerschema'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import Loading from '../../components/loading/Loading'

const Register = () => {
    const [isFetching, setIsFetching] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (values, actions) => {
        try {
            setIsFetching(true)
            const res = await axios.post("http://localhost:3001/api/v1/auth/register", {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            })
            setIsFetching(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const {values, errors,handleChange, handleBlur, touched, handleSubmit} = useFormik({
        initialValues: {
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": "",
            "confirmPassword": "",
            "location": "",
            "occupation": ""
        },
        validationSchema: registerSchema,
        onSubmit
    })


  return (
    <div className='flex register_page_container'>
        {isFetching && <Loading />}
        <div className='register_page_form_container'>
        <form className='register_form' onSubmit={handleSubmit}>
            <div className='register_form_header'>
                <h2>Connect</h2>
                <h3>Create an account!</h3>
            </div>
            <div className='register_form_wrapper'>
                <div className='fr'>
                    <input type="text" placeholder='First name' value={values.firstName} onBlur={handleBlur} id="firstName"
                    className={touched.firstName && errors.firstName ? "error_input register_form_input" : "register_form_input"}
                    onChange={handleChange} />
                    
                </div>    
                <div className='fr'>
                    <input type="text" placeholder='Last name' value={values.lastName} onBlur={handleBlur} id="lastName"
                    className={touched.lastName && errors.lastName ? "error_input register_form_input" : "register_form_input"}
                    onChange={handleChange} />
                    <div className='fs'>{errors.lastName && <p className='error_input_message'>{errors.lastName}</p>}</div>
                </div>
            </div>
            <div className='fr'>
                <input type="email" placeholder='Email' value={values.email} onBlur={handleBlur} id="email"
                 className={touched.email && errors.email ? "error_input form_input" : "form_input"} onChange={handleChange}
                 />
                <div className='fs'>{errors.email && <p className='error_input_message'>{errors.email}</p>}</div>
            </div>
            <div className='fr'>
                <input type="password" placeholder="Password" id="password" onChange={handleChange} onBlur={handleBlur} 
                className={touched.password && errors.password ? "error_input form_input" : "form_input"}/>
                <div className='fs'>{errors.password && <p className='error_input_message'>{errors.password}</p>}</div>
            </div>
            <div className='fr'>
                <input type="password" placeholder='Confirm password' className='form_input' value={values.confirmPassword}
                id="confirmPassword" onBlur={handleBlur} onChange={handleChange}/>
                <div className='fs'>{errors.confirmPassword && <p className='error_input_message'>{errors.confirmPassword}</p>}</div>
            </div>
            
            <button className='form_button'>Sign up</button>
            <Link className='link' to="/">Already an user? Sign in!</Link>
        </form>
        <img className='form_image' src='https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg?w=740&t=st=1676680804~exp=1676681404~hmac=4d4739e0400f91ed2a4ca54091ff4e712e05ee9c187c2875e1fcaa53c5bf531f' />
        </div>
    </div>
  )
}

export default Register