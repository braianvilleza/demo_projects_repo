import {Container, Row, Col} from 'react-bootstrap';

import OrdersCatalog from '../components/order-components/OrdersCatalog.js';

export default function Orders(){
	return(
		<Container className="mt-5 pt-3 bg-primary">
			<Row>
				<Col>
					<OrdersCatalog/>
				</Col>
			</Row>
		</Container>
	)
}