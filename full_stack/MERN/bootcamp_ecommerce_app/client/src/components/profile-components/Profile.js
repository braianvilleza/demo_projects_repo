import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';


export default function Profile(){
    const token = localStorage.getItem('token')

    const [firstName    , setFirstName] = useState('');
    const [middleName   , setMiddleName] = useState('');
    const [lastName     , setLastName] = useState('');
    const [mobileNo     , setMobileNo] = useState('');
    const [email        , setEmail] = useState('');
    const [addressPart  , setAddressPart] = useState('');
    const [municipality , setMunicipality] = useState('');
    const [city         , setCity] = useState('');
    const [reqion       , setReqion] = useState('');

    // console.log(firstName)
    // console.log(middleName)
    // console.log(lastName)
    // console.log(mobileNo)
    // console.log(email)
    // console.log(addressPart)
    // console.log(municipality)
    // console.log(city)
    // console.log(reqion)


    useEffect(()=>{
        fetch(
            `${process.env.REACT_APP_API_URL}/users/userDetails`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        .then(response => response.json())
        .then(data => {
            setFirstName(data.firstName);
            setMiddleName(data.middleName);
            setLastName(data.lastName);
            setMobileNo(data.mobileNo);
            setEmail(data.email);
            setAddressPart(data.addressPart);
            setMunicipality(data.municipality);
            setCity(data.city);
            setReqion(data.region);
        })
    })


    return(
        <Container>
            <Row>
                <Col>
                    
                </Col>
            </Row>
        </Container>
    )
}