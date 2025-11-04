import { useState, useEffect, useMemo } from "react";
import { UserContext } from "../contexts/UserContext"; 

export function UserProvider({ children }) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        fetch('http://localhost:5555/check_session', {
            credentials: 'include'
        })
        .then(r => r.json())
        .then(data => {
            if (data.logged_in) {  
                setUser(data.user);
            }
            setLoading(false);
        });
    }, []);

const login = async (loginObject) => {
    const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginObject)
    });
    
    const data = await response.json();
    
    if (response.ok) {
        setUser(data);  // ✅ Use data directly, not data.user
        return { success: true };
    } else {
        return { success: false, error: data.error };
    }
};
    const logout = async () => {
        const response = await fetch('http://localhost:5555/logout', {
            method: 'POST',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            setUser(null);
            return { success: true };
        } else {
            return { success: false, error: data.error };
        }
    }

    const value = useMemo(() => ({
        loading,
        user,
        login,
        logout
    }), [user, loading])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider 
            value={value}>{children}
        </UserContext.Provider>
    )
}