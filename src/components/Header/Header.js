import React, { useState } from 'react';
import { Col, Row, Image } from "react-bootstrap";
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import s from "../Header/Header.module.css";

import axios from './../../services/axios';


const Header = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchOptions, setSearchOptions] = useState([]);

    const handleSearch = async (query) => {

        setIsLoading(true);

        await axios(`/search/movie?query=${query}`)
            .then(d => {
                return d.data
            })
            .then(d => {
                setIsLoading(false);
                setSearchOptions(d.results)
            })

    }

    const handleChange = (option) => {

        console.log("option",option)
        const selectedOption = option[0];
        if (selectedOption) {
            props.handleSelect(selectedOption.id)
        }
    }

    const renderMenuItemChildren = (option, props, index) => {
        return (
            <div key={option.id} >
                {option.title}
            </div>
        );
    }


    return (
        <>
            <Row className={s.container}>
                <Col xs={12} lg={6} className={s.logo}>
                    <a href="/"><Image className={s.logo} src="./tmdb.svg" rounded /></a>
                </Col>
                <Col xs={12} lg={6} className={s.input}>
                    <AsyncTypeahead
                        multiple={false}
                        allowNew={false}
                        isLoading={isLoading}
                        labelKey="title"
                        minLength={3}
                        options={searchOptions}
                        onSearch={handleSearch}
                        onChange={handleChange}
                        placeholder="Search for a movie..."
                        renderMenuItemChildren={renderMenuItemChildren}
                    />
                </Col>
            </Row>
        </>
    )
}

export default Header;
