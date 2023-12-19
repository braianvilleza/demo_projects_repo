import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';

// import sweeralert2 for more interactive alerts
import Swal2 from 'sweetalert2';

// import UserContext.js
import UserContext from '../UserContext.js';


export default function Login(){

	const navigateTo = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

    const {user, setUser} = useContext(UserContext);
	const [isLogin, setIsLogin] = useState(false);

	const getUserDetails = (token) => {
		if(localStorage.getItem('token')){
			fetch(
				`${process.env.REACT_APP_API_URL}/users/userDetails`,
				{
					method: 'GET',
					headers:{
						Authorization: `Bearer ${token}`
					}
				}
			)
			.then(result => result.json())
			.then(data => {
				const name = data.firstName	
				const newName = name.charAt(0).toUpperCase() + name.slice(1);

				// checks values of user context
				// console.log(data._id)
				// console.log(data.isAdmin)
				// console.log(newName)

				setUser(
					{
						id: data._id,
						firstName: newName,
						isAdmin: data.isAdmin
					}
				)
				Swal2.fire({
					title: 'Login Susccessful!',
					icon: 'success',
					text: ''
				});
				navigateTo('/');
			})
		}
	};

	const login = (e)=>{
		e.preventDefault();
			
		fetch(`${process.env.REACT_APP_API_URL}/users/login`,
			{
				method: 'POST',
				headers:{
				    'Content-Type': 'application/json'
				},
				body: JSON.stringify(
				    {
				        email: email,
				        password: password
				    }
				)
			}
		)
		.then(result => result.json())
		.then(data => {

				if(data){
					localStorage.setItem('token', data.auth);
					getUserDetails(data.auth)
				}else{
					Swal2.fire({
						title: 'Login Failed!',
						icon: 'error',
						text: 'Please check your login details and try again!'
					});	
				}
			}
		)
	}

	useEffect(()=>{
			if(user.id !== null){
				setIsLogin(true)
			}else{
				setIsLogin(false)
			}
		},
		[user, isLogin]
	)
	
	
	return(
		(isLogin) ?
			<Navigate to='/accessdenied'/>
		:
			<div className='margin-from-navbar content-bg'>
				<Container>
					<Row className="container-bg d-flex justify-content-center align-items-center">
						<Col className="col-12 col-md-10 col-lg-6 mx-auto p-3 order-2 order-lg-1">
							<div className="form-container text-center">
								<h5>Welcome! Please login your account!</h5>
							</div>
							<div className="mt-3">
								<Form className="form-container-group" onSubmit={event => login(event)}>
									<Form.Group className="input-form" controlId="email">
										<Form.Label className='label-size'>Email address</Form.Label>
										<Form.Control
											className='mb-3'
											type="email"
											placeholder="Enter email"
											value={email}
											onChange={
												event => setEmail(event.target.value)
											}
										/>
									</Form.Group>

									<Form.Group className="input-form" controlId="password">
										<Form.Label className='label-size'>Password</Form.Label>
										<Form.Control
											className='mb-3'
											type="password"
											placeholder="Password"
											value={password}
											onChange={
												event => setPassword(event.target.value)
											}
										/>
									</Form.Group>

									<Form.Group className="mb-3 text-center" controlId="forgotPassword">
										<Form.Text className="text-muted"><Link to="/login">Forgot Password?</Link></Form.Text>
									</Form.Group>

									<div className="d-grid mb-3">
										<Button id='btn-login' variant="dark" type="submit">Login</Button>
									</div>

									<Form.Group className="mb-3 text-center" controlId="forgotPassword">
										<Form.Text className="text-muted">No account yet? <Link to="/signup">Sign up here</Link></Form.Text>
									</Form.Group>
								</Form>
							</div>
						</Col>

						<Col className="col-12 col-md-10 col-lg-6 order-1 order-lg-2">
							<div className="text-center">
								<h1>MotoParts</h1>
								<h6>Part & Accessories</h6>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			
	)
}