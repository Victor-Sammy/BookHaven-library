import { BsGithub, BsLinkedin } from 'react-icons/bs'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer w-full flex flex-col bg-gray-800 xs:px-5 md:px-2 2xl:px-20 xs:py-10 md:py-28 xs:h-auto md:h-[500px] rounded-t-[2.5rem]'>
      <div className='footer-features w-full flex text-gray-200 mb-10'>
        <section className='section md:mr-[1rem] lg:mr-[1.5rem] xl:mr-[10rem] xs:w-[120px] xl:w-[120px] 2xl:mr-[15rem]'>
          <h1>Haven</h1>
          <hr />
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Publisher Partners</li>
            <li>Contact Us</li>
          </ul>
        </section>
        <section className='section md:mr-[1rem] lg:mr-[1.5rem] xl:mr-[10rem] xs:w-[120px] xl:w-[120px] 2xl:mr-[15rem]'>
          <h1>Learn</h1>
          <hr />
          <ul>
            <li>FAQs</li>
            <li>Blog</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </section>
        <section className='section md:mr-[1rem] lg:mr-[1.5rem] xl:mr-[10rem] xs:w-[120px] xl:w-[120px] 2xl:mr-[15rem]'>
          <h1>Discover</h1>
          <hr />
          <ul>
            <li>Journals</li>
            <li>Proceedings</li>
            <li>Books</li>
          </ul>
        </section>
        <section className='section xs:absolute md:relative top-0 right-0 xs:w-[150px] md:w-[500px] 2xl:w-[550px]'>
          <h1>Explore</h1>
          <hr />
          <div className='flex xs:flex-col md:flex-row gap-10'>
            <ul>
              <li>Health & Medical</li>
              <li>Physics & Mathematics</li>
              <li>Chemical, Material, & Earth Science</li>
            </ul>
            <ul>
              <li>Business And Economics</li>
              <li>Arts, Humanities, & Social Sciences</li>
              <li>Engineering & Computer Science</li>
              <li>Life Science</li>
            </ul>
          </div>
        </section>
        <section className='flex flex-col gap-5 md:pt-[10%] 2xl:pt-[7%] text-2xl pl-5 xs:absolute md:relative bottom-0 right-0'>
          <div>
            <BsGithub />
          </div>
          <div>
            <BsLinkedin />
          </div>
        </section>
      </div>
      <hr className='border border-blue-400 w-[76%] ml-[12%] mb-0' />
      <p className='w-full text-white justify-center'>
        Copyright Knowledge E © 2023. All Rights Reserved.{' '}
      </p>
    </div>
  )
}

export default Footer
