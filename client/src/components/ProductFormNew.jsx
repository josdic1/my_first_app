import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import { RecipeContext } from "../contexts/RecipeContext"
import { CategoryFormNew } from "./CategoryFormNew"
import { Modal } from "./Modal"
import { useFormikForm } from "../hooks/useFormikForm"
import { productSchema } from "../validators/productValidation"
import { useState } from "react"

export function ProductFormNew() {
    const { user, refreshUser } = useUser()
    const { categories, createProduct } = useContext(RecipeContext)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const form = useFormikForm({
        initialValues: {
            name: '',
            category_id: '',
            user_id: ''
        },
        validationSchema: productSchema,
        onSubmit: (values) => {
            createProduct(values)
                .then(result => {
                    if (result.error) {
                        alert(result.error)
                    } else {
                        return refreshUser()
                    }
                })
                .then(() => {
                    navigate('/')
                    form.resetForm()
                })
        }
    })

    useEffect(() => {
        if (user?.id) {
            form.setFieldValue('user_id', user.id)
        }
    }, [user])

    const handleCategorySubmit = (categoryId) => {
        form.setFieldValue('category_id', categoryId)
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
                {categories?.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
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
            <CategoryFormNew onSubmit={handleCategorySubmit} />
        </Modal>
        </>
    )
}