import React from 'react'
import { BrowserRouter,Link , Route ,Routes} 
from 'react-router-dom' ;
import { logo } from './assets';
import {Home, CreatePost} from './pages';

const App = () => {
  return (
    <BrowserRouter>
    <header className='w-full flex justify-between 
    item-center bg-gray-200 sm:px-8 px-4 py-4 border-b
    border-b-[#e6ebf4]'>
      <Link to="/">
        <img  src={logo} alt="logo" 
        className='w-36 object-contain px-5 py-3'/>
      </Link>

      <Link to="/create-post" 
      className='font-inter font-medium 
      bg-[#6469ff] text-white px-5 py-3
      rounded-md'>
      Create
      </Link>
    </header>
    <main className='sm:p-8 px-4 py-8
    w-full bg-[#ffffff] min-h-[calc
    (100vh-73px)]'>
      <Routes>
        <Route path='/' element={<CreatePost />} />
        <Route path='/create-post' element={<CreatePost />} />
      </Routes>

    </main>
    </BrowserRouter>
  )
}

export default App