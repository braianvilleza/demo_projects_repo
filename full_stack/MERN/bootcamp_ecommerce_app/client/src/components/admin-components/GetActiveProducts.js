import {Container, Row, Col} from 'react-bootstrap';

import {useState, useEffect} from 'react';

import AllProductsCard from './AllProductsCard.js'

export default function GetActiveProducts(){

	const [activeProducts, setActiveProducts] = useState([]);

	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_API_URL}/products/activeProducts`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			}
		)
		.then(response => response.json())
		.then(data => {
			setActiveProducts(data.map(product => {
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
					{activeProducts}
				</Col>
			</Row>
		</Container>
	)
}