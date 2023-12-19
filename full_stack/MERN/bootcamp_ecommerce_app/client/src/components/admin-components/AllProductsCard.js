import {Container, Row, Col, Button, Card, Form} from 'react-bootstrap';

import {Link} from 'react-router-dom';

// import {useState} from 'react';

import Swal2 from 'sweetalert2';

import avatar from '../image/placeholder.png'

export default function AllProductsCard(props){

	const {_id, productName, description, price, quantity, isActive, isFeatured, productImage} = props.productProp

	// const [postImage, setPostImage] = useState( { productImage : ""})

	const archiveProduct = (e) => {
		e.preventDefault()
		fetch(
			`${process.env.REACT_APP_API_URL}/products/archiveProduct/${_id}`,
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
					Swal2.fire({
						title: 'Product Archived!',
						icon: 'warning',
						text: 'This product is now successfully archived.'
					})
				}else{
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
		<Container>
			<Row>
				<Col className="col-12 gy-3">
				    <Card className="cardHighlight">
				    	<Row>
					    	<Col className="col-12 col-lg-5 m-0">
					    		<Card.Img variant="top" src={productImage || avatar} alt="Product Image"/>
					    	</Col>

					    	<Col className="col-12 col-lg-7 p-3">
						        <Card.Body>
						        	<Row>
										<Col className="col-12">
											<Card.Title>Product Name</Card.Title>
											<Card.Text>{productName}</Card.Text>

											<Card.Subtitle>Description:</Card.Subtitle>
											<Card.Text>{description}</Card.Text>
										
											<Card.Subtitle>Price:</Card.Subtitle>
											<Card.Text>{price}</Card.Text>
										
											<Card.Subtitle>Quantity</Card.Subtitle>
											{	
												quantity > 0 ?
													<Card.Text>{quantity}</Card.Text>
												:
													<Card.Text>Out Of Stock</Card.Text>
											}
											<Card.Subtitle>Featured</Card.Subtitle>
											{
												isFeatured === true ?
													<Card.Text>Yes</Card.Text>
												:
													<Card.Text>No</Card.Text>
											}
											<Card.Subtitle>Status</Card.Subtitle>
											{
												isActive === true ?
													<Card.Text>Active</Card.Text>
												:
													<Card.Text>Archived</Card.Text>
											}
										</Col>
										<Col className="col-12">
											<div className="row ">
												<div className="col-12 col-md-4 mt-3 d-grid gap-2">
													<Button as={Link} to={`/products/${_id}`} variant="primary"><i className="bi bi-info-square"></i> View</Button>
												</div>

												<div className="col-12 col-md-4 mt-3 d-grid gap-2">
													<Button as={Link} to={`/products/update/${_id}`} variant="warning"><i className="bi bi-pencil-square"></i> Update</Button>
												</div>
												
												<div className="col-12 col-md-4 mt-3 d-grid gap-2">
													<Form onSubmit={(event) => archiveProduct(event)} className="d-grid">
													{
														isActive === true ?
															<Button variant="dark" type="submit"><i className="bi bi-archive"></i> Archived</Button>
														:
															<Button variant="secondary" type="submit"><i className="bi bi-archive"></i> Unarchived</Button>
													}
													</Form>
												</div>
												
											</div>
											
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