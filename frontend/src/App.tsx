import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

import Authenticated from './auth/Authenticated'
import Login from './login/Login'
import MainLayout from './layout/MainLayout'

export default function App() {
  return (
    <MantineProvider defaultColorScheme='dark'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login' 
            element={<Login />}
          />
          <Route
            path='/'
            element={
                <MainLayout />
            }
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}
