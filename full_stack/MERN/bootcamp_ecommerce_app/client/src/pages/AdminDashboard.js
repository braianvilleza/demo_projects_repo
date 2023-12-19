import {Container, Row, Col, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import GetActiveProducts from '../components/admin-components/GetActiveProducts.js';
import GetAllProducts from '../components/admin-components/GetAllProducts.js'
import GetArchivedProducts from '../components/admin-components/GetArchivedProducts.js';
import GetOutOfStockProducts from '../components/admin-components/GetOutOfStockProducts.js';

import AddProduct from '../components/admin-components/AddProduct.js';

export default function AdminDashboard(){

	const [active, setActive] = useState(1)

	const allProduct = () =>{
		setActive(1)
	}

	const activeProduct = () =>{
		setActive(2)
	}

	const archiveProduct = () =>{
		setActive(3)
	}

	const oosProduct = () =>{
		setActive(4)
	}

	useEffect(() =>
		{
			<>
				<GetAllProducts/>
				<GetActiveProducts/>
				<GetArchivedProducts/>
				<GetOutOfStockProducts/>	
			</>
		}
	)

	return(
		<Container className="mt-5 pt-5">
			<Row>
				<Col className="col-12">
					<Row className="row row-gap-3">
						<Col className="col-12 col-sm-6 col-md-6 col-lg-3 d-grid">
							<Button variant="success" onClick={()=>allProduct()}><i className="bi bi-bag"></i> All Products</Button>
						</Col>
						<Col className="col-12 col-sm-6 col-md-6 col-lg-3 d-grid">
							<Button variant="success" onClick={()=>activeProduct()}><i className="bi bi-archive"></i> Active Products</Button>
						</Col>
						<Col className="col-12 col-sm-6 col-md-6 col-lg-3 d-grid">
							<Button variant="success" onClick={()=>archiveProduct()}><i className="bi bi-archive"></i> Archived Products</Button>
						</Col>
						<Col className="col-12 col-sm-6 col-md-6 col-lg-3 d-grid">
							<Button variant="success" onClick={()=>oosProduct()}><i className="bi bi-archive"></i> Out-Of-Stocks</Button>
						</Col>
						<Col className="col-12 col-sm-12 col-md-12 d-grid">
							<AddProduct/>
						</Col>
					</Row>
				</Col>

				<Col className="col-12">
					{
						(active === 1) ? 
							<GetAllProducts/>
						: (active === 2) ? 
							<GetActiveProducts/>
						: (active === 3) ? 
							<GetArchivedProducts/>
						:
							<GetOutOfStockProducts/>						
					}
				</Col>
			</Row>
		</Container>		
	)
}