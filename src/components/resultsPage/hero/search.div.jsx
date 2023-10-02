/* eslint-disable react/prop-types */

import { useState } from 'react'

const Searchdiv = ({ resultsData, setSearch }) => {
  //console.log(resultsData ? resultsData?.books[0]?.subject : 'no result')
  console.log(resultsData)
  const subjectTitle = resultsData ? resultsData?.books[0]?.subject : ''
  const bookTitle = resultsData ? resultsData?.books[0]?.title : ''
  const bookAuthor = resultsData ? resultsData?.books[0]?.author : ''
  const options = ['Author', 'Title', 'Publication focus']

  // const [title, setTitle] = useState(false)
  // const [author, setAuthor] = useState(false)
  // const [publicationSubject, setPublicationSubject] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Publication')

  const [placeholder, setPlaceholder] = useState(`${subjectTitle}`)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const selectOption = (option) => {
    setSelectedOption(option)
    {
      option === 'Author' && setPlaceholder(`${bookAuthor}`)
    }
    {
      option === 'Title' && setPlaceholder(`${bookTitle}`)
    }
    {
      option === 'Publication focus' && setPlaceholder(`${subjectTitle}`)
    }
    setIsOpen(false)
  }

  return (
    <div className='w-full xs:mb-20 lg:mb-40 bg-white h-32 flex items-center justify-center'>
      <div className='xs:w-[96%] lg:w-[70%] border-2 border-blue-400 rounded-xl shadow-lg pr-2 h-12 flex justify-between items-center'>
        <input
          className='xs:w-[80%] lg:w-[65%] rounded-xl shadow-lg px-2 h-10 bg-transparent placeholder:text-black font-medium relative'
          type='text'
          placeholder={placeholder}
          onChange={({ currentTarget: input }) => setSearch(input.value)}
        />
        <div
          className='dropdown xs:w-32 sm:w-36 lg:w-36 text-xs font-medium border relative'
          id='dropdown'
        >
          <button
            type='button'
            className='bg-gray-100 hover:bg-gray-200 px-4 py-2 w-full h-9 flex items-center justify-between rounded focus:outline-none'
            onClick={toggleDropdown}
          >
            {selectedOption}
            <svg
              className={`ml-2 h-10 w-10 transition-transform duration-200 transform ${
                isOpen ? 'rotate-180' : ''
              }`}
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M6 8l4 4 4-4'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          {isOpen && (
            <div className='absolute z-10 mt-2 bg-white shadow-md rounded w-full'>
              {options.map((option, index) => (
                <button
                  key={index}
                  type='button'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left'
                  onClick={() => {
                    selectOption(option)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Searchdiv
