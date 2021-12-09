import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Image, Button } from 'antd';
import Search from './Search';
import MarvelLogo from '../assets/MarvelLogo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const APIENDPOINT = `https://gateway.marvel.com:443/v1/public/characters?`;
const API_KEY = `e0da45f6c6d5ce9fb1437f04918d9d2c`;

export default function MarvelCharacters() {
    const [searchItem, setSearchItem] = useState('')
    const searchTerm = (searchItem) => {
        setSearchItem(searchItem)
    }
    const [charactersData, setCharactersData] = useState([]);

    const searchChars = () => {
    if(searchItem) {


        axios.get(`${APIENDPOINT}name=${searchItem}&apikey=${API_KEY}`)
        .then((response) => {
            //console.log(response.data.data.results)
            setCharactersData(response.data.data.results)   
            if(response.data.data.results.length === 0) {
                toast.error('No characters found');
            }
        }).catch((error) => {
            console.error(error)
        })

        
    }}

    useEffect(() => {
        if(searchItem === '') {
                axios.get(`${APIENDPOINT}&apikey=${API_KEY}`)
                .then((response) => {
                    //console.log(response.data.data.results)
                    setCharactersData(response.data.data.results)   
                    if(response.data.data.results.length === 0) {
                        toast.error('No characters found');
                    }
                }).catch((error) => {
                    console.error(error)
                })
        }
    }, [searchItem])


    return (
        <div className="app-body"> 
        <img src={MarvelLogo} alt="MarvelLogo" className="marvel-logo"/>
        <Search searchTerm={searchTerm} /> 
        <Button type="primary" 
                size="large"
                onClick={searchChars} 
                style={{marginTop: 20, width: 100}}
        >
            Search
        </Button>
        <ToastContainer />
            {charactersData.map((item) => {
                return(
                    <Card title={item.name} className="card-body">
                        <Image
                            width={200}
                            src={`${item.thumbnail.path}/portrait_incredible.jpg`}
                        />
                    </Card>    
                )
            })}
        </div>
    )
}

