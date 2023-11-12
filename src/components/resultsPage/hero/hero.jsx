/* eslint-disable react/prop-types */
import Searchdiv from './search.div'
import { useAuth } from '../../../context/AuthContext'
import { useEffect, useState } from 'react'
import RequireAuth from '../../RequireAuth'
import MobileSignupLogin from '../../../pages/mobile-require-auth/signup-login'
import ResultsComponent from './ResultsComponent'

const Hero = ({ resultsData, setSearch, showLogin, setShowLogin }) => {
  const { user } = useAuth()
  const [windowInnerWidth, setWindowInnerWidth] = useState(false)

  useEffect(() => {
    showModal()
  })

  const toLoginPage = () => {
    if (showLogin && !windowInnerWidth) {
      return (
        <div
          className={`${
            showLogin
              ? 'block fixed top-20 bg-slate-400 sm:w-[100%] lg:w-[50%] px-[3%] pb-10'
              : 'hidden'
          }`}
        >
          <RequireAuth showLogin={showLogin} setShowLogin={setShowLogin} />
        </div>
      )
    } else if (showLogin && windowInnerWidth === false) {
      return <div className='hidden'></div>
    } else {
      return (
        showLogin &&
        windowInnerWidth && (
          <div className='block bg-slate-400 fixed top-0 left-0 w-full h-screen'>
            <MobileSignupLogin
              showLogin={showLogin}
              setShowLogin={setShowLogin}
            />
          </div>
        )
      )
    }
  }

  const showModal = () => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
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

  const totalBooks = resultsData?.total
  const books = resultsData?.books
  console.log(books)

  return (
    <div>
      <Searchdiv
        setSearch={(search) => setSearch(search)}
        resultsData={resultsData}
      />
      <section className='books-display xs:w-[96%] xs:ml-[2%] lg:w-[80%] lg:ml-[10%]'>
        <span className='total-result block mb-4'>
          <p>Showing {totalBooks} result</p>
        </span>
        {books?.map((book) => (
          <div
            key={book._id}
            className='book-card bg-white h-auto py-4 px-4 mb-5 shadow-md relative'
          >
            <ResultsComponent
              book={book}
              showLogin={showLogin}
              setShowLogin={setShowLogin}
              user={user}
            />
          </div>
        ))}
        <div>{toLoginPage()}</div>
      </section>
    </div>
  )
}

export default Hero
