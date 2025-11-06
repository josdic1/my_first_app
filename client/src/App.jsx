import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { AppProvider } from './providers/AppProvider'



function App() {


  return (
    <>
    <AppProvider>
    <header>
    <NavBar />
    </header>
      <main>
        <Outlet />
      </main>
      </AppProvider>
    </>
  )
}

export default App
