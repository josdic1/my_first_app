
import { useNavigate } from "react-router-dom"
import {useProduct} from "../hooks/useProduct"


export function CategoryItem({ product }) {
  const { deleteProduct } = useProduct()

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
