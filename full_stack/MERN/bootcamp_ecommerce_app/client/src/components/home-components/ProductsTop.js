import {Row, Col, Card} from 'react-bootstrap';

export default function ProductsTop() {
	return (
		<Row xs={2} md={6} className="g-3">
			{Array.from({ length: 6 }).map((_, idx) => (
					<Col key={idx}>
						<Card className="border-none card-hover">
						<Card.Img className="border-none" variant="top" src={require('../image/pulleyset_rs8.jpg')} />
						<Card.Body className="p-0 px-2">
							<Card.Text className="text-truncate">
								This is a longercard with supporting text below as a natural lead-in to additional content.
								This content is a little bit longer.
							</Card.Text>				
						</Card.Body>
						</Card>
					</Col>
				))
			}
		</Row>
	);
}