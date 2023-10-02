import { useQuery } from '@tanstack/react-query'
import { getFavourites } from '../../components/api/favorites'
import loadingImg from '../../assets/load-vault.gif'
import FaveComponent from './FaveComponet'

const Favorites = () => {
  const {
    data: favorites,
    error,
    isLoading,
  } = useQuery(['favourites'], getFavourites, {
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return (
      <div className='h-screen w-full'>
        <img
          className='h-full w-full object-contain rounded shadow-lg shadow-blue-300'
          src={loadingImg}
          alt=''
        />
      </div>
    )
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }
  console.log(favorites)
  const myFavorites = [...favorites].reverse()
  console.log(myFavorites)

  return (
    <div>
      <hr className='xs:w-[25%] sm:w-[15%] lg:w-[12%] xs:ml-[35%] sm:ml-[25%] lg:ml-[22%] border-blue-400 border-2' />
      <section className='favourites-display mt-5'>
        {myFavorites?.map((book) => (
          <div
            key={book._id}
            className='book-card bg-white h-auto py-4 px-4 mb-5 shadow-md'
          >
            <FaveComponent book={book} />
          </div>
        ))}
      </section>
    </div>
  )
}

export default Favorites
