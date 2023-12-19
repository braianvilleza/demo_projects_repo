import {Container, Row, Col} from 'react-bootstrap';

import {useState, useEffect} from 'react';

import AllProductsCard from './AllProductsCard.js'


export default function GetAllProducts(){

	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_API_URL}/products`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}
		)
		.then(response => response.json())
		.then(data => {
			setProducts(data.map(product => {
				return(
					<AllProductsCard key={product._id} productProp={product}/>
				)
			}))
		})
	})

	return(
		<Container>
			<Row>
				<Col>
					{products}
				</Col>
			</Row>
		</Container>
	)
}