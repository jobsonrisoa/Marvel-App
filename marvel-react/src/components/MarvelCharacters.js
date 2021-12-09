import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Image } from 'antd';
import Search from './Search';
import MarvelLogo from '../assets/MarvelLogo.png';

export default function MarvelCharacters() {
    const [searchItem, setSearchItem] = useState('')
    const searchTerm = (searchItem) => {
        setSearchItem(searchItem)
    }
    const [charactersData, setCharactersData] = useState([]);
    useEffect(() => {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters?name=${searchItem}&apikey=e0da45f6c6d5ce9fb1437f04918d9d2c`)
        .then((response) => {
            console.log(response.data.data.results)
            setCharactersData(response.data.data.results)    
        }).catch((error) => {
            console.error(error)
        })
    }, [searchItem])
    return (
        <div className="app-body"> 
        <img src={MarvelLogo} />
        <Search searchTerm={searchTerm} /> 
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
