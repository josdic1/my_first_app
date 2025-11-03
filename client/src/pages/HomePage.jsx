import { useUser } from "../hooks/useUser"
import { LoginPage } from "./LoginPage"
import { UserCategories } from "../components/UserCategories"


function HomePage() {
    const { user } = useUser()

    if (!user?.id) {
        return <LoginPage />
    }

    return (
        <>
            <h1>Home Page</h1>
            <UserCategories 
                userCategories={user.categories || []}
            />
        </>
    )
}

export default HomePage