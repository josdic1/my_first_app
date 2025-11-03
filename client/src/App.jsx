import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { RecipeProvider } from './providers/RecipeProvider'
import { UserProvider } from './providers/UserProvider'


function App() {


  return (
    <>
    <UserProvider>
      <RecipeProvider>
    <header>
    <NavBar />
    </header>
      <main>
        <Outlet />
      </main>
      </RecipeProvider>
      </UserProvider>
    </>
  )
}

export default App
