import React from 'react';

import { Row, Col, Image } from 'react-bootstrap';
import cx from 'classnames';

import s from "./MainCard.module.css"

const MainCard = (props) => {

    const data = props.movieDetails;

    const posterImage = "https://image.tmdb.org/t/p/w500" + data.poster;
    const genresList = data.genre.map(x => {
        return x.name
    }).join(", ");

    const productionList = data.production.map(x => {
        return x.name
    }).join(", ");

    const totalRevenue = `$ ${data.revenue.toLocaleString()}`;

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col lg={5} style={{ textAlign: "Center"}}>
                            <Image className={s.maxHeight} src={posterImage} fluid />
                        </Col>

                        <Col lg={7} className={s.metaDataContainer}>
                            <div className={s.maxHeight}>
                                <div>
                                    <h1 className={cx(s.title, s.secondaryColor, s.latoText)}>{data.original_title}</h1>
                                    <span className={cx(s.tagline, s.primaryColor, s.oswaldText)}>{data.tagline}</span>
                                    <p className={cx(s.secondaryColor, s.overview)}>{data.overview}</p>
                                </div>
                                <div className={s.details}>
                                    <div className={cx(s.primaryColor, s.genresList, s.oswaldText)}>{genresList}</div>
                                    <div className={cx(s.secondaryColor, s.productionList, s.oswaldText)}>{productionList}</div>

                                    <div className={s.releaseDetails}>
                                        <Row>
                                            <Col xs={6} style={{ marginBottom: 20 }} >
                                                <div className={cx(s.title, s.secondaryColor, s.oswaldText)}>Original Release:</div>
                                                <div className={cx(s.description, s.primaryColor, s.oswaldText)}>{data.release}</div>
                                            </Col>
                                            <Col xs={6} style={{ marginBottom: 20 }}>
                                                <div className={cx(s.title, s.secondaryColor, s.oswaldText)}>Running Time:</div>
                                                <div className={cx(s.description, s.primaryColor, s.oswaldText)}>{data.runtime} mins</div>
                                            </Col>
                                            <Col xs={6} style={{ marginBottom: 20 }}>
                                                <div className={cx(s.title, s.secondaryColor, s.oswaldText)}>Box Office:</div>
                                                <div className={cx(s.description, s.primaryColor, s.oswaldText)}>{totalRevenue}</div>
                                            </Col>
                                            <Col xs={6} style={{ marginBottom: 20 }}>
                                                <div className={cx(s.title, s.secondaryColor, s.oswaldText)}>Vote Average:</div>
                                                <div className={cx(s.description, s.primaryColor, s.oswaldText)}>{data.vote} / 10</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default MainCard
