import React, { useState, useEffect} from 'react';
import s from './App.module.css';

import { Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header/Header";
import MainCard from "./components/MainCard/MainCard"

import axios from './services/axios';

const App = () => {

  const [ selectedMovieId, setSelectedMovieID ] =  useState(null);
  const [ selectedMovieDetails, setSelectedMovieDetails ] =  useState(null);
  const [ searchResults, setSearchResults ] = useState([])

  const extractRequiredData = (d) => {
     return {
          movieID: d.id,
          original_title: d.original_title,
          tagline: d.tagline,
          overview: d.overview,
          homepage: d.homepage,
          poster: d.poster_path,
          production: d.production_companies,
          production_countries: d.production_countries,
          genre: d.genres,
          release: d.release_date,
          vote: d.vote_average,
          runtime: d.runtime,
          revenue: d.revenue,
          backdrop: d.backdrop_path
      }
  }
  const getSeletedMovieDetails = async (selectedMovieId) => {
      setSelectedMovieID(selectedMovieId);
      const selectedMovieDetails = await axios(`/movie/${selectedMovieId}`)
                .then(d => {
                  return d.data
                })
                .then(d => {
                  return extractRequiredData(d)
                })
      setSelectedMovieDetails(selectedMovieDetails)
  }

  const getIntialData = async () => {
    const popularMovieID = await axios("/discover/movie?sort_by=popularity.desc")
            .then(d => {
              return d.data
            }).then(d => {
              const results = d.results;
              return results[0].id
            })

      getSeletedMovieDetails(popularMovieID);
  }

  useEffect(()=> {
      getIntialData()
  }, []);

  if(!selectedMovieDetails) {
    return <div></div>
  }

  const x = selectedMovieDetails;

  return (
      <div className={s.fullheight} style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${x.backdrop}")`}}>
          <Container>
                <Row>
                    <Col className={s.appContainer} xs={12} lg={{ span: 10, offset: 1}}>
                        <Header handleSelect={id => getSeletedMovieDetails(id)}/>
                        <MainCard movieDetails={selectedMovieDetails}/>
                    </Col>
                </Row>
          </Container>
      </div>
  );
}

export default App;
