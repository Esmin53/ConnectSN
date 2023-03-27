import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import "./search.css"
import { useSelector } from 'react-redux'

const Search = () => {
    const currentUser = useSelector(state => state)
    const [search, setSearch] = useState("")
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
    const ref = useRef(null)

    const searchBar = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/v1/user/search?u=${search}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

   

  return (
    <div>
        <div className={`${isSearchBarOpen ? "search_focused" : "search"}`}
            onClick={() => setIsSearchBarOpen(true)} ref={ref}> 
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} 
                className="searchbar" placeholder={"Search..."}/>
            </div>
    </div>
  )
}

export default Search