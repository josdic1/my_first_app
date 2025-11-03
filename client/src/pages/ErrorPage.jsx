import { useRouteError, useNavigate } from "react-router-dom"

function ErrorPage() {
    const error = useRouteError()

    const navigate = useNavigate()


return (
<>
    <h1>Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
    <p>
        <i>{error.statusText || error.message}</i>
    </p>
     <button onClick={() => navigate('/')}> Home </button>
    <button onClick={() => window.location.reload()}> Reload </button>
   
</>
)}

export default ErrorPage
