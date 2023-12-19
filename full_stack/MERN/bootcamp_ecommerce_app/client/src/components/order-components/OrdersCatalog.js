import {Container, Row, Col} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';

import UserContext from	'../../UserContext.js';

import OrdersCard from './OrdersCard.js';


export default function OrdersCatalog(){

	const {user} = useContext(UserContext);

	const [orders, setOrders] = useState([]);

	useEffect(() => {
			fetch(
				`${process.env.REACT_APP_API_URL}/orders`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					},
					body: JSON.stringify(
						{
							userId: user.id
						}
					)
				}
			)
			.then(response => response.json())
			.then(data => {
					setOrders(data.map(order => {
						return(
							<OrdersCard key={order._id} productProp={order}/>
						)
					}))
				}
			)
		}
	)

	return(
		<Container>
			<Row>
				<Col>
					{orders}
				</Col>
			</Row>
		</Container>
	)
}