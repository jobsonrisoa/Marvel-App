import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Image, Button, Row, Col, Modal, Spin } from 'antd';
import Search from './Search';
import MarvelLogo from '../assets/MarvelLogo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';

const APIENDPOINT = `https://gateway.marvel.com:443/v1/public/characters?`;
const API_KEY = `e0da45f6c6d5ce9fb1437f04918d9d2c`;

export default function MarvelCharacters() {
    //const [paginatedCards, setPaginatedCards]= useState();
    const [searchItem, setSearchItem] = useState('')
    const [comicsData, setComicsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isComicsLoading, setIsComicsLoading] = useState(true)
    const searchTerm = (searchItem) => {
        setSearchItem(searchItem)
    }
    
    const pageSize = 4;
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

      const fetchComics = (comicsData) => {
          console.log(comicsData.collectionURI)
          axios.get(`${comicsData.collectionURI}?apikey=${API_KEY}`)
          .then((results) => {
                    setComicsData(results.data.data.results);
                    setIsComicsLoading(false);
          })
           
          showModal();
          // "http://gateway.marvel.com/v1/public/characters/1011334/comics"
          // "http://gateway.marvel.com/v1/public/comics/21366"
      }

    const searchChars = () => {
    if(searchItem) {


        axios.get(`${APIENDPOINT}name=${searchItem}&apikey=${API_KEY}`)
        .then((response) => {
            //console.log(response.data.data.results)
            setCharactersData(response.data.data.results) 
            setIsLoading(false);  
            if(response.data.data.results.length === 0) {
                toast.error('No characters found');
            }
        }).catch((error) => {
            console.error(error)
        })


    }}

    const [pageCount, setPageCount] = useState([]);
    
    useEffect(() => {
        if(searchItem === '') {
                axios.get(`${APIENDPOINT}limit=50&&apikey=${API_KEY}`)
                .then((response) => {
                    //console.log(response.data.data.results)
                    setIsLoading(false);   
                    if(response.data.data.results.length === 0) {
                        toast.error('No characters found');
                    }
                    setPageCount(Math.ceil(response.data.data.results.length/pageSize));
                    setCharactersData(_(response.data.data.results).slice(0).take(pageSize).value());
                    
                    //setCharactersData(response.data.data.results);
                    
                }).catch((error) => {
                    console.error(error)
                })
        }
    }, [searchItem]);

    const pageSum = pageCount? pageCount : 0; //charactersData? Math.ceil(charactersData.length/pageSize) : 0;
    if (pageSum === 1) return null;
    const pages = _.range(1, pageSum + 1);

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
        
        { isLoading ? (
        <div className="spinner">
            <Spin />
        </div>
        ) : (
            charactersData.map((item) => {
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
            })
        )}

            <nav>
                <ul className="pagination">
                    {
                        pages.map((page) => (
                            <li className="page-link">{page}</li>
                        ))
                    }
                </ul>

             </nav>
             
  
              <Modal
                centered 
                style={{top : 20}}
                title="Comics Data" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}>

                { isComicsLoading ? (
                <div className="spinner">
                    <Spin />
                </div>
                ) : (
                    comicsData.map((item) => {
                        return(
                            <div className="comics-data">
                                <h3>{item.title}</h3>
                                <p>{item.description ? item.description : "No Description Avaiable"}</p>
                            </div>
                        )
                    })
                )}
                    
                {}
               
                
                    
            </Modal>

        </div>
    )
}

