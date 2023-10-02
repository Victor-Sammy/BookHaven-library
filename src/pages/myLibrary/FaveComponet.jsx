/* eslint-disable react/prop-types */
import { useState } from 'react'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { rootAPI } from '../../components/api/root-api'
import { BiDownload } from 'react-icons/bi'
import LoadingSpinner from '../../components/vectors/LoadingSpinner'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { BsShareFill } from 'react-icons/bs'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

function FaveComponent({ book }) {
  const [loading, setLoading] = useState(false)
  const [showSocials, setShowSocials] = useState(false)
  const queryClient = useQueryClient()

  const handleShowSocials = () => {
    setShowSocials(!showSocials)
  }

  return (
    <div className='relative'>
      <div className='text-blue-400 font-bold mb-8 w-full flex items-center justify-between'>
        <span>{book.title}</span>
        <span
          className='rounded-[50%] shadow-md border border-gray-200 py-2 px-2
        hover:text-2xl cursor-pointer'
          onClick={handleShowSocials}
        >
          <BsShareFill />
        </span>
      </div>
      <div
        className={`${
          showSocials ? 'shareActionBtns absolute top-12 right-0' : 'hidden'
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
      <div className='other-details sm:w-[70%] lg:w-[50%]'>
        <span className='w-[100%] flex items-center justify-between gap-[20%] text-sm mb-2'>
          <p>Author(s)</p>
          <h1 className='font-bold'>{book.author}</h1>
        </span>
        <span className='w-[100%] flex items-center justify-between gap-[20%] text-sm mb-2'>
          <p>Publication year</p>
          <h1 className='font-bold'>{book.year}</h1>
        </span>
        <span className='w-[100%] flex items-center justify-between gap-[20%] text-sm mb-2'>
          <p>Publication focus</p>
          <h1 className='font-bold'>{book.subject}</h1>
        </span>
        <span className='w-[100%] flex items-center justify-between gap-[20%] text-sm mb-2'>
          <p>Resource type</p>
          <h1 className='font-bold'>{book.resourceType}</h1>
        </span>
      </div>
      <div className='action-buttons flex justify-between mt-10'>
        <div className='w-[40%] flex justify-between'>
          <button
            className='bg-blue-400 text-white py-2 px-3 rounded-lg'
            onClick={() => {
              window.open('/pdfPage')
              localStorage.setItem('book-id', book._id)
              localStorage.setItem('book-modelName', book.modelName)
            }}
          >
            View PDF
          </button>
          <button
            key={book._id}
            className='border rounded-lg px-3 py-2'
            onClick={() => {
              axios
                .get(`${rootAPI}/${book._id}/${book.modelName}/download`)
                .then((res) => res.data)
                .then((base64Data) => {
                  const blob = b64toBlob(base64Data, 'application/pdf')
                  const url = window.URL.createObjectURL(blob)
                  const link = document.createElement('a')
                  link.href = url
                  link.setAttribute('download', `${book.title}.pdf`)
                  document.body.appendChild(link)
                  link.click()
                  link.parentNode.removeChild(link)
                })
                .catch((error) => {
                  console.error('Error downloading PDF:', error)
                })

              function b64toBlob(base64, contentType = '', sliceSize = 512) {
                const byteCharacters = atob(base64)
                const byteArrays = []

                for (
                  let offset = 0;
                  offset < byteCharacters.length;
                  offset += sliceSize
                ) {
                  const slice = byteCharacters.slice(offset, offset + sliceSize)

                  const byteNumbers = new Array(slice.length)
                  for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i)
                  }

                  const byteArray = new Uint8Array(byteNumbers)
                  byteArrays.push(byteArray)
                }

                return new Blob(byteArrays, { type: contentType })
              }
            }}
          >
            <BiDownload />
          </button>
        </div>
        <div className='flex gap-5 justify-between'>
          <button
            key={book._id}
            className='hover:bg-blue-400 hover:text-white font-medium border rounded-lg px-3 py-2'
            onClick={() => {
              try {
                setLoading(true)
                axios.delete(`${rootAPI}/library/${book._id}/`).then((res) => {
                  console.log(res.data)
                  setLoading(false)
                  enqueueSnackbar('Removed from my Library favorites!', {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'right',
                    },
                    variant: 'success',
                  })
                  queryClient.invalidateQueries('favourites')
                })
              } catch (error) {
                console.log('error :', error)
              }
            }}
          >
            <p className='flex items-center gap-3'>
              <span>{loading ? <LoadingSpinner /> : ''}</span>Remove from
              Favourites
            </p>
          </button>
        </div>
      </div>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant='success'
      />
    </div>
  )
}

export default FaveComponent
