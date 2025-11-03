import { useState, useEffect, useMemo } from "react";
import { RecipeContext } from "../contexts/RecipeContext";

export function RecipeProvider({children}) {
    const [ categories, setCategories ] = useState([])
    
    useEffect(() => {
        fetchAllCategories()
    }, [])

    const fetchAllCategories = () => {
        fetch('http://localhost:5555/categories/all')
        .then(r => r.json())
        .then(data => {
            setCategories(data)
        })
    }

const createCategory = async (category) => {
    const response = await fetch('http://localhost:5555/categories/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(category)
    });
    
    const data = await response.json();
    
    if (response.ok) {
        setCategories(prev => [...prev, data])
        return { success: true, data: data }; 
    } else {
        return { success: false, error: data.error };
    }
}

    const createProduct = async (product) => {
        const response = await fetch('http://localhost:5555/products/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(product)
        });
        
        const data = await response.json();
        
        if (response.ok) {
                   return { success: true, data: data };
        } else {
            return { success: false, error: data.error };
        }
    }

    const updateProduct = async (product) => {
        const response = await fetch(`http://localhost:5555/products/${product.id}/edit`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(product)
        });
        
        const data = await response.json();
        
        if (response.ok) {
                    return { success: true, data: data };
        } else {
            return { success: false, error: data.error };
        }
    }

    const deleteProduct = async (id) => {
        const response = await fetch(`http://localhost:5555/products/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, error: data.error };
        }
    }


    const value = useMemo(() => ({
        categories,
        fetchAllCategories,
        createCategory,
        createProduct,
        updateProduct,
        deleteProduct
    }), [categories])

    return (
        <RecipeContext.Provider 
        value={value}>{children}
        </RecipeContext.Provider>
    )
}