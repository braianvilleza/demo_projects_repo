import { Container, Row, Col, Button } from "react-bootstrap"
import { Navigate, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext.js";
import CartCatalog from '../components/cart-components/CartCatalog.js'

export default function Cart(){

	const {user} = useContext(UserContext)
	const admin = user.isAdmin

	return(
		(localStorage.getItem('token')) ?
			(admin)?
				<Navigate to='/AccessDenied'/>
			:
				<div className="margin-from-navbar content-bg">
					<Container>
						<Row className="bg-white">
							<Col className="col-12 col-lg-9 order-2 order-lg-1 m-0 p-0">
								<div className="scroll-y-container">
									<CartCatalog/>
								</div>
							</Col>
							<Col className="col-12 col-lg-3 order-1 order-lg-2">
								<div className="mb-3">
									<p>Shipping Address</p>
									<p>Shipping Address</p>
									<div className="text-end">
										<Button className="btn btn-change-add" as={Link} to="/userProfile">Change Address</Button>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
		: <Navigate to='/login'/>
	)
}