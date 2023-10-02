/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from 'react'
import TopNav from '../../components/resultsPage/topnav'
import History from './History'
import Favorites from './Favorites'
import { useQueryClient } from '@tanstack/react-query'
import transition from '../../transition'

const ComponentA = () => <History />
const ComponentB = () => <Favorites />

const MyLibrary = () => {
  const componentRef = useRef(<ComponentA />)
  const queryClient = useQueryClient()
  queryClient.invalidateQueries('favourites')
  const [showHistory, setShowHistory] = useState(true)

  useEffect(() => {
    if (showHistory) {
      componentRef.current = <ComponentA />
    } else if (!showHistory) {
      componentRef.current = <ComponentB />
    } else componentRef.current = <ComponentA />
  })

  const handleSwitchToHistory = () => {
    setShowHistory(true)
    componentRef.current = <ComponentA />
  }
  const handleSwitchToFavourites = () => {
    setShowHistory(false)
    componentRef.current = <ComponentB />
  }

  return (
    <div className=''>
      <TopNav />
      <div className='xs:w-[96%] xs:ml-[2%] lg:w-[80%] lg:ml-[10%] 2xl:px-[10%]'>
        <div className='flex items-center gap-[10%] mt-5 font-medium'>
          <span
            className='cursor-pointer xs:w-[25%] sm:w-[15%] lg:w-[12%] text-center'
            onClick={handleSwitchToHistory}
          >
            <h1>History</h1>
          </span>
          <span
            className='cursor-pointer xs:w-[25%] sm:w-[15%] lg:w-[12%] text-center'
            onClick={handleSwitchToFavourites}
          >
            <h1>Favourites</h1>
          </span>
        </div>
        {componentRef.current}
      </div>
    </div>
  )
}

export default transition(MyLibrary)
