import React from 'react'
import { Input  } from 'antd';
// eslint-disable-next-line
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function SearchComponent({searchTerm}) {   
    return (
        <div>
            <Search 
            placeholder="Enter your character's name..." 
            style={{ width: 500 }} 
            onChange={(e) => searchTerm(e.target.value)}
            />

        </div>
    )
}
