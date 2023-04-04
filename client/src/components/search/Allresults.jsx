import React, { useState } from 'react'
import { AiOutlineArrowLeft, AiFillHome } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import "./allresults.css"

const Allresults = ({results, search}) => {
    const [showAllResults, setShowAllResults] = useState(false)
    const navigate = useNavigate();


  return (
    <div>
        <p className='see_all_results'
            onClick={() => setShowAllResults(true)}
        >See all results</p>
    
        {showAllResults && <div className='all_results_container'>
                <div className='all_results'> 
                    <div className='all_results_header'> 
                        <p className='search_query'>Showing results for: <span style={{color: "#7a7676"}}>{search}</span></p>
                        <p className='close_profile_picture center' style={{zIndex: "99"}}
                        onClick={() => setShowAllResults(false)}> <AiOutlineArrowLeft /> </p>
                    </div>
                    {results?.map((item) => {
                        return <div className='search_result' key={item._id} onClick={() => navigate(`/navigate/${item._id}`)}>
                        <img className='profile_picture' src={item.profilePicture} />
                    <div className='search_result_info'>
                        <p>{item.firstName} {item.lastName}</p>
                        <p className='center'><AiFillHome />: Banovici</p>
                    </div>
                    </div>
                    })}
                </div>
            </div>}
    </div>
  )
}

export default Allresults