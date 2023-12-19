import {Container, Row, Col} from 'react-bootstrap';

import {useState, useEffect} from 'react';

import AllProductsCard from './AllProductsCard.js'

export default function GetArchivedProducts(){

	const [archivedProducts, setArchivedProducts] = useState([]);

	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_API_URL}/products/archivedProducts`,
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
			setArchivedProducts(data.map(product => {
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
					{archivedProducts}
				</Col>
			</Row>
		</Container>
	)
}