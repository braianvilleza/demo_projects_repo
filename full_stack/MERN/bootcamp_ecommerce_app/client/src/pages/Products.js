import {Container, Row, Col} from 'react-bootstrap';

import ProductCatalog from '../components/product-components/ProductCatalog.js';
export default function Products(){

	return(
		<div className="bg-light">
			<Container className="margin-from-navbar">
				<Row>
					<Col className='col-12'>
						<ProductCatalog showSort=""/>
					</Col>
				</Row>
			</Container>
		</div>
	)
}