import {Container, Row, Col, Button, Card, Form, InputGroup} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import Swal2 from 'sweetalert2';

import ProductCatalog from './ProductCatalog.js'
import imgPlaceholder from '../image/placeholder.png';
import UserContext from '../../UserContext.js';

export default function ProductCatalogView(){

	const {user} = useContext(UserContext);
	const admin = user.isAdmin;
	
	const [findToken, setFindToken] = useState(localStorage.getItem('token'))

	const navigateTo = useNavigate();

	const {productId} = useParams();
	const [productName, setProductName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [image, setImage] = useState('');

	const [prodQuantity, setProdQuantity] = useState(0);

	const phpCurrency = (value)=>{
		let phpCurrency = Intl.NumberFormat('en-PH',
			{
				style:'currency',
				currency:'PHP'
				// useGrouping:true,
				// maximumSignificantDigits:3
			}
		);
		return phpCurrency.format(value);
	}

	const stepUp = ()=>{
		let currentValue = prodQuantity
		if(currentValue <= (quantity-1)){
			setProdQuantity(currentValue + 1)
		}
	}

	const stepDown = ()=>{
		let currentValue = prodQuantity

		if(currentValue >= 1){
			setProdQuantity(currentValue - 1)
		}
	}

	// single product preview
	useEffect(() => {
			fetch(
				`${process.env.REACT_APP_API_URL}/products/${productId}`,
				{
					method: 'GET',
					headers:{
						'Contetnt-Type': 'application/json'
					}
				}
			)
			.then(response => response.json())
			.then(data => {
				setProductName(data.productName);
				setDescription(data.description);
				setPrice(data.price);
				setQuantity(data.quantity);
				setImage(data.productImage);
			})
		}
	)
	
	// update the user token
	useEffect(() => {
			setFindToken(localStorage.getItem('token'))
		},
		[user]
	)
	
	// set quantity seelector to 0 when item preview was changed
	useEffect(() => {
			setProdQuantity(0)
		},
		[productId]
	)

	const updateCartQuantity = (prodId, cartId) => {
		fetch(
			`${process.env.REACT_APP_API_URL}/cart/viewCartItemQuantity/${prodId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${findToken}`
				}
			}
		)
		.then(response => response.json())
		.then(data_qty => {
			const newQty = data_qty + prodQuantity;
			if(newQty > quantity){
				Swal2.fire({
					title:"Please check your cart!",
					icon: "warning",
					text: "You already reached the maximum quantity for this product. Hurry and buy this now!"
				})
			}else{
				fetch(
					`${process.env.REACT_APP_API_URL}/cart/cartQuantity`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						},
						body: JSON.stringify({
							cartId: cartId,
							quantity: newQty
						})
					}    
				)
				.then(response => response.json())
				.then(data => {
					Swal2.fire({
						title: "Added to cart successfully!",
						icon: "success",
						text: "Thank you for adding this product to your cart!"
					})
					setProdQuantity(0)
				})
			}
		})
	}

	const addToCart = () => {
		if(findToken){
			fetch(
				`${process.env.REACT_APP_API_URL}/cart/checkCartItem/${productId}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${findToken}`
					}
				}
			)
			.then(response => response.json())
			.then(result => {
				if(result === false){
					if(prodQuantity > 0){
						fetch(
							`${process.env.REACT_APP_API_URL}/cart/${productId}`,
							{
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
									'Authorization': `Bearer ${findToken}`
								},
								body: JSON.stringify({
									productId: productId,
									quantity: prodQuantity
								})
							}
						)
						.then(prodResult => prodResult.json())
						.then(data => {
							Swal2.fire({
								title: "Product added successfully!",
								icon: "success",
								text: "Thank you for adding this product to your cart!"
							})
							setProdQuantity(0)
						})
					}else{
						Swal2.fire({
							title: "Please check your add to cart quantity!",
							icon: "info",
							text: "You must add at least 1 quantity to proceed. Thank you!"
						})
					}
				}else{
					if(prodQuantity > 0){
						updateCartQuantity(productId, result)
					}else{
						Swal2.fire({
							title: "Please check your add to cart quantity!",
							icon: "info",
							text: "You must add at least 1 to your cart to proceed. Thank you!"
						})
					}
				}
			})
		}else{
			navigateTo('/login');
		}
	}

	return(
		(admin) ?
			<Navigate to="/PageNotFound"/>
		:
			<div className='bg-light margin-from-navbar'>
				<Container className="mt-2">
					<Row>
						<Col className="col-12 bg-white pt-3">
							<Card className="border-none">
								<Row>
									{/* Product Image */}
									<Col className="col-12 col-sm-5  ">
										<Card.Img variant="top" src={image || imgPlaceholder} alt="Product Image" width="100"/>
									</Col>

									{/* Product Name and Price */}
									<Col className="col-12 col-sm-7 product-view-title">
										<Card.Body>
											<Row>
												<Col className="col-12 mb-3">
													<Card.Text>{productName}</Card.Text>
												</Col>
											</Row>
										</Card.Body>
									</Col>

									<Col className="col-12 col-sm-7 ms-auto mt-3 pt-2 product-view-price border-top border-1">
										<Card.Text>{phpCurrency(price)}</Card.Text>
									</Col>

									{/* Product Quantity */}
									<Col className="col-12 col-sm-7 ms-auto mt-3">
										<Row>
											<Col className="col-12 col-sm-12 col-md-auto d-flex justify-content-start align-items-center">
												<span className=''>Quantity</span>
											</Col>
											<Col className="col-auto col-sm-auto col-md-auto my-1 d-flex justify-content-start align-items-center">
												{
													quantity > 1 ?
														<div className='d-flex justify-content-start align-items-center'>
															<div>
																<InputGroup className='text-center'>
																	<Button
																		className='border-none button-qty'
																		id="button-subtract"
																		onClick={stepDown}> - </Button>
																	<Form.Control
																		id="number-input"
																		type="number"
																		min={0}
																		max={quantity}
																		value={prodQuantity}
																		step={1}
																		className='border-none input-qty'
																		aria-label="Example text with button addon"
																		aria-describedby="basic-addon1"
																		readOnly
																	/>
																	<Button
																		className='border-none button-qty'
																		id="button-add"
																		onClick={stepUp}> + </Button>
																</InputGroup>
															</div>
														</div>

													:
														<Card.Text className='text-muted'>Out-Of-Stock</Card.Text>
												}
											</Col>
											<Col className="col-auto col-sm-auto col-md-auto d-flex justify-content-start align-items-center">
												<span className='text-muted'>{quantity} pcs available</span>
											</Col>
										</Row>
									</Col>

									{/* Button */}
									<Col className="col-12 col-sm-7 ms-auto mt-3">
										<Row>
											<Col className="col-12 col-sm-6 col-md-6 my-1 d-grid">
												{
													quantity > 1 ?
														<Button className="btn-buy" variant=""><i className="bi bi-bag-dash"></i> Buy Now</Button>
													:
														<Button className="btn-buy" disabled><i className="bi bi-bag-dash"></i> Buy Now</Button>
												}
											</Col>

											<Col className="col-12 col-sm-6 col-md-6 my-1 d-grid">
												{
													quantity > 1 ?
														<Button className="btn-add-cart" onClick={addToCart} variant=""><i className="bi bi-cart3"></i> Add to cart</Button>
													:
														<Button className="btn-add-cart" disabled><i className="bi bi-cart3"></i> Add to cart</Button>
												}
											</Col>
										</Row>
									</Col>
								</Row>
							</Card>
						</Col>

						{/* Product Description */}
						<Col className="bg-white col-12 pt-3">
							<div className=" py-3 border-top border-1">
								<h5>Product Description:</h5>
								<span>{description}</span>
							</div>
						</Col>
					</Row>

					<Row className="mt-5">
						<Col className="col-12">
							<div className="pt-3 pb-0">
								<h5>Other products you might want</h5>
							</div>
						</Col>
						<Col className="col-12">
							<div>
								<ProductCatalog showSort="d-none"/>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
	)
}