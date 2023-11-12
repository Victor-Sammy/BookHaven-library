import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import loginImg from '../../assets/login_img.jpg'
import { BsGoogle } from 'react-icons/bs'
import PwdIcon from '../../assets/pwd-icon.png'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../form-input/button.component'

const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Login = () => {
  const { login, user, loginGoogle } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  //google sign in
  const gSignin = () => {
    loginGoogle()
  }

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
          navigate('/', { replace: true })
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
      <div className='flex flex-row justify-between h-auto w-full'>
        <div className='mt-7 h-auto w-[50%]'>
          <img
            className='rounded-2xl h-[700px] w-full'
            src={loginImg}
            alt='login-img'
          />
        </div>
        <section className='mt-8 w-[40%]'>
          <div className='googleAuth flex flex-col items-center justify-center gap-1'>
            <h1 className='font-medium'>Log In with</h1>
            <div className='f-g-icons'>
              <div
                className='border border-gray-200 bg-white hover:bg-gray-200 px-3 py-3 rounded-2xl cursor-pointer'
                onClick={gSignin}
              >
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
              <p className='float-right mt-2 mb-6 underline text-xs'>
                Forgot your password?
              </p>
            </Link>
            <CustomButton disabled={loading} loading={loading} type='submit'>
              LOG IN
            </CustomButton>
          </form>
          <div className='sub-footer font-medium text-center text-[.7rem] mb-5 mt-2'>
            {/* eslint-disable-next-line react/no-unescaped-entities*/}
            <span>Don't have an account? </span>
            <Link to=''>
              <span className='text-blue-400 underline'>Sign Up</span>
            </Link>
          </div>
        </section>
      </div>
    )
  } else {
    return navigate('/')
  }
}

export default Login
