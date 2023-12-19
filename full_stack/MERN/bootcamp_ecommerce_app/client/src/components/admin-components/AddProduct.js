import {Form, Button, Offcanvas, InputGroup, Card} from 'react-bootstrap';
import { useState } from 'react';

import Swal2 from 'sweetalert2';
import avatar from '../image/placeholder.png';

import { storage } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function AddProduct() {

	const [productName, setProductName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// firebase image upload
	const [imageUpload, setImageUpload] = useState(null);
	// const [imageURL, setImageURL] = useState('');

	// add products

	// this function gets the current date and time and control the format to display using the instance
	function getCurrentDateTime(){
		const cdt = new Date();
		const datetime = `${cdt.getFullYear()}${cdt.getMonth()+1}${cdt.getDate()}${cdt.getHours()}${cdt.getMinutes()}${cdt.getSeconds()}`;
		return datetime
	}

	// Promise
	function upload(){
		const datetime = getCurrentDateTime()
		return new Promise((resolve, reject) => {
			if(imageUpload){
				const imageRef = ref(storage, `product_image/${productName}:${datetime}:${v4()}`);

				uploadBytes(imageRef, imageUpload)
				.then((snapshot) => {
					getDownloadURL(snapshot.ref)
					.then((url) => {
						resolve(url)
					});
				});
			}else{
				reject("No image to upload!")
			}
		});
	}

	// using async and await
	async function addProduct(){
		if(localStorage.getItem('token')){
			const convertQty = Number(quantity);
			const convertPrice = Number(price);
			try {
				const url = await upload();	
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/products/addProduct`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`
						},
						body: JSON.stringify({
							 productName: productName
							,description: description
							,price: convertPrice
							,quantity: convertQty
							,productImage: url
						})
					}
				);
				const data = await response.json();
				return data;
			}catch (error) {
				console.log(error)
			}
		}
	}

	async function proceedToAdd(e){
		e.preventDefault();
		try{
			let data = await addProduct();
			if(data){
				Swal2.fire({
					title: `"${productName}" is successfully added!`,
					icon: 'success'
				})

				setProductName('')
				setDescription('')
				setPrice('')
				setQuantity('')
				setImageUpload('')
			}else{
				Swal2.fire({
					title: 'Something went wrong. Please try again!',
					icon: 'error'
				});
			}
		}catch(err){
			console.log("Error:");
			console.log(err);
		}
	}

	return(
		<>
			<Button variant="success" onClick={handleShow}><i className="bi bi-file-earmark-plus"></i> Add Product</Button>

			<Offcanvas show={show} onHide={handleClose} backdrop='true' scroll='true'>

				<Offcanvas.Header closeButton></Offcanvas.Header>

				<Offcanvas.Body>
					<Card>
						<div className="bg-dark text-light text-center mb-3 py-2 rounded-top fs-3">
							<span>Create New Product</span>
						</div>
						
						<Card.Body>
							<div className="mx-3 pb-3">
								<Form onSubmit={event => proceedToAdd(event)}>
									<Form.Group className="mb-3" controlId="productName">
										<Form.Label>Name</Form.Label>
										<Form.Control
											type="text"
											placeholder="Product Name"
											value={productName}
											onChange={event => setProductName(event.target.value)}
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3" controlId="description">
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

									<Form.Group className="mb-3" controlId="description">
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

									<Form.Group className="mb-3" controlId="quantity">
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

									<Form.Group controlId="formFile" className="mb-3">
										<Form.Label>Product Image</Form.Label>
										<Form.Control
											type="file"
											accept='image/*'
											onChange={(e) => {
												setImageUpload(e.target.files[0])
											}}
											required
										/>
									</Form.Group>

									{/* <Card.Img variant="top" src={postImage.myFile || avatar} alt="Product Image"/> */}
									{
										imageUpload
											? imageUpload && (<Card.Img  className="add-product-image" variant="top" src={URL.createObjectURL(imageUpload)} alt="Product Image"/>)
											: <Card.Img className="add-product-image" variant="top" src={avatar} alt="Product Image"/>
									}

									<div className="d-grid my-3"> <Button variant="dark" type="submit">Add Product</Button> </div>
								</Form>
							</div>
						</Card.Body>
					</Card>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}

