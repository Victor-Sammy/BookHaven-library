/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const FormInput = ({ handleChange, label, icon, error, ...otherProps }) => (
  <div className='form'>
    <input
      className='form-input w-full border border-blue-400 h-12 rounded-2xl px-3 relative'
      onChange={handleChange}
      {...otherProps}
      placeholder={label}
    />
    {icon && (
      <img
        src={icon}
        className='form-icon w-5 absolute right-3 top-9'
        alt='icon'
      />
    )}
    <div className='error text-sm text-red-500'>{error}</div>
  </div>
)

export default FormInput
