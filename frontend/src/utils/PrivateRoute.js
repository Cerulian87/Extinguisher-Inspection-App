import { Routes, Route, redirect, Navigate } from 'react-router-dom';
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';


function PrivateRoute({ children, ...rest }) {
    let {user} = useContext(AuthContext)
    return user ? <>{children}</> : <Navigate to="/login" />;
}

// function PrivateRoute({ children, ...rest }) {
//   let { user } = useContext(AuthContext);
//   return user ? (
//     <Routes><Route {...rest}>{children}</Route></Routes>
//   ) : (
//     <Navigate to="/login" replace={true} /> // Use `replace={true}` to replace the current entry in the history stack
//   );
// }

export default PrivateRoute;





// const PrivateRoute = ({children, ...rest}) => {
    // const auth = false;
//     return(
//         <Route {...rest}>{!auth ? <Redirect to='/login' /> : children}</Route>
//     );
// };

// function PrivateRoute({ children, ...rest }) {
//     let {user} = useContext(AuthContext)
//     console.log('Private route is working!!!')
//     return user ? <>{children}</> : <Navigate to="/login" />;
// }

// const PrivateRoute = ({ Component }) => {
//     // const auth = false;
//     let {user} = useContext(AuthContext)
//     console.log('Private route is working!')
//     return user ? <Component /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;