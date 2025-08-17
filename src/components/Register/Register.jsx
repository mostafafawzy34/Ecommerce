import './Register.module.css';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [userMessage, setUserMessage] = useState(null)

    const[isLoading, setIsLoading] = useState(false)  

  let navigate = useNavigate()


  useEffect(() => {
    if (userMessage) {
      const timer = setTimeout(() => setUserMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [userMessage]);

  let mySchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long').max(10, 'Name must be at most 20 characters long'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{3,8}$/, 'Invalid password'),
    rePassword: Yup.string().required('Re-Password is required').oneOf([Yup.ref('password')], 'Password does not match'),
    phone: Yup.string().required('Phone is required').matches(/^(002)?01[0125][0-9]{8}$/, 'Invalid phone number')
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      console.log(values);
      registerForm(values)
    }
  });

  async function registerForm(values) {
    setIsLoading(true)
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data) => {
      console.log(data.data.message);
      setUserMessage("Account created successfully.");
      navigate("/login")
      setIsLoading(false)
    }).catch((error) => {
      console.log("Error:", error.response?.data);
      setUserMessage(error.response?.data?.message || "Registration failed.");
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

        <h2 className="text-3xl font-bold my-4 pt-16 pb-6">Register Now:</h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={
              formik.touched.name && formik.errors.name
                ? 'border border-red-500  p-3 rounded-md w-full focus:outline-none focus:border-[red] transition duration-200'
                : 'border border-gray-300 text-black p-3 rounded-md w-full focus:outline-none focus:border-[#0aad0a] transition duration-200'
            }
          />
          {formik.touched.name && formik.errors.name && (
            <div role="alert" className="text-red-600 text-xs flex items-center gap-1">
              <i className="fas fa-exclamation-circle"></i> {formik.errors.name}
            </div>
          )}

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
          <input
            type="password"
            placeholder="Re-password"
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            className={
              formik.touched.rePassword && formik.errors.rePassword
                ? 'border border-red-500  p-3 rounded-md w-full focus:outline-none focus:border-[red] transition duration-200'
                : 'border border-gray-300 text-black p-3 rounded-md w-full focus:outline-none focus:border-[#0aad0a] transition duration-200'
            }
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <div role="alert" className="text-red-600 text-xs flex items-center gap-1">
              <i className="fas fa-exclamation-circle"></i> {formik.errors.rePassword}
            </div>
          )}

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={
              formik.touched.phone && formik.errors.phone
                ? 'border border-red-500  p-3 rounded-md w-full focus:outline-none focus:border-[red] transition duration-200'
                : 'border border-gray-300 text-black p-3 rounded-md w-full focus:outline-none focus:border-[#0aad0a] transition duration-200'
            }
          />
          {formik.touched.phone && formik.errors.phone && (
            <div role="alert" className="text-red-600 text-xs flex items-center gap-1 ">
              <i className="fas fa-exclamation-circle"></i> {formik.errors.phone}
            </div>
          )}

          {/* Submit Button */}
          {isLoading ?    <button
            type="submit"
            className="bg-main-color w-[15%] min-w-[120px] cursor-pointer text-sm sm:text-base mt-6 text-white py-2 sm:py-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            <i className='fa fa-spinner fa-spin'></i>
          </button> :  <button
            type="submit"
            className="bg-main-color w-[15%] min-w-[120px] cursor-pointer text-sm sm:text-base mt-6 text-white py-2 sm:py-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            Register
          </button>}
         
             
        </form>
      </div>
    </>
  );
}
