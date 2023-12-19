import { Container, Row, Col } from "react-bootstrap"

import Profile from '../components/profile-components/Profile.js'

export default function UserProfile(){
    return(
        <div className="margin-from-navbar content-bg">
            <Container>
                <Row className="bg-white">
                    <Col className="m-0 p-0">
                        <Profile/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}