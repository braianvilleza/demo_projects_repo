import {Container, Row, Col, Button, Card, Form, InputGroup} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import Swal2 from 'sweetalert2';
import avatar from '../image/placeholder.png'

export default function AddOrder(){

	const [productName, setProductName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [isActive, setIsActive] = useState(true);
	const [image, setImage] = useState('');


	const {productId} = useParams();

	const navigateTo = useNavigate();

	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_API_URL}/products/${productId}`,
			{
				method: 'GET',
				headers:{
					'Contetnt-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}
		)
		.then(response => response.json())
		.then(data => {
			setProductName(data.productName);
			setDescription(data.description);
			setPrice(data.price);
			setQuantity(data.quantity);
			setIsActive(data.isActive);
		})
	},[productId, isActive])

	// state for image image
	const [postImage, setPostImage] = useState( { myFile : ""})
	// const [postImage, setPostImage] = useState("")

	// function for image upload
	const handleFileUpload = async (e) => {
		setImage(e.target.value)

		const file = e.target.files[0];
		const base64 = await convertToBase64(file);
		console.log(base64)
		setPostImage({ ...postImage, myFile : base64 })
	}

	// convert file to base64 format
	function convertToBase64(file){
	  return new Promise((resolve, reject) => {
	    const fileReader = new FileReader();
	    fileReader.readAsDataURL(file);
	    fileReader.onload = () => {
	      resolve(fileReader.result)
	    };
	    fileReader.onerror = (error) => {
	      reject(error)
	    }
	  })
	}

	const updateProduct = (e) => {
		e.preventDefault();

		fetch(
			`${process.env.REACT_APP_API_URL}/products/updateProduct`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify(
					{
						id: productId,
						productName: productName,
						description: description,
						price: price,
						quantity: quantity,
						productImage: postImage.myFile
					}
				)
			}
		)
		.then(response => response.json())
		.then(data => {
				Swal2.fire(
					{
						title: 'Update Successful!',
						icon: 'success',
						text: 'Product is updated successfully.'
					}
				)
				navigateTo('/dashboard')
			}
		)

	}

	return(
		<Container className=" my-5 py-5">
			<Row>
				<Col className="col-12">
				    <Card className="cardHighlight">
				    	<Row>
					    	<Col className="col-12 col-lg-5 m-0">
					    		<Card.Img variant="top" src={postImage.myFile || avatar} alt="Product Image"/>
					    		
					    	</Col>

					    	<Col className="col-12 col-lg-7 p-0">
					    		{/*<Card.Header>Featured</Card.Header>*/}
						        <Card.Body>
						        	<Row className="w-100">
						        		<Col className="col-12">
						        			<Card.Title>Product Details</Card.Title>
						        		</Col>
										<Col className="col-12">
											<Form onSubmit={event => updateProduct(event)}>
												<Row>
													<Col className="col-12">
														<Form.Group className="mt-3" controlId="productName">
															<Form.Label>Name</Form.Label>
															<Form.Control
																type="text"
																placeholder="Product Name"
																value={productName}
																onChange={event => setProductName(event.target.value)}
																required
															/>
														</Form.Group>
													</Col>

													<Col className="col-12">
														<Form.Group className="mt-3" controlId="description">
															<Form.Label>Description</Form.Label>
															<Form.Control
																as="textarea"
																rows={4}
																placeholder="Product Description"
																value={description}
																onChange={event => setDescription(event.target.value)}
																required
															/>
														</Form.Group>
													</Col>

													<Col className="col-12 col-md-6">
														<Form.Group className="mt-3" controlId="price">
															<Form.Label>Price</Form.Label>
															<InputGroup className="mb-3">
																<InputGroup.Text>₱</InputGroup.Text>
																<Form.Control
																	aria-label="Amount (to the nearest philippine peso)"
																	placeholder="0.00"
																	value={price}
																	onChange={event => setPrice(event.target.value)}
																	onKeyPress={
																		(event) => {
							                                            	if (!/^[0-9]*\.?[0-9]*$/.test(event.key)) {
							                                              		event.preventDefault();
							                                            	}
							                                          	}
							                                        }
																	required
						                                        />
															</InputGroup>
														</Form.Group>
													</Col>

													<Col className="col-12 col-md-6">
														<Form.Group className="mt-3" controlId="quantity">
															<Form.Label>Quantity</Form.Label>
															<Form.Control
																aria-label="Quantity of product"
																placeholder="0.00"
																value={quantity}
																onChange={event => setQuantity(event.target.value)}
																onKeyPress={
																	(event) => {
						                                            	if (!/^[0-9]*\.?[0-9]*$/.test(event.key)) {
						                                              		event.preventDefault();
						                                            	}
						                                          	}
						                                        }
																required
						                                    />
														</Form.Group>
													</Col>

													<Col className="col-12">
														<Form.Group className="mt-3" controlId="imageFile">
															<Form.Label>Product Image</Form.Label>
																<Form.Control
																	type="file"
																	name="myFile"
																	value={image}
																	accept='.jpeg, .png, .jpg'
														          	onChange={(e) => handleFileUpload(e)}
																	required
																/>
														</Form.Group>
													</Col>

													<Col className="col-12 col-md-6 d-grid mt-3">
														<Button
															variant="warning"
															type="submit"
															// disabled={isBusttonDisable}
														><i className="bi bi-check2-square"></i> Save Changes</Button>
													</Col>

													<Col className="col-12 col-md-6 d-grid mt-3">
														<Button
															as={Link}
															to={'/dashboard'}
															variant="dark"
														><i className="bi bi-x-square"></i> Cancel</Button>
													</Col>
												</Row>
											</Form>
										</Col>
						            </Row>
						        </Card.Body>
					        </Col>
				        </Row>
				    </Card>
				</Col>
			</Row>
		</Container>
	)
}