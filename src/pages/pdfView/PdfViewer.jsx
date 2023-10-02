/* eslint-disable react/prop-types */
import logoIMG from '../../assets/lib-logo2.png'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import { rootAPI } from '../../components/api/root-api'
import PdfContent from '../../components/pdfViewerComponents/PdfContent'

const PdfViewer = () => {
  const modelName = localStorage.getItem('book-modelName')
  const id = localStorage.getItem('book-id')
  console.log(id)
  const { user } = useAuth()
  const [userGoogle, setUserGoogle] = useState(null)
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(true)
  const [windowWidth, setWindowWidth] = useState(false)

  useEffect(() => {
    console.log(user)
    googleAuth()
    getBook()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getBook = async () => {
    try {
      const request = await axios.get(`${rootAPI}/${id}/${modelName}`)
      setBook(request.data)
      setLoading(false)
      console.log(request.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    removeFirstUserName()
  }, [])

  const removeFirstUserName = () => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setWindowWidth(true)
      } else {
        setWindowWidth(false)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }

  const googleAuth = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/auth/login/success',
        {
          withCredentials: true,
        }
      )
      setUserGoogle(data.user)
      console.log(data.userGoogle)
    } catch (error) {
      console.log(error.response?.data)
    }
  }

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className=''>
          <div className='top-navbar fixed w-full bg-gray-300 h-20 xs:border-b-4 md:border-b-2 xs:border-gray-400 flex items-center justify-between xs:px-1 md:px-8'>
            <img
              className='xs:w-[30%] sm:w-[20%] lg:w-[12%] cursor-pointer'
              src={logoIMG}
              alt=''
            />
            <div className='flex gap-2 items-center border border-blue-400 px-2 py-1 rounded-full cursor-pointer'>
              <div
                className={`${
                  windowWidth
                    ? 'hidden'
                    : 'name-img bg-blue-300 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-semibold capitalize'
                }`}
              >
                {user?.user.username[0] || userGoogle?.username[0]}
              </div>
              <p className='xs:text-sm md:text-xl font-medium'>
                {user?.user.username || userGoogle?.username}
              </p>
            </div>
          </div>
          <section className=''>
            <div className='pdfContent md:w-[100%]'>
              <PdfContent book={book} />
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default PdfViewer
