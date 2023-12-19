import {Row, Col, Card, Button, InputGroup, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';

import UserContext from '../../UserContext.js';
import ImagePlaceHolder from '../image/placeholder.png';


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

const deleteItem = (cartId)=>{
    fetch(
        `${process.env.REACT_APP_API_URL}/cart/deleteFromCart`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                cartId: cartId
            })
        }
    )
    .then(response => response.json())
    .then(data => {
        // console.log(data)
    })
}

export default function CartCatalogCard(props){
   
    const {user} = useContext(UserContext);
    const admin = user.isAdmin;

    const {_id, productId, quantity} = props.cartView;


    const [dbProductName, setDbProductName] = useState('');
    const [dbProductImage, setDbProductImage] = useState('');

    // dbPrice is the updated price of the product in the cart
    const [dbPrice, setDbPrice] = useState(0);
    
    // dbQuantity will be used to validate the max value of the input fieled
    const [dbQuantity, setDbQuantity] = useState(0);

    // cartQuantity is the total quantity of the product from the users cart
    const [cartQuantity, setCartQuantity] = useState(quantity);

    // totalAmount is the computation of the updated price of the product from the users current item quantity from the cart
    const totalAmount = dbPrice * cartQuantity;

    const stepUp = ()=>{
        if(cartQuantity <= (dbQuantity-1)){
            setCartQuantity(cartQuantity + 1);
        }
    }

    const stepDown = ()=>{
        if(cartQuantity > 1){
            setCartQuantity(cartQuantity - 1);
        }
    }

    // refresh list of items on cart
    useEffect(()=>{
            fetch(
                `${process.env.REACT_APP_API_URL}/products/${productId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => response.json())
            .then(data => {
                setDbProductName(data.productName);
                setDbPrice(data.price);
                setDbQuantity(data.quantity);
                setDbProductImage(data.productImage)
            })
        },
        [productId, cartQuantity]
    )    
    
    // update cart quantity if stepUp and stepDown is invoked
    useEffect(() => {
            fetch(
                `${process.env.REACT_APP_API_URL}/cart/cartQuantity`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        cartId: _id,
                        quantity: cartQuantity
                    })
                }    
            )
            .then(response => response.json())
            .then(data => {
                setCartQuantity(data)
            })
        },
        [_id, cartQuantity]
    )

    return(
        <Col className="col-12 border-bottom border-1 py-2">
            <Row className="">
                <Col className="col-6 col-sm-4 col-lg-3 px-3">
                    <Link to={(admin)? '/PageNotFound' : `/products/${productId}`}>
                        <Card.Img className="" variant="top" src={dbProductImage || ImagePlaceHolder} alt="Image"/>
                    </Link>
                </Col>

                <Col className="col-6 col-sm-8 col-lg-3 px-3">
                    <Card.Text className="cart-product-name">{dbProductName}</Card.Text>
                    <Card.Text className="product-price">{phpCurrency(dbPrice)}</Card.Text>
                </Col>

                <Col className="col-5 col-sm-5 col-lg-2 px-3">
                    <Card.Text className="cart-title">Quantity</Card.Text>
                    
                    <div className='cart-container d-flex justify-content-start align-items-center'>
                        <div className='qty-container'>
                            <InputGroup className='text-center'>
                                <Button
                                    className='border-none button-qty'
                                    id="button-subtract"
                                    onClick={stepDown}> - </Button>
                                <Form.Control
                                    id="number-input"
                                    type="number"
                                    min={1}
                                    max={dbQuantity}
                                    value={cartQuantity}
                                    step={1}
                                    className='border-none input-qty'
                                    aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                    readOnly
                                />
                                <Button
                                    className='border-none button-qty'
                                    id="button-add"
                                    onClick={stepUp}> + </Button>
                            </InputGroup>
                        </div>
                    </div>
                </Col>

                <Col className="col-3 col-sm-3 col-lg-2 px-3">
                    <Card.Text className="cart-title">Total</Card.Text>
                    <div className='cart-container d-flex justify-content-start align-items-center'>
                        <Card.Text className="">{phpCurrency(totalAmount)}</Card.Text>
                    </div>
                </Col>

                <Col className="col-4 col-sm-4 col-lg-2">
                    <div className="btn-container-cart">
                        <Row>
                            <Col className='col-12 col-md-6 d-grid pt-2'>
                                <Button className='btn btn-checkout'>Buy</Button>
                            </Col>
                            <Col className='col-12 col-md-6 d-grid'>
                                <Button className='btn btn-delete' onClick={()=> deleteItem(_id)}><i className="bi bi-trash"></i></Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
    </Col>
    )
}