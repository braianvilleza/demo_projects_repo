// css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// import route controller
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// import components
import NavBar from './components/NavBar.js';
import PageFooter from './components/PageFooter.js'


// Pages
import AdminDashboard from './pages/AdminDashboard.js';
import Cart from './pages/Cart.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import Orders from './pages/Orders.js';
import Products from './pages/Products.js'
import Signup from './pages/Signup.js'
import UserProfile from './pages/UserProfile.js';

// Page Not Found and Unavailable
import PageNotFound from './pages/PageNotFound.js';

// Components
import AddOrder from './components/order-components/AddOrder.js'
import ProductUpdate from './components/admin-components/UpdateProduct.js'
import ProductView from './components/product-components/ProductView.js';


// import useState and useEffect
import {useState, useEffect} from 'react'

// import UserContext.js
import { UserProvider } from './UserContext.js';


function App() {

  const [user, setUser] = useState({id: null, firstName: null, isAdmin: null});

  //clear localStorage data
  const unsetUser = () =>{
	localStorage.clear();

	setUser({
	  id: null,
	  isAdmin: null,
	  firstName: null
	});
  }


  useEffect(() => {
	  setTimeout(() => {
		  if(localStorage.getItem('token')){
			fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`,
			  {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			  }
			)
			.then(result => result.json())
			.then(data => {
			  setUser({
				id: data._id,
				isAdmin: data.isAdmin,
				firstName: data.firstName
			  });
			})
		  }
		},
		1000
	  ) 
	}
  )

  return (
	  <UserProvider value={{user, setUser, unsetUser}}>
		<BrowserRouter>
		  
		  <NavBar/>

		  <Routes>
			<Route path='/'                           element={<Home/>}/>
			<Route path='/cart'                       element={<Cart/>}/>
			<Route path='/userProfile'				  element={<UserProfile/>}/>
			<Route path='/dashboard'                  element={<AdminDashboard/>}/>
			<Route path='/login'                      element={<Login/>}/>
			<Route path='/orders'                     element={<Orders/>}/>
			<Route path='/logout'                     element={<Logout/>}/>
			<Route path='/orders/product/:productId'  element={<AddOrder/>}/>
			<Route path='/products'                   element={<Products/>}/>
			<Route path='/products/:productId'        element={<ProductView/>}/>
			<Route path='/products/update/:productId' element={<ProductUpdate/>}/>
			<Route path='/signup'                     element={<Signup/>}/>
			<Route path='*'                           element={<PageNotFound/>}/>
		  </Routes>

		  <PageFooter/>
		  
		</BrowserRouter>
	  </UserProvider>
  );
}

export default App;
