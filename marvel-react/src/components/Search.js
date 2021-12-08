import React from 'react'
import Search from 'antd/lib/transfer/search';


export default function SearchComponent() {
    return (
        <div>
            <Search placeholder="Enter your character's name..." style={{ width: 200 }} />
        </div>
    )
}
