import { useState, useEffect, useMemo } from "react";
import { UserContext } from "../contexts/UserContext"; 

export function UserProvider({ children }) {
    const [ loading, setLoading ] = useState(true)
    const [ user, setUser ] = useState({
        id: '',
        name: '',
        password: ''
    })
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


    const refreshUser = () => {
        return fetch('http://localhost:5555/check_session', {
            credentials: 'include'
        })
        .then(r => r.json())
        .then(data => {
            if (data.logged_in) {  
                setUser(data.user);
            }
            return data
        });
    }


 const login = async (loginObject) => {
    const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginObject)
    });
    
    const data = await response.json();
    
    if (response.ok) {
        setUser(data);  // Flask returned the user object
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
        setUser({});  // Flask returned the user object
        return { success: true };
    } else {
        return { success: false, error: data.error };
    }
}

    const value = useMemo(() => ({
        loading,
        setLoading,
        login,
        logout,
        user,
        setUser,
        refreshUser
    }), [user, setUser])

       if (loading) {
        return <div>Loading...</div>;
    }

    return (

    <UserContext.Provider 
        value={value}>{children}
    </UserContext.Provider>
    )
}

