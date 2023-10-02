import { useEffect, useState } from 'react'
//import banner from '../assets/world-book.jpg'
import './banner.css'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Banner = ({ isActive }) => {
  const [query, setQuery] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getPlaceholderText = () => {
    if (windowWidth < 768) {
      return 'Search for title and more!'
    } else {
      return 'Search for a title, author, journal'
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim() !== '') {
      navigate(`/resultsPage?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <>
      <div
        className={`banner ${
          isActive ? 'xs:fixed' : 'xs:relative'
        } md:relative`}
      >
        <div className='absolute xs:top-[40%] md:top-[35%] w-full text-white xs:px-4'>
          <h1 className='lg:text-[4.8rem] xs:text-[2.3rem] text-center font-semibold mb-4'>
            Your Online Library
          </h1>
          <form onSubmit={handleSearch}>
            <div className='searchContainer md:ml-[17%] lg:ml-[30%] md:w-[66%] lg:w-[40%] h-auto border border-blue-400 rounded-xl relative mb-2'>
              <input
                className='w-full h-14 pl-3 rounded-xl text-black xs:placeholder:w-60'
                type='text'
                value={query}
                placeholder={getPlaceholderText()}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className='absolute flex items-center right-5 bottom-4 text-blue-400'>
                <hr className='rotate-90 border-blue-400 w-12' />
                <button className='searchIcon text-2xl' type='submit'>
                  <BsSearch />
                </button>
              </div>
            </div>
          </form>
          <p className='text-center text-gray-200 font-semibold xs:text-sm md:text-[15px]'>
            Discover academic journals, articles, & books on one seamless
            platform
          </p>
        </div>
      </div>
    </>
  )
}

export default Banner
