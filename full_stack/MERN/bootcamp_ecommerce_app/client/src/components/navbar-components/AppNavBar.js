import {Container, Row, Col, Nav, Navbar, NavDropdown, Offcanvas, Form, Button, InputGroup} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {useState, useContext} from 'react';
import UserContext from '../../UserContext.js';

export default function AppNavBar(){

	const {user} = useContext(UserContext);
	const userId = user.id;
	const name = user.firstName;
	const admin = user.isAdmin;

	const expand = 'md';

	const [menuOpen, setMenuOpen] = useState(false)
	const handleOpen = () => setMenuOpen(true);
  	const handleClose = () => setMenuOpen(false);

	return(
		<Container>
			<Row className="d-flex">
				<Col className="col-12 m-0 p-0">
					<Navbar fixed="top" key={expand} expand={expand} variant="dark" className="navbar-1">
						<Container>
							<Navbar.Brand as={Link} to='/'>MotoParts</Navbar.Brand>
							<Navbar.Toggle
								aria-controls={`offcanvasNavbar-expand-${expand}`}
								
								// for track the state of toggle
								onClick={handleOpen}
							/>
							<Navbar.Offcanvas
								id={`offcanvasNavbar-expand-${expand}`}
								aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
								placement="end"

								// add props for toggle
								// restoreFocus={false}
								show={menuOpen}
								onHide={handleClose}
							>
								<Offcanvas.Header closeButton>
									<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
										MotoParts
									</Offcanvas.Title>
								</Offcanvas.Header>

								<Offcanvas.Body>
									<Nav className="justify-content-end flex-grow-1">
										<Nav.Link onClick={handleClose} as={NavLink} to='/'>Home</Nav.Link>
										<Nav.Link onClick={handleClose} as={NavLink} to='/products'>Products</Nav.Link>
										{
											(admin) ?
												<Nav.Link onClick={handleClose} as={NavLink} to='/dashboard'>Dashboard</Nav.Link>
											:	
												<Nav.Link onClick={handleClose} as={NavLink} to='/PageNotFound'>Track My Order</Nav.Link>
										}
										{
											(userId === null) ?
												<Nav.Link onClick={handleClose} as={NavLink} to='/signup'>Sign Up</Nav.Link>
											:
												<></>
										}
									</Nav>
								</Offcanvas.Body>
							</Navbar.Offcanvas>
						</Container>
					</Navbar>
				</Col>

				<Col className="col-12">
					<Navbar fixed="top" variant="light" className="navbar-2">
						<Container className='p-0'>
							<Nav className="search-container justify-content-end align-items-center">
								<Form className="search-component">
									<InputGroup>
										<Form.Control
										placeholder="Search"
										aria-label="Search bar"
										aria-describedby="Search bar"
										id="search-bar"
										/>
										<Button variant="warning" id="search-button">
											<i className="bi bi-search text-light"></i>
										</Button>
									</InputGroup>
								</Form>
								<Nav.Link as={NavLink} to='/cart' className="p-0 me-0">
									<i className="bi bi-cart4 fs-2 py-0 px-1"></i>
								</Nav.Link>
								{
									(userId === null) ?
										<Nav.Link as={NavLink} to='/login'>Login</Nav.Link>
									:
										<NavDropdown
											id={`offcanvasNavbarDropdown-expand-${expand}`}
											title={<span>Hi, {name.charAt(0).toUpperCase() + name.slice(1)}</span>}
											drop= 'start'
										>	
											<NavDropdown.Item as={NavLink} to='/PageNotFound'>My Orders</NavDropdown.Item>
											<NavDropdown.Item as={NavLink} to='/userProfile'>My Profile</NavDropdown.Item>
											<NavDropdown.Divider/>
											<NavDropdown.Item as={NavLink} to='/logout'>Logout</NavDropdown.Item>
										</NavDropdown>
								}
							</Nav>
						</Container>
					</Navbar>
				</Col>
			</Row>
		</Container>
		
	)
}