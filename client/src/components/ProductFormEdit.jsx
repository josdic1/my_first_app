import { useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import { RecipeContext } from "../contexts/RecipeContext"
import { useFormikForm } from "../hooks/useFormikForm"
import { productSchema } from "../validators/productValidation"

export function ProductFormEdit() {
    const { user, refreshUser } = useUser()
    const { categories, updateProduct } = useContext(RecipeContext)
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
        onSubmit: (values) => {
            updateProduct(values)
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
        if (user?.categories && id) {
            const allProducts = user.categories.flatMap(cat => cat.products || [])
            const selectedProduct = allProducts.find(product => product.id === parseInt(id))
            
            if (selectedProduct) {
                form.setFieldValue('id', selectedProduct.id)
                form.setFieldValue('name', selectedProduct.name)
                form.setFieldValue('category_id', selectedProduct.category_id)
                form.setFieldValue('user_id', selectedProduct.user_id)
            }
        }
    }, [user?.categories, id])

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
            
            <button type="submit">Update Product</button>
        </form>
        </>
    )
}