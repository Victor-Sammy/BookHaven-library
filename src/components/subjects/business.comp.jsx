import businessImg from '../../assets/bussiness.png'
import businessGif from '../../assets/business.gif'
import './subject.css'
import { useState } from 'react'

const BusinessComponent = () => {
  const [isHovering, setIsHovering] = useState(false)

  const handleHover = () => {
    setIsHovering(!isHovering)
  }
  return (
    <div
      className='subject xs:w-[90%] xs:mx-[5%] md:w-[70%] md:mx-[15%] xl:w-[90%] xl:mx-[5%] xs:h-28 md:h-44 border border-gray-300 flex flex-col items-center justify-center mb-8 rounded-xl cursor-pointer hover:scale-105 ease-in-out duration-300 hover:bg-gray-100'
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <img
        className={`${
          isHovering ? 'xs:w-full' : 'xs:w-14 md:w-16 xs:mb-2 md:mb-5'
        }`}
        src={isHovering ? businessGif : businessImg}
        alt=''
      />
      <h1
        className={`${isHovering ? 'hidden' : 'xs:text-xs md:text-base block'}`}
      >
        Business
      </h1>
    </div>
  )
}

export default BusinessComponent
