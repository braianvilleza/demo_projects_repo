import {Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function ProductsCategory() {
	return (
		<Row xs={2} md={4} lg={6} className="g-4">
			{Array.from({ length: 6 }).map((_, idx) => (
					<Col key={idx}>
						<Card className="border-none card-hover">
							<Link to="/products"><Card.Img className="border-none" variant="top" src={require('../image/pulleyset_rs8.jpg')}/></Link>
							<Card.Body className="p-0">
								<Card.Text className="text-truncate text-center">
										Category Name
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))
			}
		</Row>
	);
}