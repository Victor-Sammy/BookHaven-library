/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import LoadingSpinner from '../vectors/LoadingSpinner'

const ActionButton = ({ children, className, loading, ...otherProps }) => (
  <button
    className={`arrowButton ${
      className ??
      'w-[70%] ml-[15%] py-2 bg-gray-100 rounded-xl text-gray-400 font-bold'
    }`}
    {...otherProps}
  >
    {children}

    <div className='arrow'>{loading ? <LoadingSpinner /> : ''}</div>
  </button>
)

export default ActionButton
