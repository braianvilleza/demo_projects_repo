import { Container, Row } from "react-bootstrap";
import {useState, useEffect} from 'react';

import CartCatalogCard from "./CartCatalogCard.js";
import NoItemInCart from "./NoCartFound.js";

export default function CartCatalog(){

    const [carts, setCarts] = useState([]);

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_API_URL}/cart`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => response.json())
        .then(data => {
            const items = data.cart;
            if(items === undefined || items.length === 0){
                setCarts([])
            }else{
                setCarts(items.map(cart => {
                    return(
                        <CartCatalogCard key={cart._id} cartView={cart}/>
                    )
                }))
            }
        })
    })
    
    return(
        <Container>
			<Row>
				{
                    (carts.length === 0) ?
                        <NoItemInCart/>
                    :
                        carts
                }
			</Row>
		</Container>
    )
}