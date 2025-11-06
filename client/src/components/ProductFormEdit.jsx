import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useApp } from "../hooks/useApp"
import { CategoryFormNew } from "./CategoryFormNew"
import { Modal } from "./Modal"
import { useFormikForm } from "../hooks/useFormikForm"
import { productSchema } from "../validators/productValidation"

export function ProductFormEdit() {
    const { allCategories, userCategories, updateProduct } = useApp()  
    const [showModal, setShowModal] = useState(false)
    const [justCreated, setJustCreated] = useState(null) 
    const { id } = useParams()
    const navigate = useNavigate()

    const form = useFormikForm({
        initialValues: {
            id: '',
            name: '',
            category_id: '',
            user_id: ''
        },
        validationSchema: productSchema,
        onSubmit: async (values) => {
            const result = await updateProduct(values)
            
            if (result.error) {
                alert(result.error)
            } else {
                form.resetForm()
                navigate('/')
            }
        }
    })

    // Load product data
    useEffect(() => {
        if (userCategories && userCategories.length > 0 && id) {
            const allProducts = userCategories.flatMap(cat => cat.products || [])
            const selectedProduct = allProducts.find(product => product.id === parseInt(id))
            
            if (selectedProduct) {
                form.setFieldValue('id', selectedProduct.id)
                form.setFieldValue('name', selectedProduct.name)
                form.setFieldValue('category_id', selectedProduct.category_id)
                form.setFieldValue('user_id', selectedProduct.user_id)
            }
        }
    }, [userCategories, id, form.setFieldValue])

    // Auto-select newly created category (only if created in THIS form)
    useEffect(() => {
        if (justCreated) {
            form.setFieldValue('category_id', justCreated.id)
        }
    }, [justCreated, form.setFieldValue])

    const handleCategoryCreated = (newCat) => {
        setJustCreated(newCat)
        setShowModal(false)
    }

    return (
        <>
            <form onSubmit={form.handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="Product name..." 
                    value={form.values.name}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                />
                {form.touched.name && form.errors.name && (
                    <span className="error">{form.errors.name}</span>
                )}
                
                <label htmlFor="category_id">Category: </label>
                <select 
                    name="category_id" 
                    id="category_id" 
                    value={form.values.category_id}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                >
                    <option value="">Select a category</option>
                    {allCategories?.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {form.touched.category_id && form.errors.category_id && (
                    <span className="error">{form.errors.category_id}</span>
                )}
                
                <button type="submit">Update Product</button>
                <button type="button" onClick={() => setShowModal(true)}>
                    Add New Category
                </button>
            </form>
            
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <CategoryFormNew onSubmit={handleCategoryCreated} />  {/* ✅ Pass the handler */}
            </Modal>
        </>
    )
}