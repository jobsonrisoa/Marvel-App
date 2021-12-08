import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Image } from 'antd';
import Search from './Search';

export default function MarvelCharacters() {
    const [charactersData, setCharactersData] = useState([]);
    useEffect(() => {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=e0da45f6c6d5ce9fb1437f04918d9d2c`)
        .then((response) => {
            console.log(response.data.data.results)
            setCharactersData(response.data.data.results)    
        }).catch((error) => {
            console.error(error)
        })
    }, [])
    return (
        <div className="app-body"> 
        <Search/> 
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
