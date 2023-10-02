import { useEffect } from 'react'
import ArtsComponent from './arts.component'
import BusinessComponent from './business.comp'
import ChemistryComponent from './chemistry.comp'
import ComputerComponent from './computer.comp'
import EarthComponent from './earth.science'
import EconomicsComponent from './economics.comp'
import EngineeringComponent from './engineering.comp'
import HealthComponent from './health.component'
import HumanitiesComponent from './humanities.comp'
import LifeScienceComponent from './life.science.comp'
import PhysicsComponent from './physics.comp'
import SocialComponent from './social.component'
import { useNavigate } from 'react-router-dom'

const Subjects = () => {
  useEffect(() => {
    localStorage.setItem('moreSubjects', 'more-subjects')
  }, [])
  const navigate = useNavigate()
  return (
    <div className='xs:w-[96%] xs:mx-[2%] md:w-[86%] md:mx-[7%] xl:w-[68%] xl:mx-[16%] mb-14'>
      <h1 className='text-center xs:text-[1.3rem] md:text-[2.1rem] text-gray-600 xs:font-semibold md:font-bold xs:mb-3 md:mb-10'>
        Broaden your research
      </h1>
      <div className='w-full grid xs:grid-cols-3 md:grid-cols-3 xl:grid-cols-6'>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Social-Science')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <SocialComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Health-and-Medical')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <HealthComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Computer-Science')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <ComputerComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Physics')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <PhysicsComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Earth-Sciences')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <EarthComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Chemistry')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <ChemistryComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Arts')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <ArtsComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Economics')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <EconomicsComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Business')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <BusinessComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Humanities')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <HumanitiesComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Engineering')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <EngineeringComponent />
        </div>
        <div
          onClick={() => {
            localStorage.setItem('major', 'Life-Sciences')
            localStorage.setItem('resource', 'books')
            navigate('/resultsPage')
          }}
        >
          <LifeScienceComponent />
        </div>
      </div>
    </div>
  )
}

export default Subjects
