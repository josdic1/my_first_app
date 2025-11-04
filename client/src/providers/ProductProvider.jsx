import { useState, useEffect, useMemo, useRef } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useUser } from "../hooks/useUser";

export function ProductProvider({children}) {
    const { user } = useUser()
    const [allCategories, setAllCategories] = useState([])
    const [userCategories, setUserCategories] = useState([])
    const initialized = useRef(false)
    
    // Initialize userCategories ONLY ONCE from user
useEffect(() => {
    if (user?.categories && !initialized.current) {
        setUserCategories(user.categories)
        initialized.current = true
    }
    // Reset if user logs out
    if (!user) {
        initialized.current = false
        setUserCategories([])
    }
}, [user])

    // Fetch all categories once
    useEffect(() => {
        fetch('http://localhost:5555/categories')
        .then(r => r.json())
        .then(data => setAllCategories(data))
    }, [])

    const createCategory = async (category) => {
        const response = await fetch('http://localhost:5555/categories/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(category)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            setAllCategories(prev => [...prev, data])
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
            setUserCategories(prev => {
                const categoryExists = prev.some(cat => cat.id === data.category_id)
                
                if (categoryExists) {
                    return prev.map(cat => 
                        cat.id === data.category_id 
                            ? { ...cat, products: [...(cat.products || []), data] }
                            : cat
                    )
                } else {
                    const newCategory = allCategories.find(c => c.id === data.category_id)
                    if (newCategory) {
                        return [...prev, {
                            id: newCategory.id,
                            name: newCategory.name,
                            products: [data]
                        }]
                    }
                    return prev
                }
            })
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
        setUserCategories(prev => {
            // Step 1: Remove product from all categories
            let updated = prev.map(cat => ({
                ...cat,
                products: cat.products.filter(p => p.id !== product.id)
            }))
            
            // Step 2: Find if the target category exists
            const targetCategory = updated.find(cat => cat.id === data.category_id)
            
            if (targetCategory) {
                // Category exists - add product to it
                updated = updated.map(cat => 
                    cat.id === data.category_id
                        ? { ...cat, products: [...cat.products, data] }
                        : cat
                )
            } else {
                // Category doesn't exist - create it
                const newCategory = allCategories.find(c => c.id === data.category_id)
                if (newCategory) {
                    updated = [...updated, {
                        id: newCategory.id,
                        name: newCategory.name,
                        products: [data]
                    }]
                }
            }
            
            // Step 3: Remove empty categories
            return updated.filter(cat => cat.products.length > 0)
        })
        
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
    
    if (response.ok) {
        setUserCategories(prev => 
            prev.map(cat => ({
                ...cat,
                products: cat.products.filter(p => p.id !== parseInt(id))
            }))
            .filter(cat => cat.products.length > 0)  
        )
        return { success: true };
    } else {
        const data = await response.json();
        return { success: false, error: data.error };
    }
}

    const value = useMemo(() => ({
        allCategories,
        userCategories,
        createCategory,
        createProduct,
        updateProduct,
        deleteProduct
    }), [allCategories, userCategories])

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}