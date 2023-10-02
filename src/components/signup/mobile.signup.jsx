import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import FormInput from '../form-input/form-input.component'
import ActionButton from '../form-input/login.button'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PwdIcon from '../../assets/pwd-icon.png'

const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

const SignUpMobile = () => {
  const { register, user } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectOption = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  const validateUsername = (username, check = false) => {
    let usernameError = ''
    if (username.trim() === '') usernameError = 'Username is required'

    if (!check) {
      setUsernameError(usernameError)
    }
    return usernameError === ''
  }

  const validateEmail = (email, check = false) => {
    let errorMessage = ''
    if (email.trim() === '') {
      errorMessage = 'Email is required'
    } else if (!emailValidator.test(email)) {
      errorMessage = 'Enter valid email'
    } else {
      errorMessage = ''
    }

    if (!check) {
      setEmailError(errorMessage)
    }
    return errorMessage ? false : true
  }

  const validatePassword = (password, check) => {
    let errorMessage = ''
    if (password.trim() === '') {
      errorMessage = 'Password is required'
    } else if (!passwordValidator.test(password)) {
      errorMessage =
        'Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!'
    } else {
      errorMessage = ''
    }

    if (!check) {
      setPasswordError(errorMessage)
    }
    return errorMessage ? false : true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateFields()) {
      setLoading(true)
      register({
        username,
        email,
        password,
      })
        .then((response) => {
          setLoading(false)
          console.log('profile', response)

          navigate('/login', { replace: true })
        })
        .catch((err) => {
          setLoading(false)
          setFormError(
            err.message || 'Error creating account, check credentials'
          )
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
      case 'username':
        setUsername(value)
        validateUsername(value)
        break
      default:
        break
    }

    setFormError('')
    console.log('validDetails', validateFields())
  }

  const validateFields = () => {
    if (
      validateUsername(username, true) &&
      validateEmail(email, true) &&
      validatePassword(password, true)
    ) {
      return true
    }
    return false
  }

  const options = [
    'Academic researcher',
    'Corporate researcher',
    'Lecturer',
    'Librarian',
    'Master or under-graduate student',
    'Other professional',
    'phD student',
    'Publishing professional',
  ]

  if (!user) {
    return (
      <div className='w-full px-3'>
        <hr className='border-2 border-blue-400 mr-[15%] w-28 float-right' />
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
          <div className='fullName mb-5'>
            <h1 className='text-[.92rem] text-gray-500 font-semibold mb-1'>
              Full name
            </h1>
            <FormInput
              name='username'
              value={username}
              type='text'
              label='Your full name'
              handleChange={handleChange}
              error={usernameError}
              onBlur={(e) => validateUsername(e.target.value)}
            />
          </div>
          <div className='role mb-5'>
            <h1 className='text-[.92rem] text-gray-500 font-semibold mb-1'>
              Role
            </h1>
            <div className='dropdown w-full border relative' id='dropdown'>
              <button
                type='button'
                className='bg-white hover:bg-gray-100 px-4 py-2 w-full h-12 flex items-center justify-between rounded focus:outline-none'
                onClick={toggleDropdown}
              >
                {selectedOption || 'Select an option'}
                <svg
                  className={`ml-2 h-5 w-5 transition-transform duration-200 transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M6 8l4 4 4-4'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
              {isOpen && (
                <div className='absolute z-10 mt-2 bg-white shadow-md rounded w-full'>
                  {options.map((option, index) => (
                    <button
                      key={index}
                      type='button'
                      className='block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left'
                      onClick={() => selectOption(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
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
          <div className='pword relative mb-3'>
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
          <div className='instructions text-sm mb-7'>
            <h1 className='font-bold text-gray-600'>
              Your password must contain:
            </h1>
            <ul className='list-disc ml-5 font-semibold text-gray-500 text-[.78rem]'>
              <li>A minimum of 8 characters</li>
              <li>One upper case letter</li>
              <li>One lower case letter</li>
              <li>One number</li>
            </ul>
          </div>
          <span className='formError'>{formError}</span>
          <ActionButton disabled={loading} loading={loading} type='submit'>
            SIGN UP
          </ActionButton>
          <p className='text-center text-xs mt-10'>
            I agree to the following{' '}
            <span className='text-blue-400'>
              Terms of services, Privacy Policy
            </span>
          </p>
        </form>
      </div>
    )
  } else {
    navigate('/')
  }
}

export default SignUpMobile
