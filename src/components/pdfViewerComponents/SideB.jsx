import { BsShareFill } from 'react-icons/bs'
import { TbListDetails } from 'react-icons/tb'
import { GoChevronDown } from 'react-icons/go'
import { GoChevronUp } from 'react-icons/go'
import { CiExport } from 'react-icons/ci'
import { useState } from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

/* eslint-disable react/prop-types */
const SideB = ({ book }) => {
  console.log(book)
  const [enlarge, setEnlarge] = useState(false)
  const [showSocials, setShowSocials] = useState(false)

  const handleShowSocials = () => {
    setShowSocials(!showSocials)
  }
  return (
    <div className='w-full bg-gray-100 h-auto'>
      <div className='bg-white mx-3 py-4 px-2'>
        <div className='flex items-center justify-between mb-4 relative'>
          <h1 className='text-[.9rem] font-bold'>{book?.title}</h1>
          <div
            className='shareBtn text-blue-400 text-xl hover:text-2xl px-1 py-1 rounded-[50%] shadow-md cursor-pointer relative'
            onClick={handleShowSocials}
          >
            <BsShareFill />
          </div>
          <div
            className={`${
              showSocials ? 'shareActionBTNs absolute top-10 right-0' : 'hidden'
            }`}
          >
            <div className='share-btns flex flex-col gap-1'>
              <FacebookShareButton>
                <FacebookIcon size={28} />
              </FacebookShareButton>
              <TwitterShareButton url='www.twitter.com'>
                <TwitterIcon size={28} />
              </TwitterShareButton>
              <LinkedinShareButton url=''>
                <LinkedinIcon size={28} />
              </LinkedinShareButton>
            </div>
          </div>
        </div>
        <div className='book-details-top flex items-center justify-between'>
          <span className='flex items-center gap-2 mb-3'>
            <div>
              <TbListDetails />
            </div>
            <h1>Details</h1>
          </span>
          <span>
            <div
              onClick={() => setEnlarge(true)}
              className={`${enlarge ? 'hidden' : 'block'} cursor-pointer`}
            >
              <GoChevronDown />
            </div>
            <div
              onClick={() => setEnlarge(false)}
              className={`${enlarge ? 'block' : 'hidden'} cursor-pointer`}
            >
              <GoChevronUp />
            </div>
          </span>
        </div>
        <hr className='border-[1px] border-blue-300' />
        <div
          className={`${
            enlarge ? 'book-details py-2 font-bold text-sm leading-8' : 'hidden'
          }`}
        >
          <p>
            Publication year <span className='font-medium'>- {book?.year}</span>
          </p>
          <p>
            Publication title{' '}
            <span className='font-medium'>- {book?.subject}</span>
          </p>
          <p>
            Resource type{' '}
            <span className='font-medium'>- {book?.resourceType}</span>
          </p>
          <div className='action-buttons flex items-center justify-between font-medium mt-5'>
            <button className='flex items-center gap-2 px-2 py-1 border-2 border-gray-400 rounded-lg'>
              <span>
                <CiExport />
              </span>
              Export
            </button>
            <button className='text-3xl px-2 py-1 border-2 border-gray-400 rounded-lg'>
              <FiThumbsUp />
            </button>
            <button className='px-2 py-1 border-2 border-gray-400 rounded-lg'>
              Add to list
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideB
