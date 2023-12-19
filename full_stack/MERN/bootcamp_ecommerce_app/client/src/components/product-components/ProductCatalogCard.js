import {Col, Card} from 'react-bootstrap';
import {useContext} from 'react';
import {Link} from 'react-router-dom';

import UserContext from '../../UserContext.js';
import imgPlaceholder from '../image/placeholder.png';

export default function ProductCatalogCard(props){
	const {user} = useContext(UserContext)
	const admin = user.isAdmin

	const {_id, productName, price, productImage} = props.productView

	const phpCurrency = (value)=>{
        let phpCurrency = Intl.NumberFormat('en-PH',
            {
                style:'currency',
                currency:'PHP'
                // useGrouping:true,
                // maximumSignificantDigits:3
            }
        );
        return phpCurrency.format(value);
    }
	
	return (
		<Col className="col-6 col-sm-4 col-md-3 col-lg-2 p-0 m-0 px-1 my-2">
			<Card className="border-none card-hover pb-1 h-100">
				<Link to={(admin)? '/PageNotFound' : `/products/${_id}`}>
					<Card.Img className="border-none product-img" variant="top" src={productImage || imgPlaceholder} alt="Image"/>
				</Link>
				<Card.Body className="p-0 px-2">
					<Card.Text className="truncate-text-line">{productName}</Card.Text>
					<Card.Title className="product-price">{phpCurrency(price)}</Card.Title>
				</Card.Body>
			</Card>
		</Col>
	)
}