import { Container, Row, Col } from "react-bootstrap";


export default function NoItemInCart(){
    return(
        <Container>
            <Row>
                <Col>
                <div className="d-flex justify-content-center align-items-stretch">
                    <p>You don't have any items in your cart!</p>
                </div>
                </Col>
            </Row>
        </Container>
    )
}