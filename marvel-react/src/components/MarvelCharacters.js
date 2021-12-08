import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';

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
            {charactersData.map((item) => {
                return(
                    <Card title="Default size card" className="card-body">
                        <p>{item.name}</p>
                    </Card>    
                )
            })}
        </div>
    )
}
