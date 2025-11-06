import { Navigate } from "react-router-dom"
import { useApp } from "../hooks/useApp"
import { UserCategories } from "../components/UserCategories"

function HomePage() {
    const { user, loading } = useApp()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user?.id) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <h1>Home Page</h1>
            <UserCategories />  
        </>
    )
}

export default HomePage