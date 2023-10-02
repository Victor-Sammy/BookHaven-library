/* eslint-disable react-refresh/only-export-components */
import logo from '../../assets/lib-logo2.png'
import imgContactUs from '../../assets/laptop-coffee.jpg'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import transition from '../../transition'

const ContactUs = () => {
  const form = useRef()
  const navigate = useNavigate()
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_k48jfdb',
        'template_g2sgw0n',
        form.current,
        'KQ1-msPPVIAPxD84b'
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  return (
    <div className='bg-blue-100 min-h-screen'>
      <div className='contact-header bg-white pl-[2%] xl:pl-[5%] py-[2%]'>
        <img
          className='xs:w-[30%] md:w-[20%] lg:w-[12%] cursor-pointer'
          src={logo}
          alt=''
          onClick={() => navigate('/')}
        />
      </div>
      <section className='mt-[5%] xs:mx-[3%] md:mx-[8%] flex xs:flex-col lg:flex-row justify-between xl:px-[10%]'>
        <div className='form-info-div xs:w-full lg:w-[42%]'>
          <h1 className='text-[1.9rem] font-bold mb-2'>Contact us</h1>
          <hr className='w-[15%] border-[3px] border-blue-400 mb-6' />
          <p className='text-lg font-medium'>
            Have questions or need support? We are here to help!
          </p>
          <p className='text-lg font-medium mb-6'>
            Call +234 7064639364 or complete the form below and we will get in
            touch.
          </p>
          <form onSubmit={sendEmail} ref={form}>
            <div className='mb-6 w-full'>
              <span className='w-[47%]'>
                <p className='mb-1 font-bold'>
                  Full name <span>*</span>
                </p>
                <input
                  className='border-[1px] border-gray-400 w-full h-9 rounded bg-transparent'
                  type='text'
                  name='user_name'
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </span>
            </div>
            <div className='w-full mb-6'>
              <p className='mb-1 font-bold'>
                Email address <span>*</span>
              </p>
              <input
                className='border-[1px] border-gray-400 w-full h-9 rounded bg-transparent'
                type='email'
                name='user_email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <p className='mb-1 font-bold'>
                Mobile number <span>*</span>
              </p>
              <PhoneInput
                inputStyle={{
                  border: '1px solid #9ca3af',
                  width: '100%',
                  background: 'transparent',
                }}
                country={'us'}
                value={phone}
                onChange={(value) => setPhone(value)}
              />
              <input type='hidden' name='user_number' value={phone} />
            </div>
            <div className='mb-6'>
              <p className='mb-1 font-bold'>
                Message <span>*</span>
              </p>
              <textarea
                className='border-[1px] border-gray-400 w-full rounded bg-transparent'
                name='message'
                id=''
                rows='7'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button
              className='bg-black text-white py-3 w-[60%] font-bold text-lg ml-[20%]'
              onClick={() => document.getElementById('my_modal_5').showModal()}
            >
              Send message
            </button>
          </form>
        </div>
        <div className='xs:w-full xs lg:w-[42%] mb-20'>
          <div className='h-48 xs:w-[80%] xs:ml-[10%] sm:w-[60%] sm:ml-[20%] lg:ml-0 mt-60'>
            <img
              className='h-full w-full object-cover'
              src={imgContactUs}
              alt=''
            />
          </div>
        </div>
        <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
          <div className='modal-box'>
            <p className='font-bold text-xl text-blue-400'>
              Thank you for contacting us!
            </p>
            <div className='modal-action'>
              <form method='dialog'>
                {/* if there is a button in form, it will close the modal */}
                <button className='btn' onClick={() => navigate('/')}>
                  Ok
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </section>
    </div>
  )
}

export default transition(ContactUs)
