import {Outlet,Navigate} from "react-router-dom"

const PrivateRoute = () => {
   
    const userInfo = localStorage.getItem('currentUser')
    if(userInfo){
        return <Outlet/>
    }else{
        return <Navigate to="/"/>
    }
}

export default PrivateRoute