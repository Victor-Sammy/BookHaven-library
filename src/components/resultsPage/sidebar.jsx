/* eslint-disable react/prop-types */
//import { useState } from 'react'

import ResourceType from './resourceType'
import SubjectsDropdown from './subjects.dropdown'

const SideBar = ({ data, filterType, setFilterType, subject, setSubject }) => {
  console.log(filterType)
  return (
    <section className='lg:w-[24%] bg-[#2a2155] h-screen fixed text-white px-2'>
      <h1 className='text-center font-medium mt-10 mb-20'>Refine results</h1>
      <ResourceType
        //onChangee={onChangee}
        filterType={filterType}
        resourceTypes={data?.resourceType ? data?.resourceType : []}
        setFilterType={setFilterType}
      />
      <SubjectsDropdown
        subject={subject}
        setSubject={setSubject}
        subjects={data?.subject ? data?.subject : []}
      />
    </section>
  )
}

export default SideBar
