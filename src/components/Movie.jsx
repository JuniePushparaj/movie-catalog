import React from 'react';
import { Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import BaseConfig from '../config/base-config';

const Movie = (props)=>{
    const { key, src, name, year, imDbId, type } = props;
return(
    <Card key={key} className="col-lg-2 col-md-2 col-xs-12 no-mobile mobile movies" style={{padding:"5px"}}>
        <Card.Img src={src !== 'N/A' ? src : BaseConfig.noImageUrl} alt={"No Image"} variant="top" height={200} width={150}/>
        <Card.Body style={{fontSize:"small",margin:"0 auto"}}>
        <Row>Name: {name}</Row>
        <Row>Year: {year}</Row>
        <Row>imDbId: {imDbId}</Row>
        <Row>Type: {type}</Row>
        </Card.Body>
    </Card>
)
}

Movie.propTypes = {
    key: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    imDbId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default Movie;