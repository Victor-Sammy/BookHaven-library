import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ResultsPage from './pages/resultsPage'
import PdfViewer from './pages/pdfView/PdfViewer'
import Profile from './pages/profile/Profile'
import MyLibrary from './pages/myLibrary/MyLibrary'
import ContactUs from './pages/contact/ContactUs'
import { AnimatePresence } from 'framer-motion'

function App() {
  return (
    <>
      <div className='scroll-smooth'>
        <AnimatePresence mode='wait'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/library' element={<MyLibrary />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/resultsPage' element={<ResultsPage />} />
            <Route path='/pdfPage' element={<PdfViewer />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  )
}

export default App
