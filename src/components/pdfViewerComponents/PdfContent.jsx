/* eslint-disable react/prop-types */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { rootAPI } from '../api/root-api'
import SideB from './SideB'

const PdfContent = ({ book }) => {
  console.log(book?.modelName)
  const [loading, setLoading] = useState(true)
  const [bookContent, setBookContent] = useState([])

  useEffect(() => {
    const id = localStorage.getItem('book-id')

    axios
      .get(`${rootAPI}/${id}/${book.modelName}/pdf`)
      .then((response) => {
        console.log(response.data)
        setBookContent(response.data)
        setLoading(false)
      })
      .catch((error) => console.error('Error fetching PDF:', error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  {
    loading ? <p>Loading...</p> : ''
  }

  return (
    <section className='w-full'>
      <div className='bg-gray-700 h-auto w-full flex justify-end pt-24 pr-5'>
        <button
          className='bg-blue-400 hover:bg-blue-500 ease-in-out duration-150 xs:text-[.7rem] md:text-sm px-3 py-2 rounded-lg -translate-y-2 text-white'
          onClick={() => window.my_modal_1.showModal()}
        >
          more details
        </button>
      </div>
      {/* Open the modal using ID.showModal() method */}
      <dialog id='my_modal_1' className='modal'>
        <form method='dialog' className='modal-box'>
          <SideB book={book} />
          <div className='modal-action'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn'>Close</button>
          </div>
        </form>
      </dialog>
      <div className='book-content h-screen'>
        {bookContent && (
          <object
            data={`data:application/pdf;base64,${bookContent}`}
            type='application/pdf'
            width='100%'
            className='h-screen'
          >
            Your browser does not support PDFs. Please download the PDF to view
            it.
          </object>
        )}
      </div>
    </section>
  )
}

export default PdfContent
