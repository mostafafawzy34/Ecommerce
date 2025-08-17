import './Login.module.css';
import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';


export default function Login() {

let {token, setToken} = useContext(TokenContext);


  const [userMessage, setUserMessage] = useState(null)

  const[isLoading, setIsLoading] = useState(false)  

    let navigate = useNavigate()

     let mySchema = Yup.object({
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{3,8}$/, 'Invalid password'),
      });

        let formik = useFormik({
          initialValues: {
            email: '',
            password: ''
          },

        validationSchema: mySchema,
    onSubmit: (values) => {
      console.log(values);
      loginForm(values)
    }
  });

   async function loginForm(values) {
    setIsLoading(true)
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((data) => {
      console.log(data.data.token);

      localStorage.setItem("userToken", data.data.token)

      setToken(data.data.token)


      console.log(data.data.message);
      setUserMessage("Login successfully.");
      navigate("/")
      setIsLoading(false)
    }).catch((error) => {
      console.log("Error:", error.response?.data);
      setUserMessage(error.response?.data?.message || "Login failed.");
            setIsLoading(false)

    });
  }


  return (
     <>
      <div className="w-[70%] mx-auto my-4 relative">

        {/* Floating Message */}
{userMessage ? (
  <div
    role="alert"
    className={`absolute left-1/2 -translate-x-1/2 top-4 px-4 py-2 rounded-md shadow-md text-sm font-semibold text-center w-fit whitespace-nowrap z-50 ${
      userMessage.toLowerCase().includes('success')
        ? 'bg-[#0aad0a]  text-black'
        : 'bg-red-500  text-black'
    }`}
  >
    {userMessage}
  </div>
) : null}

        <h2 className="text-3xl font-bold my-4 pt-16 pb-6">Login Now:</h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
        

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={
              formik.touched.email && formik.errors.email
                ? 'border border-red-500  p-3 rounded-md w-full focus:outline-none focus:border-[red] transition duration-200'
                : 'border border-gray-300 text-black p-3 rounded-md w-full focus:outline-none focus:border-[#0aad0a] transition duration-200'
            }
          />
          {formik.touched.email && formik.errors.email && (
            <div role="alert" className="text-red-600 text-xs flex items-center gap-1 ">
              <i className="fas fa-exclamation-circle"></i> {formik.errors.email}
            </div>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={
              formik.touched.password && formik.errors.password
                ? 'border border-red-500  p-3 rounded-md w-full focus:outline-none focus:border-[red] transition duration-200'
                : 'border border-gray-300 text-black p-3 rounded-md w-full focus:outline-none focus:border-[#0aad0a] transition duration-200'
            }
          />
          {formik.touched.password && formik.errors.password && (
            <div role="alert" className="text-red-600 text-xs flex items-center gap-1">
              <i className="fas fa-exclamation-circle"></i> {formik.errors.password}
            </div>
          )}

          {/* Re-password */}
     
      
          {/* Submit Button */}
          {isLoading ?    <button
            type="submit"
            className="bg-main-color w-[15%] min-w-[120px] text-sm sm:text-base cursor-pointer mt-6 text-white py-2 sm:py-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            <i className='fa fa-spinner fa-spin'></i>
          </button> :  <button
            type="submit"
            className="bg-main-color w-[15%] min-w-[120px] cursor-pointer text-sm sm:text-base mt-6 text-white py-2 sm:py-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            Login
          </button>}
         
             
        </form>
      </div>
    </>
  )
}
