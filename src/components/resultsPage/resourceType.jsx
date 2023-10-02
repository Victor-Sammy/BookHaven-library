/* eslint-disable react/prop-types */
import { useState } from 'react'
//import { useQueryClient } from '@tanstack/react-query'

const ResourceType = ({
  //onChangee,
  resourceTypes,
  filterType,
  setFilterType,
}) => {
  console.log(resourceTypes)

  const [isOpen, setIsOpen] = useState(false)
  //const [isChecked, setIsChecked] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // const handleCheck = () => {
  //   setIsChecked(true)
  //   setFilterType([input.value])
  //   queryClient.invalidateQueries({ queryKey: ['publications'] })
  //   console.log(filterType)
  // }

  const handleUnCheck = () => {
    //setIsChecked(false)
    setFilterType([])
    console.log(filterType)
  }

  // useEffect(() => {
  //   if (isChecked) {
  //     setFilterType()
  //     queryClient.invalidateQueries({ queryKey: ['publications'] })
  //     console.log(filterType)
  //   } else {
  //     setFilterType([])
  //     queryClient.invalidateQueries({ queryKey: ['publications'] })
  //     //filterType.filter((val) => val !== setFilterType(state))
  //   }
  // })

  //const options = ['Journals', 'Book series']

  return (
    <div className='resourceType dropdown w-full border relative' id='dropdown'>
      <button
        type='button'
        className={`${
          isOpen ? 'bg-[#1d1443]' : 'bg-[#4a3d7c]'
        } px-4 py-2 w-full h-20 flex items-center justify-between rounded focus:outline-none`}
        onClick={toggleDropdown}
      >
        <div className='relative'>
          <span>Resource type</span>
          <span className='absolute -top-1 -right-6 rounded-[50%] w-4 h-4 flex items-center justify-center border-2 border-white text-xs'>
            i
          </span>
        </div>
        <svg
          className={`ml-2 h-5 w-5 transition-transform duration-200 transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path fillRule='evenodd' d='M6 8l4 4 4-4' clipRule='evenodd'></path>
        </svg>
      </button>
      {isOpen && (
        <div className='absolute z-10 bg-[#393549] shadow-md rounded w-full'>
          {resourceTypes?.map((option, index) => (
            <div
              key={index}
              className='flex items-center h-16 border border-gray-200'
            >
              <input
                type='checkbox'
                className='block px-4 py-2 hover:bg-[393549] w-[30%] text-left'
                value={option}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilterType(option)
                    //onChangee()
                    console.log(option)
                  } else {
                    handleUnCheck()
                    //onChangee()
                  }
                }}
              />
              <p>{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResourceType
