/* eslint-disable react/prop-types */
import './articles.css'
import { rootAPI } from '../api/root-api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import loadingGif from '../../assets/curve-line.gif'

const Articles = ({ isDarkMode }) => {
  const {
    data: articless,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['publications'],
    queryFn: async () => await axios.get(`${rootAPI}/articles?page=8`),
    staleTime: 60000,
    refetchOnWindowFocus: false,
  })
  console.log(articless)

  const articles = articless?.data?.books
  console.log(articles)

  const startIndex = 3
  const endIndex = 4

  const selectedRange = articles && articles?.slice(startIndex, endIndex + 1)

  console.log(selectedRange)

  isError && <div>error loading items</div>

  return (
    <div className='xs:w-full xs:px-3 xs:ml-0 md:w-[86%] md:ml-[7%] xl:w-[68%] xl:ml-[17%] xs:mb-20 md:mb-28 xs:-translate-y-5 md:-translate-y-0'>
      <h1 className='text-center xs:text-xs md:text-[1.5rem] font-medium mb-10'>
        Browse our collection of Articles
      </h1>
      <section className='w-full relative'>
        {isLoading ? (
          <div className='w-full'>
            <img className='w-full h-12' src={loadingGif} alt='' />
            <img className='w-full h-12' src={loadingGif} alt='' />
          </div>
        ) : (
          <div>
            {selectedRange?.map((obj) => (
              <div
                key={obj._id}
                className='articles-display flex mb-8 cursor-pointer'
                onClick={() => {
                  localStorage.setItem('major', obj.subject)
                  localStorage.setItem('book-id', obj._id)
                  localStorage.setItem('book-modelName', 'Articles')
                  window.open('/pdfPage')
                }}
              >
                <div className='w-[20%] xs:mr-2 md:mr-5 flex items-center justify-center'>
                  <img
                    className='article-images w-64 rounded-lg'
                    src={`data:${obj.image};base64,${obj.image}`}
                    alt=''
                  />
                </div>
                <div className='w-[80%] flex flex-col items-start justify-center'>
                  <h2 className='font-medium text-blue-400 xs:text-xs md:text-base'>
                    {obj.subject}
                  </h2>
                  <h1
                    className={`font-medium xs:text-[0.7rem] md:text-lg xs:mb-0 md:mb-2 leading-tight ${
                      isDarkMode ? 'text-gray-200' : 'text-black'
                    }`}
                  >
                    {obj.title}
                  </h1>
                  <p className='xs:text-[0.6rem] md:text-sm leading-tight'>
                    {obj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <hr className='divide absolute w-80 border-gray-600 rotate-90 bottom-36 right-64 hidden' />
      </section>
    </div>
  )
}

export default Articles
