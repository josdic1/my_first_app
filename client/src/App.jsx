import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { ProductProvider } from './providers/ProductProvider'
import { UserProvider } from './providers/UserProvider'


function App() {


  return (
    <>
    <UserProvider>
      <ProductProvider>
    <header>
    <NavBar />
    </header>
      <main>
        <Outlet />
      </main>
      </ProductProvider>
      </UserProvider>
    </>
  )
}

export default App
