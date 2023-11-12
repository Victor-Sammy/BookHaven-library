/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import logo from '../../assets/lib-logo2.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { AiFillHome } from 'react-icons/ai'
import { BiSolidLogIn } from 'react-icons/bi'
import { BiSearch } from 'react-icons/bi'
import { GrFormClose } from 'react-icons/gr'
import Popup from 'reactjs-popup'
import './navbar.css'
import { MdContactEmergency } from 'react-icons/md'
import { FaUserPlus } from 'react-icons/fa'
import { MdChevronRight } from 'react-icons/md'
import MobileLoginSignup from '../../pages/mobile-login-signup/login-signup'
import CustomLogin from '../custom-login/login'
import CustomSignUp from '../custom-signup/signup'
import { useAuth } from '../../context/AuthContext'

const Navbar = ({
  isActive,
  handleOpenModal,
  handleCloseModal,
  toComponent,
  setToComponent,
}) => {
  const { user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [toMobileLogin, setToMobileLogin] = useState(Boolean)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [windowInnerWidth, setWindowInnerWidth] = useState(false)

  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()

    logout()
  }

  const handleLoginPage = () => {
    console.log('open modal')
    setToComponent(true)
    setToMobileLogin(true)
  }

  const handleSignUpPage = () => {
    console.log('open modal', 'component-true')
    setToComponent(false)
    setToMobileLogin(!toMobileLogin)
  }

  const controlLogin = () => {
    console.log('open login')
    setShowLogin(true)
  }

  const controlSignUp = () => {
    console.log('open modal', 'component-true')
    setShowSignup(true)
  }

  const collapsePage = () => {
    setShowLogin(false) || setShowSignup(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    showModal()
  }, [])

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

  return (
    <div className='navbar w-full z-10 fixed bg-gray-100 h-20 xs:border-b-4 md:border-b-0 xs:border-blue-400'>
      <div className='nav-content flex justify-between w-full xs:px-1 md:px-8 relative'>
        <img
          className='xs:w-[30%] md:w-[20%] lg:w-[12%] cursor-pointer'
          src={logo}
          alt=''
        />
        {user ? (
          <div className='md:flex gap-2 items-center border border-blue-400 px-2 py-2 rounded-full xs:hidden cursor-pointer'>
            <div className='name-img bg-blue-300 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-semibold capitalize'>
              {user?.user.username[0] || user?.username[0]}
            </div>
            <p className={`${isScrolled ? 'hidden' : 'text-xl font-medium'}`}>
              {user?.user.username || user?.username}
            </p>
            <Popup
              trigger={
                <div className='text-3xl' onClick=''>
                  <FiMenu />
                </div>
              }
              position='bottom right'
            >
              <div className='bg-white font-medium'>
                <h1 className='mb-1'>{user?.user.email || user?.email}</h1>
                <hr className='mb-4' />
                <ul className='cursor-pointer'>
                  <li
                    className='mb-2 hover:font-bold'
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </li>
                  <li
                    className='mb-2 hover:font-bold'
                    onClick={() => navigate('/library')}
                  >
                    My Library
                  </li>
                  <li
                    className='mb-2 hover:font-bold'
                    onClick={() => navigate('/contact')}
                  >
                    Contact Us
                  </li>
                  <li className='hover:font-bold' onClick={handleLogout}>
                    Log Out
                  </li>
                </ul>
              </div>
            </Popup>
          </div>
        ) : (
          <div
            className={`auth-btns md:flex items-center gap-3 xs:hidden ${
              windowInnerWidth && isActive
                ? 'pointer-events-none'
                : 'pointer-events-auto'
            }`}
          >
            <div className='contact-us text-xl font-medium text-gray-600 mr-5 cursor-pointer'>
              <NavLink to=''>About</NavLink>
            </div>
            <div className='contact-us text-xl font-medium text-gray-600 mr-5 cursor-pointer'>
              <NavLink to='/contact'>Contact</NavLink>
            </div>
            <button
              className='font-bold bg-white hover:bg-gray-200 hover:border-0 border-2 border-black rounded-lg px-5 py-2 ease-in-out duration-150 cursor-pointer'
              onClick={controlLogin}
            >
              LOG IN
            </button>
            <button
              className='font-bold bg-black text-white hover:text-black hover:bg-white rounded-lg px-5 py-2 ease-in-out duration-150 cursor-pointer shadow-md shadow-gray-400'
              onClick={controlSignUp}
            >
              SIGN UP
            </button>
          </div>
        )}
        <div
          className={`${
            isActive
              ? 'hidden'
              : 'mobile-menu md:hidden xs:block text-[2rem] cursor-pointer'
          }`}
          onClick={handleOpenModal}
        >
          <FiMenu />
        </div>
        {isActive && (
          <div className='menu-slide bg-white h-screen w-[65%] px-0 md:hidden mt-20 xs:block absolute -top-[106px] -right-3'>
            <div
              className='menu-close md:hidden xs:flex text-[2.3rem] h-20 bg-slate-100 border-b-4 w-full cursor-pointer pr-3 items-center justify-end'
              onClick={handleCloseModal}
            >
              <GrFormClose />
            </div>
            <div className='menu-list'>
              <ul className='w-full flex flex-col gap-10 px-5 pt-5 text-2xl text-gray-600 font-semibold'>
                <li
                  className='flex items-center justify-between'
                  onClick={handleCloseModal}
                >
                  <span>
                    <AiFillHome />
                  </span>
                  <span>Home</span>
                  <span>
                    <MdChevronRight />
                  </span>
                </li>
                <li className='flex items-center justify-between'>
                  <span>
                    <BiSearch />
                  </span>
                  <span>Search</span>
                  <span>
                    <MdChevronRight />
                  </span>
                </li>
                <li
                  className='flex items-center justify-between'
                  onClick={() => navigate('/contact')}
                >
                  <span>
                    <MdContactEmergency />
                  </span>
                  <span>Contact</span>
                  <span>
                    <MdChevronRight />
                  </span>
                </li>
                <li
                  className='flex items-center justify-between cursor-pointer'
                  onClick={handleSignUpPage}
                >
                  <span>
                    <FaUserPlus />
                  </span>
                  <span>Sign Up</span>
                  <span>
                    <MdChevronRight />
                  </span>
                </li>
                <li
                  className='login flex items-center justify-between cursor-pointer'
                  onClick={handleLoginPage}
                >
                  <span>
                    <BiSolidLogIn />
                  </span>
                  <span>Log In</span>
                  <span>
                    <MdChevronRight />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {toMobileLogin && (
          <section
            className={`mobile-login-page right-0 top-0 w-full bg-white ${
              windowInnerWidth
                ? 'absolute top-14 md:right-[10%] md:w-[80%] xl:w-[50%] xl:right-[25%] rounded-2xl bg-slate-300'
                : 'fixed h-screen'
            }`}
          >
            <div className=''>
              <MobileLoginSignup
                toComponent={toComponent}
                setToComponent={setToComponent}
              />
            </div>
          </section>
        )}

        {/* You can open the modal using ID.showModal() method */}
        <section
          className={`showSignUp absolute top-14 md:right-[10%] md:w-[80%] xl:w-[50%] xl:right-[25%] rounded-2xl bg-slate-300 px-4 pb-8 ${
            showSignup ? 'block' : 'hidden'
          } ${user ? 'hidden' : ''}`}
        >
          <button
            className='absolute right-2 top-2 bg-white hover:bg-slate-100 cursor-pointer px-3 py-1 font-semibold rounded-xl'
            onClick={collapsePage}
          >
            close
          </button>
          <CustomSignUp />
        </section>

        <section
          className={`showLogin absolute top-14 md:right-[10%] md:w-[80%] xl:w-[50%] xl:right-[25%] rounded-2xl bg-slate-300 px-4 pb-8 ${
            showLogin ? 'block' : 'hidden'
          }  ${user ? 'hidden' : ''}`}
        >
          <button
            className='absolute right-2 top-2 bg-white hover:bg-slate-100 cursor-pointer px-3 py-1 font-semibold rounded-xl'
            onClick={collapsePage}
          >
            close
          </button>
          <CustomLogin />
        </section>
      </div>
    </div>
  )
}

export default Navbar
