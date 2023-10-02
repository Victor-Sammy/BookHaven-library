/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import loadingImg from '../assets/load-vault.gif'
import { useQueryClient } from '@tanstack/react-query'
import SideBar from '../components/resultsPage/sidebar'
import TopNav from '../components/resultsPage/topnav'
import { rootAPI } from '../components/api/root-api'
import { CgMenuRound } from 'react-icons/cg'
import Hero from '../components/resultsPage/hero/hero'
import transition from '../transition'
import { useLocation } from 'react-router-dom'

//const subject = localStorage.getItem('item')

const ResultsPage = () => {
  const queryClient = useQueryClient()
  const books = localStorage.getItem('resource')
  const [showLogin, setShowLogin] = useState(false)
  const [obj, setObj] = useState({})
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState(['All'])
  const [isLoading, setIsLoading] = useState(true)
  const [subject, setSubject] = useState([localStorage.getItem('major')])

  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q') || ''
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['publications'],
  //   queryFn: async () =>
  //     await axios.get(
  //       `${rootAPI}/articles?page=${page}&subject=${subject}&resourceType=${filterType.toString()}&search=${search}`
  //     ),
  //   staleTime: 2,
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: true,
  // })
  // console.log(data?.data)
  // console.log(rootAPI)
  // console.log(filterType)

  // isError && <div>error loading items</div>

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const url = `${rootAPI}/${
          books ? books : 'articles'
        }?page=${page}&subject=${subject}&resourceType=${filterType.toString()}&search=${
          search ? search : query
        }`
        const { data } = await axios.get(url)
        console.log(url)
        setObj(data)
        setIsLoading(false)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }

    getAllMovies()
  }, [books, filterType, page, query, search, subject])

  // const handleChange = async () => {
  //   console.log('awaiting change')
  //   // await queryClient.refetchQueries('publications')
  // }

  return (
    <>
      {isLoading ? (
        <div className='h-screen w-full'>
          <img
            className='h-screen w-full object-contain rounded shadow-lg shadow-blue-300'
            src={loadingImg}
          />
        </div>
      ) : (
        <div className='bg-gray-200 min-h-screen'>
          <div className=''>
            <div className='xs:hidden lg:block'>
              <SideBar
                //onChangee={handleChange}
                filterType={filterType}
                data={obj}
                setFilterType={setFilterType}
                subject={subject}
                setSubject={setSubject}
              />
            </div>
            <div className='xs:w-full lg:w-[76%] lg:ml-[24%]'>
              <TopNav showLogin={showLogin} setShowLogin={setShowLogin} />
              <Hero
                setSearch={setSearch}
                search={search}
                resultsData={obj}
                showLogin={showLogin}
                setShowLogin={setShowLogin}
              />
            </div>
          </div>
          <div
            className='mobile-float-menu xs:block lg:hidden fixed bottom-16 right-[8%] text-[3.5rem] text-blue-500 hover:scale-105 ease-in-out duration-150 cursor-pointer'
            onClick={() => window.my_modal_3.showModal()}
          >
            <div className='py-2 px-2 border-2 border-blue-500 rounded-full relative'>
              <CgMenuRound />
            </div>
            <hr className='border-2 border-blue-500 rotate-[60deg] -translate-y-10' />
          </div>
          <dialog id='my_modal_3' className='modal'>
            <form
              method='dialog'
              className='modal-box h-screen bg-[#2a2155] mt-10'
            >
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white'>
                ✕
              </button>
              <SideBar
                filterType={filterType}
                data={obj}
                setFilterType={setFilterType}
                subject={subject}
                setSubject={setSubject}
              />
            </form>
          </dialog>
        </div>
      )}
    </>
  )
}

export default transition(ResultsPage)
