export function FormField({ 
    label, 
    name, 
    type = "text", 
    form,
    as,
    children,
    ...props 
}) {
    const Component = as || 'input'
    
    return (
        <div className="form-field">
            <label htmlFor={name}>{label}</label>
            <Component
                type={type}
                name={name}
                id={name}
                value={form.values[name]}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={form.touched[name] && form.errors[name] ? 'error' : ''}
                {...props}
            >
                {children}
            </Component>
            {form.touched[name] && form.errors[name] && (
                <span className="error">{form.errors[name]}</span>
            )}
        </div>
    )
}