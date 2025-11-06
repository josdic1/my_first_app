import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useApp } from "../hooks/useApp"

export function ProductPage() {
    const { userCategories, deleteProduct } = useApp()
    const [selectedProduct, setSelectedProduct] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()
    
    useEffect(() => {
        if (userCategories && userCategories.length > 0) {
            fetchProduct()
        } 
    }, [id, userCategories])
    
    function fetchProduct() {
        const productMatch = userCategories.flatMap(cat => cat.products || []).find(product => product.id === parseInt(id))
        setSelectedProduct(productMatch)
    }

    if (!selectedProduct) {
        return <div>Loading...</div>    
    }

    return (
        <div>
            <h1>Product Page</h1>
            <h2>{selectedProduct.name}</h2>
            <p>Category ID: {selectedProduct.category_id}</p>
            <div className="button-group">
                <button onClick={() => navigate(`/products/${id}/edit`)}>Edit</button>
                <button onClick={() => { 
                    deleteProduct(id).then(() => navigate('/'))
                }}>Delete</button>
            </div>
        </div>
    )
}