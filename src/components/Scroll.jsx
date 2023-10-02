import img1 from '../assets/eSage.png'
import img2 from '../assets/Willey.png'
import img3 from '../assets/Karger.png'
import img4 from '../assets/open.png'
import img5 from '../assets/eLife.png'
import img6 from '../assets/emerald.png'
import img7 from '../assets/taylor-1.png'
import './scroll.css'

const Scroll = () => {
  const images = [
    {
      id: 1,
      url: img1,
    },
    {
      id: 2,
      url: img2,
    },
    {
      id: 3,
      url: img3,
    },
    {
      id: 4,
      url: img4,
    },
    {
      id: 5,
      url: img5,
    },
    {
      id: 6,
      url: img6,
    },
    {
      id: 7,
      url: img7,
    },
  ]
  return (
    <div className='logos overflow-hidden xs:mb-16 md:mb-28 bg-gray-200 whitespace-nowrap'>
      <div className='logos-slide flex py-7'>
        {images.map((img) => (
          <div key={img.id} className='w-28 h-14 mr-32'>
            <img
              className='w-full h-full object-contain mr-48'
              src={img.url}
              alt=''
            />
          </div>
        ))}
        {images.map((img) => (
          <div key={img.id} className='w-28 h-14 mr-32'>
            <img
              className='w-full h-full object-contain mr-48'
              src={img.url}
              alt=''
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Scroll
