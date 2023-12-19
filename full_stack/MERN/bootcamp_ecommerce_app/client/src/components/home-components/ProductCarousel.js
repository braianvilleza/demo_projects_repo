import {Carousel} from 'react-bootstrap';


export default function ProductCarousel() {
  return (
    <Carousel data-bs-theme="dark" className="border border-1 border-light">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../image/driveface.jpg')}
          height="250"
          alt="First slide"
        />
        <Carousel.Caption>
          {/*<h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../image/pulleyset_rs8.jpg')}
          height="250"
          alt="Second slide"
        />

        <Carousel.Caption>
          {/*<h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../image/exhuastpipe.jpg')}
          height="250"
          alt="Third slide"
        />

        <Carousel.Caption>
          {/*<h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>*/}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}