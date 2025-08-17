import React, { useContext, useState } from 'react';
import './CheckOut.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';

export default function CheckOut() {
  const { onlinePayment, cashPayment } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('');

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: Yup.object({
      details: Yup.string().required('Details are required'),
      phone: Yup.string()
        .matches(/^01[0-2,5]{1}[0-9]{8}$/, 'Invalid Egyptian phone number')
        .required('Phone is required'),
      city: Yup.string().required('City is required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      if (paymentMethod === "online") {
        await onlinePayment(values);
      } else if (paymentMethod === "cash") {
        await cashPayment(values);
      } else {
        console.warn("Please select a payment method.");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-main-color">Checkout Form</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Details"
            name="details"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            className={
              formik.touched.details && formik.errors.details
                ? 'border border-red-500 text-lg p-4 rounded-md w-full focus:outline-none focus:border-[red] transition duration-200'
                : 'border border-gray-300 text-lg p-4 rounded-md w-full focus:outline-none focus:border-[#0aad0a] transition duration-200'
            }
          />
          {formik.touched.details && formik.errors.details && (
            <div role="alert" className="text-red-600 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i> {formik.errors.details}
            </div>
          )}

          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={
              formik.touched.phone && formik.errors.phone
                ? 'border border-red-500 text-lg p-4 rounded-md w-full focus:outline-none focus:border-[red] transition duration-200'
                : 'border border-gray-300 text-lg p-4 rounded-md w-full focus:outline-none focus:border-[#0aad0a] transition duration-200'
            }
          />
          {formik.touched.phone && formik.errors.phone && (
            <div role="alert" className="text-red-600 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i> {formik.errors.phone}
            </div>
          )}

          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className={
              formik.touched.city && formik.errors.city
                ? 'border border-red-500 text-lg p-4 rounded-md w-full focus:outline-none focus:border-[red] transition duration-200'
                : 'border border-gray-300 text-lg p-4 rounded-md w-full focus:outline-none focus:border-[#0aad0a] transition duration-200'
            }
          />
          {formik.touched.city && formik.errors.city && (
            <div role="alert" className="text-red-600 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i> {formik.errors.city}
            </div>
          )}

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-gray-300 text-lg p-4 rounded-md w-full focus:outline-none focus:border-[#0aad0a] transition duration-200"
          >
            <option value="" disabled>Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>

          <button
            type="submit"
            className="bg-main-color w-full text-lg mt-6 cursor-pointer text-white py-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
}
