import { useEffect, useState } from 'react'
import Articles from '../components/articles/Articles'
import Banner from '../components/banner/Banner'
import Footer from '../components/footer/Footer'
import Journals from '../components/journals/Journals'
import Navbar from '../components/navbar/Navbar'
import Scroll from '../components/Scroll'
import Subjects from '../components/subjects/Subjects'
import { useAuth } from '../context/AuthContext'
import { useQueryClient } from '@tanstack/react-query'

const Home = () => {
  const { user } = useAuth()
  console.log(user)
  const queryClient = useQueryClient()
  queryClient.invalidateQueries('publications')

  const [isActive, setIsActive] = useState(false)
  const [toComponent, setToComponent] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      setIsDarkMode(darkModeMediaQuery.matches)
    }

    darkModeMediaQuery.addEventListener('change', handleChange)

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    localStorage.removeItem('resource')
  }, [])

  const handleOpenModal = () => {
    console.log('open modal')
    setIsActive(true)
  }

  const handleCloseModal = () => {
    setIsActive(false)
  }

  return (
    <div className={`${isActive ? 'xs:fixed md:relative' : ''}`}>
      <Navbar
        user={user}
        isActive={isActive}
        setIsActive={setIsActive}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        toComponent={toComponent}
        setToComponent={setToComponent}
      />
      <Banner isActive={isActive} isDarkMode={isDarkMode} />
      <Journals isActive={isActive} />
      <Articles isDarkMode={isDarkMode} />
      <Scroll />
      <Subjects />
      <Footer />
    </div>
  )
}

export default Home
