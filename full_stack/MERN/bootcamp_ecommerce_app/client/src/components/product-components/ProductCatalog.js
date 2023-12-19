import {Container, Row, Dropdown, DropdownButton} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import ProductCatalogCard from './ProductCatalogCard.js';

export default function ProductCatalog(props){

	const [products, setProducts] = useState([]);
	const [dropdownValue, setDropdownValue] = useState('Price low to high')

	useEffect(() => {
			fetch(`${process.env.REACT_APP_API_URL}/products/activeProducts`)
			.then(response => response.json())
			.then(data => {
					if(dropdownValue === 'Price low to high'){
						// sort ascending
						//.sort((a, b) => a.name > b.name ? 1 : -1
						setProducts(data.sort((a, b) => a.price - b.price).map(product => {
							return(
								<ProductCatalogCard key={product._id} productView={product}/>
							)
						}))
					}else{
						// sort descending
						//.sort((a, b) => a.name > b.name ? -1 : 1
						setProducts(data.sort((a, b) => b.price - a.price).map(product => {
							return(
								<ProductCatalogCard key={product._id} productView={product}/>
							)
						}))
					}
				}
			)
		}
	)
	
	return(
		<Container>
			<Row className={props.showSort}>
				<div className="d-flex justify-content-end align-items-center border-bottom border-1 py-1 mb-3">
					<div className="pe-1">
						<span>Sort By:</span>
					</div>
					<div>
						<DropdownButton id="dropdown-item-button" variant="light" title={dropdownValue}>
							<Dropdown.ItemText></Dropdown.ItemText>
							<Dropdown.Item as="button" onClick={()=>setDropdownValue('Price low to high')}>Price low to high</Dropdown.Item>
							<Dropdown.Item as="button" onClick={()=>setDropdownValue('Price high to low')}>Price high to low</Dropdown.Item>
						</DropdownButton>
					</div>
				</div>
					
			</Row>
			<Row>
				{products}
			</Row>
		</Container>
	)
}