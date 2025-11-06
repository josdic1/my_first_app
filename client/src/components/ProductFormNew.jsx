import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../hooks/useApp"
import { CategoryFormNew } from "./CategoryFormNew"
import { Modal } from "./Modal"
import { useFormikForm } from "../hooks/useFormikForm"
import { productSchema } from "../validators/productValidation"

export function ProductFormNew() {
    const { user, allCategories, createProduct } = useApp()  
    const [showModal, setShowModal] = useState(false)
    const [justCreated, setJustCreated] = useState(null)  // ✅ Local state
    const navigate = useNavigate()

    const form = useFormikForm({
        initialValues: {
            name: '',
            category_id: ''
        },
        validationSchema: productSchema,
        onSubmit: async (values) => {  
            const result = await createProduct(values)
            
            if (result.error) {
                alert(result.error)
            } else {
                form.resetForm()
                navigate('/')
            }
        }
    })

    // Auto-select newly created category (only if created in THIS form)
    useEffect(() => {
        if (justCreated) {
            form.setFieldValue('category_id', justCreated.id)
        }
    }, [justCreated, form.setFieldValue])

    useEffect(() => {
        if (user?.id) {
            form.setFieldValue('user_id', user.id)
        }
    }, [user, form.setFieldValue])

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
                
                <button type="submit">Add Product</button>
                <button type="button" onClick={() => setShowModal(true)}>
                    Add New Category
                </button>
            </form>
            
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <CategoryFormNew onSubmit={handleCategoryCreated} />
            </Modal>
        </>
    )
}