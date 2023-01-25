import Carousel from "react-bootstrap/Carousel";
import img1 from "../images/home-carasol-images/img1.jpg";
import img2 from "../images/home-carasol-images/img2.jpg";
import img4 from "../images/home-carasol-images/img4.jpg";
import img3 from "../images/home-carasol-images/img3.png";

function IndividualIntervalsExample() {
  return (
    <div className="my__carousel_main">
      <Carousel className="home-carasol">
        <Carousel.Item interval={2000}>
          <img
            className="d-block home-carasol-images"
            src={img1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block home-carasol-images"
            src={img2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block home-carasol-images"
            src={img3}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block home-carasol-images"
            src={img4}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default IndividualIntervalsExample;
