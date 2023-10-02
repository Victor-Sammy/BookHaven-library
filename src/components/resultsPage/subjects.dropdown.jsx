/* eslint-disable react/prop-types */
import { useState } from 'react'

const SubjectsDropdown = ({ subject, setSubject }) => {
  const inMoreSubjects = localStorage.getItem('moreSubjects')
  const [isShown, setIsShown] = useState(false)

  const toggleDD = () => {
    setIsShown(!isShown)
  }

  const handleUnCheck = () => {
    //setIsChecked(false)
    setSubject([localStorage.getItem('item')])
    console.log(subject)
  }

  const subjectOptions = [
    'Nature-Medicine',
    'The new England Journal of Medicine',
    'Journal of Political Economy',
    'Chemical Reviews',
    'Nature Reviews Genetics',
    'Quarterly Journal of Economics',
    'Diabetes and Vascular Disease Research',
    'Advanced Energy Materials',
    'Advanced Materials',
  ]

  const moreOptions = [
    'Social-Science',
    'Health-and-Medical',
    'Computer-Science',
    'Physics',
    'Earth-Sciences',
    'Chemistry',
    'Arts',
    'Economics',
    'Business',
    'Humanities',
    'Engineering',
    'Life-Sciences',
  ]

  return (
    <div className='subjects dropdown w-full border relative' id='dropdown'>
      <button
        type='button'
        className={`${
          isShown ? 'bg-[#1d1443]' : 'bg-[#4a3d7c]'
        } px-4 py-2 w-full h-20 flex items-center justify-between rounded focus:outline-none`}
        onClick={toggleDD}
      >
        <div className='relative'>
          <span>Subjects</span>
          <span className='absolute -top-1 -right-6 rounded-[50%] w-4 h-4 flex items-center justify-center border-2 border-white text-xs'>
            i
          </span>
        </div>
        <svg
          className={`ml-2 h-5 w-5 transition-transform duration-200 transform ${
            isShown ? 'rotate-180' : ''
          }`}
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path fillRule='evenodd' d='M6 8l4 4 4-4' clipRule='evenodd'></path>
        </svg>
      </button>
      {isShown && (
        <div className='absolute z-10 bg-[#393549] shadow-md rounded w-full'>
          {subjectOptions.map((option, index) => (
            <div
              key={index}
              className='flex items-center h-16 border border-gray-200'
            >
              <input
                type='checkbox'
                className='block px-4 py-2 hover:bg-[393549] w-[15%] text-left'
                value={option}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSubject(option)
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
      {isShown && inMoreSubjects ? (
        <div className='absolute z-10 bg-[#393549] shadow-md rounded w-full'>
          {moreOptions.map((option, index) => (
            <div
              key={index}
              className='flex items-center h-16 border border-gray-200'
            >
              <input
                type='checkbox'
                className='block px-4 py-2 hover:bg-[393549] w-[15%] text-left'
                value={option}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSubject(option)
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
      ) : (
        ''
      )}
    </div>
  )
}

export default SubjectsDropdown
