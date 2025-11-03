import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { RecipeContext } from "../contexts/RecipeContext"
import { UserContext } from "../contexts/UserContext"

export function CategoryItem({ product }) {
  const { deleteProduct } = useContext(RecipeContext)
    const { refreshUser } = useContext(UserContext)
    const navigate = useNavigate()

  const onClick = (e) => {
    const { name } = e.target
    switch(name) {
      case 'view':
        navigate(`/products/${product.id}`)
        break;
      case 'edit':
        navigate(`/products/${product.id}/edit`)
        break;
      case 'delete':
        deleteProduct(product.id)
          .then(() => refreshUser())  
          .then(() => navigate(`/`))  
        break;
      default:
        break   
    }  
  }  
 
return (
<>
      <li>
      <span className="product-name">{product.name}</span>
      <div className="button-group">
        <button type='button' name='view' onClick={onClick}>View</button>
        <button type='button' name='edit' onClick={onClick}>Edit</button>
        <button type='button' name='delete' onClick={onClick}>Delete</button>
      </div>
    </li>
</>
)}
