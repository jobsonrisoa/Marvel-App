import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Image, Button, Row, Col, Modal } from 'antd';
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
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const fetchComics = () => {
          showModal();
      }

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
                    <Row>
                        <Col span={12}>
                            <Image
                                width={200}
                                src={`${item.thumbnail.path}/portrait_incredible.jpg`}
                            />
                        </Col>
                        <Col span={12}>
                            <p>{item.description ? item.description : 'No Description Avaiable'}</p>
                            <Button type="primary" 
                                    size="large"
                                    onClick={() => fetchComics(item.comics)}
                            >
                                Open Stories
                            </Button>
                        </Col>
                    </Row>
                </Card>    
                )
            })}

            <Modal
                centered 
                title="Basic Modal" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
            </Modal>

        </div>
    )
}

