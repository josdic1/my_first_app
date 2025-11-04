
import { useFormikForm } from "../hooks/useFormikForm"
import { categorySchema } from "../validators/productValidation"
import { useProduct } from "../hooks/useProduct"

export function CategoryFormNew({ onSubmit }) {
    const { createCategory } = useProduct()

    const form = useFormikForm({
        initialValues: { name: '' },
        validationSchema: categorySchema,
        onSubmit: (values) => {
            createCategory(values)
                .then(result => {
                    if (!result.error && result.data) {
                        onSubmit(result.data.id)
                    } else {
                        alert('Error creating category')
                    }
                })
        }
    })

    return (
        <form onSubmit={form.handleSubmit}>
            <input 
                type="text"
                name="name"
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                placeholder="Category name..."
            />
            {form.touched.name && form.errors.name && (
                <span className="error">{form.errors.name}</span>
            )}
            <button type="submit">Create Category</button>
        </form>
    )
}