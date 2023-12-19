import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function PageNotFound(){
	return(
		<Container className="text-center">
			<Row>
				<Col className='col-10 col-md-8 col-lg-6 mx-auto'>
					<h1>Page Not Found!</h1>
					<img
						className='img-fluid my-3'
						src='https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1881.jpg?w=826&t=st=1686984385~exp=1686984985~hmac=c4b611b4000737899594dd3e7fa0cf6235eaefca22a29c4105e667325fc94cfd'
						alt="Failed to load!"/>
					<p>Go back to <Link to='/'>hompage</Link></p>
				</Col>
			</Row>
		</Container>
	)
}