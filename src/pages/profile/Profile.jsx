/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import TopNav from '../../components/resultsPage/topnav'
import { useAuth } from '../../context/AuthContext'
import Footer from '../../components/footer/Footer'
import transition from '../../transition'
//import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user, updateUser } = useAuth()
  console.log(user)
  //const navigate = useNavigate()
  // call the update user in auth context
  const email = user && user?.user.email
  const [username, setUsername] = useState(`${user && user?.user.username}`)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  const selectOption = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const userFormData = new FormData()
    userFormData.append('username', username)
    userFormData.append('email', email)
    updateUser({ userFormData })
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

  return (
    <div className='bg-gray-100 h-screen'>
      <TopNav />
      <div className='xs:px-5 sm:px-10 pb-5 mt-16 xs:mx-[5%] sm:mx-[8%] lg:mx-[15%] 2xl:mx-[28%] mb-[5%] bg-white text-black'>
        <h1 className='py-5 font-medium xs:text-md sm:text-xl'>PROFILE</h1>
        <hr className='border-blue-400 w-[30%] xs:-translate-x-5 sm:-translate-x-10 mb-10' />
        <form onSubmit={handleSubmit}>
          <div className='email flex flex-col gap-5 pb-8'>
            <h1 className=''>Email *</h1>
            <input
              type='email'
              name='email'
              className='border h-16 pl-3 rounded-lg text-gray-500'
              value={email}
              disabled
            />
          </div>
          <div className='text flex flex-col gap-5 pb-8'>
            <h1>Full name</h1>
            <input
              type='text'
              name='username'
              value={username}
              className='border h-16 pl-3 rounded-lg'
              onChange={handleChange}
            />
          </div>
          <h1 className='mb-5'>Role *</h1>
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
          <button
            type='submit'
            className='mt-8 bg-blue-400 hover:bg-blue-500 text-white w-full h-14'
          >
            Save profile{' '}
            <span className={`${loading ? 'block' : 'hidden'}`}>
              loading...
            </span>
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default transition(Profile)
