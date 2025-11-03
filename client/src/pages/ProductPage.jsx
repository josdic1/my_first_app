import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useUser } from "../hooks/useUser";
import { RecipeContext } from "../contexts/RecipeContext";

export function ProductPage() {
    const { user, refreshUser } = useUser()
    const { updateProduct, deleteProduct } = useContext(RecipeContext)
    const [ selectedProduct, setSelectedProduct ] = useState(null)

    const navigate = useNavigate()
   const { id } = useParams()
    
    useEffect(() => {
        fetchProduct()
    }, [id])
    
    function fetchProduct() {
     const productMatch = user?.categories.flatMap(cat => cat.products || []).find(product => product.id === parseInt(id))
     setSelectedProduct(productMatch)
    }

    return (
        <div>
            <h1>Product Page</h1>
            <h2>{selectedProduct?.name}</h2>
            <p>{selectedProduct?.category_id}</p>
            <div className="button-group">
                <button onClick={() => navigate(`/products/${id}/edit`)}>Edit</button>
                <button onClick={() => { deleteProduct(id).then(() => refreshUser()).then(() => navigate(`/`)) }}>Delete</button>
            </div>
        </div>
    )
}