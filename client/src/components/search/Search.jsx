import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import "./search.css"
import { useSelector } from 'react-redux'
import { AiFillHome, AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import Allresults from "./Allresults"

const Search = () => {
    const currentUser = useSelector(state => state)
    const [search, setSearch] = useState("")
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const navigate = useNavigate()
    const ref = useRef(null)

    const searchBar = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/v1/user/search?u=${search}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
            setSearchResults(res.data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='search_container'>
         
        <div className={`${isSearchBarOpen ? "search_focused" : "search"}`}
            ref={ref}> 
            <div className='center' >
                <input value={search} onChange={(e) => {
                    setSearch(e.target.value)
                    searchBar()}}  onClick={() => setIsSearchBarOpen(true)}
                className="searchbar"/>
                  {isSearchBarOpen && <div className='close_searchbar center' onClick={() => {
                setIsSearchBarOpen(false)
                setSearchResults([])
                setSearch("")
                }}>
            <AiOutlineArrowLeft />
            </div>}
               
            </div>
                {search.length === 0 && <p className='search_placeholder' 
                onClick={() => setIsSearchBarOpen(true)}> <span id='search_display_none'>Search...</span> <FaSearch /> </p>}
                <div className='search_results'>
                    {search == "" && <p className='no_results_message'>Connect with people!</p>}
                    {search !== "" && searchResults?.length === 0 && <p className='no_results_message'>No Results</p>}
                    {searchResults.map((item, index) => {
                        if(index === 5) {
                            return <Allresults results={searchResults} search={search}/>
                        }
                        if(index < 5) {
                        return <div className='search_result' key={item._id} onClick={() => navigate(`/navigate/${item._id}`)}>
                            <img className='profile_picture' src={item.profilePicture} />
                        <div className='search_result_info'>
                            <p>{item.firstName} {item.lastName}</p>
                            <p className='center'><AiFillHome />: Banovici</p>
                        </div>
                        </div>}
                    })}
                </div>
            </div>
    </div>
  )
}

export default Search