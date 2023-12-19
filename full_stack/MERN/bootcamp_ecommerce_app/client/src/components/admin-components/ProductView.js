import {Container, Row, Col, Button, Card, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import Swal2 from 'sweetalert2';
import avatar from '../image/placeholder.png'

export default function ProductView(){

	const [productName, setProductName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [isActive, setIsActive] = useState(true);
	const [image, setImage] = useState('');

	const {productId} = useParams();

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
			setImage(data.productImage);
		})
	},[productId, isActive])

	const archiveProduct = (e) => {
		e.preventDefault()
		fetch(
			`${process.env.REACT_APP_API_URL}/products/archiveProduct/${productId}`,
			{
				method: 'PATCH',
				headers:{
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}
		)
		.then(response => response.json())
		.then(data => {
			if(data){
				if(data.isActive){
					setIsActive(false)
					Swal2.fire({
						title: 'Product Archived!',
						icon: 'warning',
						text: 'This product is now successfully archived.'
					})
				}else{
					setIsActive(true)
					Swal2.fire({
						title: 'Product Unarchived!',
						icon: 'warning',
						text: 'This product is now successfully unarchived.'
					})
				}
			}
		})
	}
	
	return(
		<Container className=" my-5 py-4">
			<Row>
				<Col className="col-12">
				    <Card className="cardHighlight">
				    	<Row>
					    	<Col className="col-12 col-lg-5 m-0">
					    		<Card.Img variant="top" src={image || avatar} alt="Product Image"/>
					    	</Col>

					    	<Col className="col-12 col-lg-7 p-0">
					    		{/*<Card.Header>Product Details</Card.Header>*/}
						        <Card.Body>
						        	<Row>
										<Col className="col-12">
											<div className="mb-3 text-center">
												<Card.Title>Product Details</Card.Title>
											</div>
											
											<Card.Subtitle>Product Name</Card.Subtitle>
											<Card.Text>{productName}</Card.Text>
																				
											<Card.Subtitle>Price:</Card.Subtitle>
											<Card.Text>Php {price}</Card.Text>

											<Card.Subtitle>Quantity:</Card.Subtitle>
											{
												quantity > 0 ?
													<Card.Text>{quantity} pcs</Card.Text>
													
												:
													<Card.Text>Out-Of-Stock</Card.Text>
											}

											<Card.Subtitle>Status:</Card.Subtitle>
											{
												isActive === true ?
													<Card.Text>Active</Card.Text>
												:
													<Card.Text>Archived</Card.Text>
											}
											
										</Col>
										<Col className="col-12">
											<Row className="row">
												<Col className="col-12 col-md-4 mt-3 d-grid">
													<Button as={Link} to={`/products/update/${productId}`} variant="warning"> <i className="bi bi-pencil-square"></i> Update</Button>
												</Col>

												<Col className="col-12 col-md-4 mt-3 d-grid">
													<Form onSubmit={(event) => archiveProduct(event)} className="d-grid">
														{
															isActive === true ?
																<Button variant="dark" type="submit"><i className="bi bi-archive"></i> Archived </Button>
															:
																<Button variant="secondary" type="submit"><i className="bi bi-archive"></i> Unarchived </Button>
														}
													</Form>
												</Col>

												<Col className="col-12 col-md-4 mt-3 d-grid">
													<Button as={Link} to={`/dashboard`} variant="secondary"><i className="bi bi-x-square"></i> Cancel</Button>
												</Col>
											</Row>
										</Col>
						            </Row>
						        </Card.Body>
					        </Col>
				        </Row>
				    </Card>
				</Col>
				
				<Col className="col-12 mt-3">
					<div className="border border-1 border-secondary-subtle rounded p-3">
						<div className="text-center">
							<h5>Product Description</h5>
						</div>
						<span>{description}</span>
					</div>
				</Col>
			</Row>
		</Container>
	)
}