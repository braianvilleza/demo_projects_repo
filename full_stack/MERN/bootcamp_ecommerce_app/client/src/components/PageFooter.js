import {Container, Row, Col, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default function PageFooter(){

	const payment1 = require('./image/icons/mastercard.png')
	const payment2 = require('./image/icons/visa.png')

	return(
		<div className="footer-container m-0 p-0">
			<Container>
				<Row>

					{/*Footer Top*/}
					{/*Links*/}
					<Col className="col-12 col-md-6 col-lg-3 pt-3 order-0 order-md-1 order-lg-1">
						<h6 className="footer-top-title">LINKS</h6>
						<p className="footer-link footer-top-text"><Link to="/products">All Products</Link></p>
						<p className="footer-link footer-top-text"><Link>All Categories</Link></p>
						<p className="footer-link footer-top-text"><Link>About Us</Link></p>
						<p className="footer-link footer-top-text"><Link>Terms & Conditions</Link></p>
						<p className="footer-link footer-top-text"><Link>Privacy Policy</Link></p>
					</Col>

					{/*Payment Method*/}
					<Col className="col-12 col-md-6 col-lg-3 pt-3 order-1 order-md-2 order-lg-2">
						<Row className="row flex-column">
							<Col>
								<h6 className="footer-top-title">PAYMENT METHOD</h6>
							</Col>
							<Col className="pt-1">
								<div className="">
									<Image src={payment1} alt="mastercard" width="70"/>
								</div>
							</Col>
							<Col className="pt-1">
								<div className="">
									<Image src={payment2} alt="mastercard" width="70"/>
								</div>
							</Col>
						</Row>
					</Col>

					{/*Follow us*/}
					<Col className="col-12 col-md-6 col-lg-3 pt-3 order-2 order-md-4 order-lg-3">
						<Row>
							<Col className="col-12">
								<h6 className="footer-top-title">FOLLOW US</h6>
							</Col>
							<Col className="col-12">
								<div className="d-flex align-items-center footer-top-text">
									<i className="bi bi-facebook fs-5 pe-1"/>
									<Link to="https://www.facebook.com/">Facebook</Link>
								</div>
							</Col>
							<Col className="col-12">
								<div className="d-flex align-items-center footer-top-text">
									<i className="bi bi-instagram fs-5 pe-1"/>
									<Link to="https://www.instagram.com/">Instagram</Link>
								</div>
							</Col>
							<Col className="col-12">
								<div className="d-flex align-items-center footer-top-text">
									<i className="bi bi-youtube fs-5 pe-1"/>
									<Link to="https://www.youtube.com/">YouTube</Link>
								</div>
							</Col>
							<Col className="col-12">
								<div className="d-flex align-items-center footer-top-text">
									<i className="bi bi-linkedin fs-5 pe-1"/>
									<Link to="https://www.linkedin.com/login">LinkedIn</Link>
								</div>
							</Col>
						</Row>
					</Col>

					{/*Contact us*/}
					<Col className="col-12 col-md-6 col-lg-3 pt-3 order-3 order-md-3 order-lg-4">
						<h6 className="footer-top-title">CONCTACT US</h6>
						<p className="footer-top-text"><i className="bi bi-envelope"> motoparts@mail.com</i> </p>
						<p className="footer-top-text"><i className="bi bi-phone"> (+63) 912 3456 789</i></p>
						<p className="footer-top-text"><i className="bi bi-telephone"> (02) 1234 5678</i></p>
						<p className="footer-top-text"><i className="bi bi-buildings"> Caloocan City, NCR, Philippines</i></p>
					</Col>
					{/*Footer Top End*/}

					{/*Footer Bootem*/}
					<Col className="col-12 pt-3 order-5 order-md-5 order-lg-5  footer-bottom-text">
						<div className="border-top border-1 pt-3">
							<p className="">&#169;2023 MotoParts. All Right Reserved</p>
						</div>
					</Col>
					{/*Footer Bootem End*/}
				</Row>
			</Container>
		</div>
	)
}