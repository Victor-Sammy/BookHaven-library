import './articles.css'
import { rootAPI } from '../api/root-api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import loadingGif from '../../assets/curve-line.gif'
//import Skeleton from 'react-loading-skeleton'

const Articles = () => {
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
  // useEffect(() => {
  //   const getArticles = async () => {
  //     await axios.get(`${rootAPI}/articles?page=2`).then((response) => {
  //       console.log(response.data)
  //       setIsLoading(false)
  //       //setArticless(response.data)
  //     })
  //   }
  //   getArticles()
  // }, [])

  const articles = articless?.data?.books
  console.log(articles)

  const startIndex = 3 // Index of the first element in the range
  const endIndex = 4 // Index of the last element in the range (inclusive)

  const selectedRange = articles && articles?.slice(startIndex, endIndex + 1)

  console.log(selectedRange) // Output: [ 4, 5, 6 ]
  //const imagesSrc = `data:${images.contentType};base64, ${images.image}`

  isError && <div>error loading items</div>
  //isLoading && <div>loading...</div>

  // const articles = [
  //   {
  //     id: 1,
  //     url: antImg,
  //     category: 'Zoology',
  //     title:
  //       'Ant colonies Maintain Social Homeostasis in the Face of Decreased Density',
  //     description:
  //       'Interactions lie at the heart of social organization, particularly in ant societies. Interaction rates are presumed to increase with density, but there ...',
  //   },
  //   {
  //     id: 2,
  //     url: planetImg,
  //     category: 'Science',
  //     title:
  //       'Planets Orbiting Other Stars: The search for extra-terrestrial life',
  //     description:
  //       'Since the Nobel-prize-winning discovery of a planet orbiting a sun-like star, the field of extrasolar planets is undergoing a true revolution. Thousands ...',
  //   },
  //   {
  //     id: 3,
  //     url: colorsImg,
  //     category: 'Psychology',
  //     title: 'Colors: The emotions and impressions they evoke',
  //     description:
  //       'In the words of Oscar Wilde,” Mere color can speak to the soul in a thousand different ways.” I too believe that colors are an inseparable aspect of every ...',
  //   },
  // ]
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
                <div className='w-[80%] text-black flex flex-col items-start justify-center'>
                  <h2 className='font-medium text-blue-400 xs:text-xs md:text-base'>
                    {obj.subject}
                  </h2>
                  <h1 className='font-medium xs:text-[0.7rem] md:text-lg xs:mb-0 md:mb-2 leading-tight'>
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
