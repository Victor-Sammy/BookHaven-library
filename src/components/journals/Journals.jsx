import { useEffect, useRef, useState } from 'react'
import './journals.css'
import Image1 from '../../assets/nature-med.jpg'
import Image2 from '../../assets/new-medicine.jpg'
import Image3 from '../../assets/political.jpg'
import Image4 from '../../assets/chemical-rev.jpg'
import Image5 from '../../assets/genetics.jpg'
import Image6 from '../../assets/ecom.jpg'
import Image7 from '../../assets/disease.jpg'
import Image8 from '../../assets/adv-energy.jpg'
import Image9 from '../../assets/adv-materials.jpg'
import { MdChevronLeft } from 'react-icons/md'
import { MdChevronRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
const Journals = ({ isActive }) => {
  const scrollRef = useRef()
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    console.log(clickCount)
  })

  const imageSlide = [
    {
      id: 1,
      img: Image1,
      major: 'Nature Medicine',
      date: 'Aug 2022',
    },
    {
      id: 2,
      img: Image2,
      major: 'The new England Journal of Medicine',
      date: 'Sept 2022',
    },
    {
      id: 3,
      img: Image3,
      major: 'Journal of Political Economy',
      date: 'Sept 2022',
    },
    {
      id: 4,
      img: Image4,
      major: 'Chemical Reviews',
      date: 'Aug 2022',
    },
    {
      id: 5,
      img: Image5,
      major: 'Nature Reviews Genetics',
      date: 'Sept 2022',
    },
    {
      id: 6,
      img: Image6,
      major: 'Quarterly Journal of Economics',
      date: 'Aug 2022',
    },
    {
      id: 7,
      img: Image7,
      major: 'Diabetes and Vascular Disease Research',
      date: 'Jul 2022',
    },
    {
      id: 8,
      img: Image8,
      major: 'Advanced Energy Materials',
      date: 'Sept 2022',
    },
    {
      id: 9,
      img: Image9,
      major: 'Advanced Materials',
      date: 'Sept 2022',
    },
  ]

  const slideLt = () => {
    var slider = scrollRef.current
    slider.scrollLeft = slider.scrollLeft - 230
    console.log(slider.scrollLeft)
    setClickCount(clickCount - 1)
    slider.scrollLeft === 0 ? setClickCount(0) : ''
    if (window.innerWidth >= 1900) {
      slider.scrollLeft >= 220 && slider.scrollLeft <= 235
        ? setClickCount(0)
        : ''
    }
  }
  const slideRt = () => {
    var slider = scrollRef.current
    slider.scrollLeft = slider.scrollLeft + 230
    console.log(slider.scrollLeft)
    setClickCount(clickCount + 1)
    slider.scrollLeft === 920 ? setClickCount(5) : ''
    if (window.innerWidth >= 1900) {
      slider.scrollLeft === 460 ? setClickCount(5) : ''
    }
  }

  return (
    <div className={`${isActive ? 'xs:pt-[40rem] md:pt-0' : ''}`}>
      <h1 className='mt-20 text-center xs:text-xl md:text-[2.3rem] font-bold text-gray-600'>
        Discover with Book Haven
      </h1>
      <p className='text-center xs:text-xs md:text-2xl mb-10 font-medium'>
        Browse academic journals from all major disciplines
      </p>
      <div className='journal-wrap relative mb-8'>
        <div className='journal-scroll text-[5rem] text-gray-300 cursor-pointer'>
          <div
            className={`${
              clickCount === 0
                ? 'hidden'
                : `xs:hidden md:block left-arrw absolute md:left-1 lg:left-[12%] top-20 hover:text-gray-400 ease-in-out duration-200`
            }`}
            onClick={slideLt}
          >
            <MdChevronLeft />
          </div>
          <div
            className={`${
              clickCount === 5
                ? 'hidden'
                : `xs:hidden md:block right-arrw absolute md:right-1 lg:right-[12%] top-20 hover:text-gray-400 ease-in-out duration-200`
            }`}
            onClick={slideRt}
          >
            <MdChevronRight />
          </div>
        </div>
        <div
          className='flex items-center h-64 overflow-x-scroll md:w-[86%] lg:w-[68%] md:ml-[7%] lg:ml-[16%] scroll-smooth xs:px-3 md:px-0'
          ref={scrollRef}
        >
          {imageSlide.map((item) => (
            <NavLink key={item.id} to='/resultsPage'>
              <div
                className='card h-auto xs:mr-2 md:mr-5 rounded-lg shadow-lg shadow-gray-300 cursor-pointer hover:scale-105 ease-in-out duration-300'
                key={item.id}
                onClick={() => {
                  localStorage.setItem('major', item.major)
                }}
              >
                <div className='xs:w-[170px] md:w-[200px] relative'>
                  <img
                    className='xs:w-[170px] md:w-[200px] xs:h-56 md:h-60 rounded-lg'
                    src={item.img}
                    alt=''
                  />
                  <div className='absolute bottom-0 h-auto'>
                    <div className='details xs:w-[170px] md:w-[200px] bg-gray-200 xs:text-[.65rem] md:text-xs font-bold h-14 opacity-90 px-3 py-1'>
                      <h1 className='text-black'>{item.major}</h1>
                      <h1 className='text-gray-600'>{item.date}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Journals
