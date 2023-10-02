/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import SignUpMobile from '../../components/signup/mobile.signup'
import LoginMobile from '../../components/login/mobile.login'
import { MdChevronLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import CustomLogin from '../../components/custom-login/login'
import CustomSignUp from '../../components/custom-signup/signup'

function MobileLoginSignup({ toComponent, setToComponent }) {
  console.log(toComponent)
  const navigate = useNavigate()
  const [windowInnerWidth, setWindowInnerWidth] = useState(false)

  const switchComponent = () => {
    setToComponent(false)
    console.log(toComponent)
  }
  const switchComponent2 = () => {
    setToComponent(true)
    console.log(toComponent)
  }

  const collapsePage = () => {
    window.location.reload()
  }

  useEffect(() => {
    showModal()
    toComponent
  }, [toComponent])

  const showModal = () => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setWindowInnerWidth(true)
      } else {
        setWindowInnerWidth(false)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }

  const toPage = () => {
    if (windowInnerWidth && toComponent === true) {
      return (
        <div>
          <button
            className='absolute right-2 top-2 bg-white hover:bg-slate-100 cursor-pointer px-3 py-1 font-semibold rounded-xl'
            onClick={collapsePage}
          >
            close
          </button>
          <CustomLogin />
        </div>
      )
    } else if (windowInnerWidth && toComponent === false) {
      return (
        <div>
          <button
            className='absolute right-2 top-2 bg-white hover:bg-slate-100 cursor-pointer px-3 py-1 font-semibold rounded-xl'
            onClick={collapsePage}
          >
            close
          </button>
          <CustomSignUp />
        </div>
      )
    } else {
      return toComponent ? <LoginMobile /> : <SignUpMobile />
    }
    //showComponentA ? <LoginMobile /> : <SignUpMobile />
  }

  return (
    <div className='w-full'>
      <nav
        className={`${
          windowInnerWidth
            ? 'hidden'
            : 'flex w-full items-center py-2 shadow-md shadow-slate-400 border rounded-b-[25px]'
        }`}
      >
        <div className='w-[10%] mr-[5%] text-3xl flex justify-end items-center cursor-pointer'>
          <div onClick={collapsePage}>
            <MdChevronLeft />
          </div>
        </div>
        <div className='w-[70%] flex justify-between text-xl font-bold text-gray-600'>
          <div className='w-[35%] flex justify-center items-center'>
            <button onClick={switchComponent2}>log in</button>
          </div>
          <div className='w-[35%] flex justify-center'>
            <button onClick={switchComponent}>sign up</button>
          </div>
        </div>
      </nav>
      <div className='pb-5 px-5'>{toPage()}</div>
    </div>
  )
}

export default MobileLoginSignup
