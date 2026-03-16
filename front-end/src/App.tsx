


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './pages/Account';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import Navbar from './components/layout/Navbar';

function App() {
  

  return (
    <>
      <BrowserRouter>
      <div className='min-h-screen flex flex-col'>
        <main className='flex-1'>
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/:pathname" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/account/:pathname" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        </main>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
