import {Container, Row, Col} from 'react-bootstrap';

import ProductCarousel from '../components/home-components/ProductCarousel.js';
import ProductsFeatured from '../components/home-components/ProductsFeatured.js';

export default function Home(){
	return(
		<div className="bg-light">
			<Container className="margin-from-navbar">
				<Row>
					<Col className="col-12 mb-3">
						<ProductCarousel/>
					</Col>
					<Col className="col-12 mt-3">
						<h5>Featured Products</h5>
						<ProductsFeatured/>
					</Col>
				</Row>
			</Container>
		</div>
	)
}