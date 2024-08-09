import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreatePost from './Components/CreatePost'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  
  QueryClient,
  QueryClientProvider,
  useQuery,
  
} from '@tanstack/react-query'

import FetchPost from './Components/FetchPost'
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import EditData from './Components/EditData'
function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <Router>
      <Routes>
      <Route path='/' element={<FetchPost/>}></Route>
      <Route path='/createpost' element={<CreatePost/>}></Route>
      <Route path='/Edit/:username' element={<EditData/>}></Route>
        </Routes>
        </Router>
      {/* The rest of your application */}
     
      {/* <CreatePost/> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
       
    </>
  )
}

export default App
