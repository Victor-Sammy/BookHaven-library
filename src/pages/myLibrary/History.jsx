import { useQuery } from '@tanstack/react-query'
import { getHistory } from '../../components/api/history'
import loadingImg from '../../assets/load-vault.gif'
import HistoryComponent from './HistoryComponent'

const History = () => {
  const {
    data: history,
    error,
    isLoading,
  } = useQuery(['history'], getHistory, {
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

  console.log(history)
  const myHistory = [...history].reverse()
  console.log(myHistory)

  return (
    <div>
      <hr className='xs:w-[25%] sm:w-[15%] lg:w-[12%] border-blue-400 border-2' />
      <section className='history-display mt-5'>
        {myHistory?.map((book) => (
          <div
            key={book._id}
            className='book-card bg-white h-auto py-4 px-4 mb-5 shadow-md'
          >
            <HistoryComponent book={book} />
          </div>
        ))}
      </section>
    </div>
  )
}

export default History
