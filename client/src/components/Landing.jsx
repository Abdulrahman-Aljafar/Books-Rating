import React from 'react'
import { Carousel, Col, Container, Row } from 'react-bootstrap'
export default function Landing() {
    return (
<>
<Carousel>
  <Carousel.Item interval={1500} style={{height:"650px"}}>
    <img
      className="d-block w-100"
      src="https://www.wallpapertip.com/wmimgs/0-3795_wallpaper-books-library-shelves-lighting-hd-book-library.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={1500} style={{height:"650px"}}>
    <img
      className="d-block w-100"
      src="https://wallpaperaccess.com/full/124383.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={1500} style={{height:"650px"}}>
    <img
      className="d-block w-100"
      src="https://www.wallpapertip.com/wmimgs/55-556339_old-library-bookshelf-design.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</>
    )
}