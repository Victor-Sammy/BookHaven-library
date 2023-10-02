/* eslint-disable react/prop-types */
import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import FormInput from '../../components/form-input/form-input.component'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import PwdIcon from '../../assets/pwd-icon.png'
import ActionButton from '../../components/form-input/login.button'

const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const LoginOnMobile = ({ showLogin, setShowLogin }) => {
  const { login, user } = useAuth()
  console.log(showLogin)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const validateEmail = (email) => {
    let errorMessage = ''
    if (email.trim() === '') {
      errorMessage = 'Email is required'
    } else if (!emailValidator.test(email)) {
      errorMessage = 'Enter valid email'
    } else {
      errorMessage = ''
    }

    setEmailError(errorMessage)
    return errorMessage ? false : true
  }

  const validatePassword = (password) => {
    let errorMessage = ''
    if (password.trim() === '') {
      errorMessage = 'Password is required'
    } else if (password.trim().length < 6) {
      errorMessage = 'Password length must be greater than 6'
    } else {
      errorMessage = ''
    }

    setPasswordError(errorMessage)
    return errorMessage ? false : true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let validEmail = validateEmail(email)
    let validPassword = validatePassword(password)

    if (validEmail && validPassword) {
      setLoading(true)
      login({
        email,
        password,
      })
        .then((res) => {
          setLoading(false)
          console.log('login-info', res)
          setShowLogin(false)
        })
        .catch((err) => {
          setLoading(false)
          setFormError(err.message || 'Error login in, check creddentials')
        })
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    switch (name) {
      case 'email':
        setEmail(value)
        validateEmail(value)
        break
      case 'password':
        setPassword(value)
        validatePassword(value)
        break
      default:
        break
    }
    setFormError('')
  }

  if (!user) {
    return (
      <div className='w-full px-3'>
        <hr className='border-2 border-blue-400 ml-[15%] w-28 float-left' />
        <div className='googleAuth w-full flex flex-col items-center justify-center gap-3 pt-7'>
          <div className='f-g-icons flex gap-5'>
            <div className='border border-gray-200 bg-white hover:bg-gray-200 px-3 py-3 rounded-2xl cursor-pointer'>
              <FaFacebookF />
            </div>
            <div className='border border-gray-200 bg-white hover:bg-gray-200 px-3 py-3 rounded-2xl cursor-pointer'>
              <BsGoogle />
            </div>
          </div>
          <p>or</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='email mb-5'>
            <h1 className='text-[.92rem] text-gray-500 font-semibold mb-1'>
              Email address
            </h1>
            <FormInput
              name='email'
              value={email}
              type='email'
              label='Your email address'
              handleChange={handleChange}
              error={emailError}
              onBlur={(e) => validateEmail(e.target.value)}
            />
          </div>
          <div className='pword relative'>
            <h1 className='text-[.92rem] text-gray-500 font-semibold mb-1'>
              Password
            </h1>
            <FormInput
              name='password'
              value={password}
              type='password'
              label='Your password'
              icon={PwdIcon}
              handleChange={handleChange}
              error={passwordError}
              onBlur={(e) => validatePassword(e.target.value)}
            />
          </div>
          <span className='formError'>{formError}</span>
          <Link>
            <p className='text-center mt-2 mb-6 underline text-xs'>
              Forgot your password?
            </p>
          </Link>
          <ActionButton disabled={loading} loading={loading} type='submit'>
            LOG IN
          </ActionButton>
        </form>
      </div>
    )
  } else {
    return navigate('/resultsPage')
  }
}

export default LoginOnMobile
