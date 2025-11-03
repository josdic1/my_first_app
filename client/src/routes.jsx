import App from './App'
import {CategoryFormNew} from './components/CategoryFormNew'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProductFormNew } from './components/ProductFormNew'
import { ProductFormEdit } from './components/ProductFormEdit'
import { ProductPage } from './pages/ProductPage'

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage/>
      },
      {
        path: '/products/new',
        element: <ProductFormNew/>
      },
            {
        path: '/products/:id/edit',
        element: <ProductFormEdit/>
      },
                {
        path: '/products/:id',
        element: <ProductPage/>
      },
                  {
        path: '/categories/new',
        element: <CategoryFormNew />
      }
    ]
  }
]

export default routes