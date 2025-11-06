import { useState } from "react";
import { CategoryItem } from "./CategoryItem";
import { useApp } from "../hooks/useApp"

export function UserCategories() {
    const { userCategories } = useApp()
    const [openCategory, setOpenCategory] = useState(null);

    if (!userCategories || userCategories.length === 0) {
        return <div>No categories yet</div>;
    }

    return (
        <>
            {userCategories.map((category) => (
                <div key={category.id}>
                    <button onClick={() => setOpenCategory(
                        openCategory === category.id ? null : category.id
                    )}>
                        {category.name} ({category.products.length})
                    </button>
                    
                    {openCategory === category.id && (
                        <ul>
                            {category.products.map(product => (
                              <CategoryItem key={product.id} product={product} />
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </>
    )
}