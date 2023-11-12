/* eslint-disable react/prop-types */
import logo from '../../assets/lib-logo2.png'
import { useAuth } from '../../context/AuthContext'
import Popup from 'reactjs-popup'
import { FiMenu } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
const TopNav = ({ showLogin, setShowLogin }) => {
  const { user, logout } = useAuth()
  console.log(user)
  console.log(showLogin)
  const navigate = useNavigate()

  const controlLogin = () => {
    console.log('open login')
    setShowLogin(true)
  }

  const handleLogout = (e) => {
    e.preventDefault()

    logout()
  }
  return (
    <>
      <div className='bg-white h-20 border-b-2 border-gray-400 flex items-center justify-center'>
        <div className='navContent px-[5%] w-full flex items-center justify-between'>
          <img
            className='xs:w-[30%] md:w-[20%] lg:w-[15%] cursor-pointer'
            onClick={() => navigate('/')}
            src={logo}
            alt=''
          />
          {user ? (
            <div className='flex items-center gap-10'>
              <ul className='xs:hidden sm:block'>
                <li
                  className='font-medium cursor-pointer'
                  onClick={() => navigate('/library')}
                >
                  My Library
                </li>
              </ul>
              <div className='flex gap-2 items-center border border-blue-400 px-2 sm:py-1 2xl:py-2 rounded-full cursor-pointer'>
                <div className='name-img bg-blue-300 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-semibold capitalize'>
                  {user?.user.username[0] || user?.username[0]}
                </div>
                <p className='text-xl font-medium xs:hidden'>
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
            </div>
          ) : (
            <div>
              <button
                className='font-bold bg-white hover:bg-gray-200 hover:border-0 border-2 border-black rounded-lg px-5 py-2 ease-in-out duration-150 cursor-pointer'
                onClick={controlLogin}
              >
                LOG IN
              </button>
              <button
                className='font-bold bg-black text-white hover:text-black hover:bg-white rounded-lg px-5 py-2 ease-in-out duration-150 cursor-pointer shadow-md shadow-gray-400'
                onClick={controlLogin}
              >
                SIGN UP
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TopNav
