import { Navigate } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import { UserCategories } from "../components/UserCategories"

function HomePage() {
    const { user, loading } = useUser()

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