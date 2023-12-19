import {Container, Row, Col, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import ProductsFeaturedCard from './ProductsFeaturedCard.js';

export default function ProductsFeatured(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
            fetch(`${process.env.REACT_APP_API_URL}/products/featuredProducts`)
            .then(response => response.json())
            .then(data => {
                    setProducts(data.map(product => {
                        return(
                            <ProductsFeaturedCard key={product._id} featuredProducts={product}/>
                        )
                    }))
                }
            )
        }
    );

    return(
		<Container>
			<Row>
				{products}
			</Row>
		</Container>
    )
}