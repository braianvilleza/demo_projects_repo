import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {useState, useEffect, useContext} from "react";
import Swal2 from 'sweetalert2';

import UserContext from '../UserContext.js';


export default function Signup(){

	const {user} = useContext(UserContext);
	const navigateTo = useNavigate();


	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [contactNo, setContactNo] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [retypePassword, setRetypePassword] = useState('');
	
	const [isRetypePasswordDisable, setRetypePasswordDisable] =useState(true);
	const [isBusttonDisable, setBusttonDisable] = useState(true);
	
	const [mainMessage, setMainMessage] = useState('');
	const [contactNoMessage, setContactNoMessage] = useState('');
	const [emailNoMessage, setEmailMessage] = useState('');
	const [passwordMessage, setpasswordMessage] = useState('');
	const [isEmailFound, setEmailFound] = useState(false);
	

	// check if someone is login
	const [isLogin, setIsLogin] = useState(false);
	useEffect(()=>{
			if(user.id !== null){
				setIsLogin(true)
			}else{
				setIsLogin(false)
			}
			console.log(isLogin)
		},
		[user, isLogin]
	)

	// email validation
	const checkEmail = (checkEmail) =>{
		fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: checkEmail
				})
			}
		)
		.then(result => result.json())
		.then(data => {
			setEmailFound(data)
		})
	}

	// check emails
	useEffect(() => {
			checkEmail(email)
		},
		[email]
	)
	
	// other fields validation
	useEffect(()=>
		{
			if(lastName || firstName){
				setMainMessage('');
				setRetypePasswordDisable(true);
				setBusttonDisable(true);

				if(!contactNo){
					setContactNoMessage('');
					setBusttonDisable(true);
					setRetypePasswordDisable(true);
				}else{
					if(Number.isFinite(Number(contactNo)) && contactNo.length === 11 && contactNo.charAt(0) === '0' && contactNo.charAt(1) === '9'){
						setContactNoMessage('');
						if(!email){
							setEmailMessage('');
						}else{
							if(isEmailFound){
								setEmailMessage('This email is already in use');
							}else{
								setEmailMessage('');
								if(!password){
									setpasswordMessage('');
									setRetypePasswordDisable(true);
								}else{
									if(password.length >= 7){
										setpasswordMessage('');
										setRetypePasswordDisable(false);
										if(!retypePassword){
											setpasswordMessage('');
											setBusttonDisable(true);
										}else{
											if(retypePassword === password){
												setpasswordMessage('');
												setBusttonDisable(false)
											}else{
												setpasswordMessage(`Password didn't match`);
												setBusttonDisable(true)
											}
										}
									}else{
										setpasswordMessage('Password length must be greater than or equal to 7 characters');
										setRetypePasswordDisable(true);
									}
								}
							}
						}
					}else{
						setContactNoMessage('Please check your contact number');
						setBusttonDisable(true);
						setRetypePasswordDisable(true);
					}
				}
			}else{
				setMainMessage('Please fill out all required fields');
				setContactNoMessage('');
				setEmailMessage('');
				setpasswordMessage('');
				setRetypePassword('');
				setRetypePasswordDisable(true);
				setBusttonDisable(true);
			}
		},
		[
			lastName, 
			firstName,
			contactNo,
			email,
			password,
			retypePassword,
			isEmailFound
		]
	);

	// sign up function
	const signup = (e)=>{
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				firstName: firstName,
			    lastName: lastName,
			    mobileNo: contactNo,
			    email: email,
			    password: password
			})
		})
		.then(result => result.json())
		.then(data => {
			if(data){
				Swal2.fire({
					title: 'Signup Complete!',
					icon: 'success',
					text: 'Thank you!'
				});

				navigateTo('/login')
			}else{
				Swal2.fire({
					title: 'Failed to signup!',
					icon: 'error',
					text: 'Please make sure that all required fields are correct!'
				});
			}
		})
	}
	
	return(
		(isLogin) ?
			<Navigate to='/accessdenied'/>
		:
			<div className="margin-from-navbar content-bg">
				<Container>
					<Row className="container-bg d-flex justify-content-center align-items-center">
						
						<Col className="col-12 col-md-10 col-lg-6 mx-auto p-3 order-2 order-lg-1">
							<div className="form-container text-center">
								<h5>Create your own account NOW!</h5>
							</div>

							<div className="mt-3">
								<Form className="form-container-group" onSubmit={event => signup(event)}>
									<Row>
										<Col className='col-12 col-md-6'>
											{/*last name*/}
												<Form.Group className="input-form" controlId="lastName">
													<Form.Label className='label-size'>Last Name <span className="text-danger">*</span> </Form.Label>
													<Form.Control
														className='mb-3'
														type="text"
														placeholder="Enter your last name"
														value={lastName}
														onChange={
															event => setLastName(event.target.value)
														}
														required
													/>
												</Form.Group>
										</Col>

										<Col className='col-12 col-md-6'>
											{/*first name*/}
											<Form.Group className="input-form" controlId="firstName">
												<Form.Label className='label-size'>First Name <span className="text-danger">*</span></Form.Label>
												<Form.Control
													className='mb-3'
													type="text"
													placeholder="Enter your first name"
													value={firstName}
													onChange={
														event => setFirstName(event.target.value)
													}
													required
												/>
											</Form.Group>
										</Col>

										<Col className='col-12'>
											{/*contact no.*/}
											<Form.Group className="input-form" controlId="contactNo">
												<Form.Label className='label-size'>Contact No. <span className="text-danger">*</span></Form.Label>
												<Form.Control
													className='mb-3'
													type="text"
													placeholder="Enter your contact no."
													maxLength="11"
													value={contactNo}
													onKeyPress={
														(event) => {
															if (!/[0-9]/.test(event.key)) {
																event.preventDefault();
															}
														}
													}
													onChange={
														event => setContactNo(event.target.value)
													}
													required
												/>
											</Form.Group>

											{/*contact no message*/}
											<Form.Group className="input-form" controlId="contactNoMessage">
												<Form.Text className="text-danger">{contactNoMessage}</Form.Text>
											</Form.Group>
										</Col>

										<Col className='col-12'>
											{/*email*/}
												<Form.Group className="mb-3" controlId="email">
													<Form.Label className='label-size'>Email address <span className="text-danger">*</span></Form.Label>
													<Form.Control
														className='mb-3'
														type="email"
														placeholder="Enter email"
														value={email}
														onChange={
															event => setEmail(event.target.value)
														}
														required
													/>
												</Form.Group>

											{/*email message*/}
												<Form.Group className="mb-3 text-end" controlId="emailNoMessage">
													<Form.Text className="text-danger">{emailNoMessage}</Form.Text>
												</Form.Group>
										</Col>
										
										<Col className='col-12 col-md-6'>
											{/*password*/}
												<Form.Group className="input-form" controlId="password">
													<Form.Label className='label-size'>Password <span className="text-danger">*</span> </Form.Label>
													<Form.Control
														className='mb-3'
														type="password"
														placeholder="Password"
														value={password}
														onChange={e => {setPassword(e.target.value)}}
														required
													/>
												</Form.Group>
										</Col>

										<Col className='col-12 col-md-6'>
											{/*retype password*/}
											<Form.Group className="input-form" controlId="retypePassword">
												<Form.Label className='label-size'>Retype password <span className="text-danger">*</span> </Form.Label>
												<Form.Control
													className='mb-3'
													type="password"
													placeholder="Retype Password"
													value={retypePassword}
													disabled={isRetypePasswordDisable}
													onChange={e => {setRetypePassword(e.target.value)}}
													required
												/>
											</Form.Group>
										</Col>
										
										<Col className='col-12'>
											{/*password message*/}
											<Form.Group className="mb-3 text-end" controlId="passwordMessage">
													<Form.Text className="text-danger">{passwordMessage}</Form.Text>
												</Form.Group>
												
											{/*main message*/}
												<Form.Group className="mb-3 text-center" controlId="mainMessage">
													<Form.Text className="text-danger">{mainMessage}</Form.Text>
												</Form.Group>

											{/*signup button*/}
												<div className="d-grid mb-3">
													<Button
														id="btn-signup"
														variant="dark"
														type="submit"
														disabled={isBusttonDisable}
													>Signup</Button>
												</div>

											{/*login link*/}
												<Form.Group className="mb-3 text-center" controlId="loginLink">
													<Form.Text className="text-muted">Already have an account? Try to <Link to="/login">Login</Link></Form.Text>
												</Form.Group>
										</Col>
									</Row>
								</Form>
							</div>
						</Col>

						<Col className="col-12 col-md-10 col-lg-6 order-1 order-lg-2">
							<div className="text-center">
								<h1>MotoParts</h1>
								<h6>Parts & Accessories</h6>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			
	)
}