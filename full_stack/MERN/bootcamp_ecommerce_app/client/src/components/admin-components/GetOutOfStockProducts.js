import {Container, Row, Col} from 'react-bootstrap';

import {useState, useEffect} from 'react';

import AllProductsCard from './AllProductsCard.js'

export default function GetOutOfStockProducts(){

	const [outOfStockProducts, setOutOfStockProducts] = useState([]);

	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_API_URL}/products/outOfStockProducts`,
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
			setOutOfStockProducts(data.map(product => {
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
					{outOfStockProducts}
				</Col>
			</Row>
		</Container>
	)
}