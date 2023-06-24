import React, { useContext, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsSearch, BsArrowLeft} from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const SearchComponentMob = () => {
    const navigate = useNavigate()
    const { setShowUpload, user, setOpenSideNav, openSideNav ,openSearch,setOpenSearch,searching , setSearching} = useContext(AppContext)
    const [suggestions, setSuggestions] = useState([])
    const [query, setQuery] = useState("")


    const searchByCategory = async (e) => {
        setQuery(e.target.value)
         if(e.key === "Enter"){
        setSearching(query)
      navigate(`/search/${query}`)
      setOpenSearch(false)
         }else{
            try {
                let getVideos = await fetch(`https://youtube-clone-rx4q.onrender.com/api/v1/search/${query}`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" }
                })
                const response = await getVideos.json()
                if (getVideos.status === 200) {
                    setSuggestions(response?.map((data) => data.item?.title))
                }else{
                    setSuggestions([])
                }
            } catch (err) {}
         }
    }

    return (

        <div className={openSearch ? "search-container component-page show-search" : "search-container component-page hide-search"}>
            <div className="search-input" style={{width:"100%",display:"flex"}}>
                <BsArrowLeft onClick={()=> setOpenSearch(false)} className="exit-arrow"/>
                <input type="text" placeholder='Search' onKeyDown={searchByCategory} style={{borderRadius:"40px"}}/>
            </div>

            <div className="relative-suggestions-search-yt">
                {
                    query !== ""  ?
                        <div className="suggestions-container">
                            {suggestions.length > 0 ?
                                suggestions.slice(0,10).map((data) => {
                                    return <NavLink to={`/search/${data}`} style={{ textDecoration: "none" }}>
                                        <div className='search-suggestions' onClick={()=> {setOpenSearch(false);
                                            setSearching(data)}}>
                                        <BsSearch style={{fontSize:"18px",color:"#f1f1f1",marginRight:"6px",height:"100%",position:"relative"}}/>
                    <p onClick={() => setQuery("")}> {data}</p>
                        </div>
                        </NavLink>
                                }) : null}
                        </div> : null
                }
            </div>
        </div>
    )
}

export default SearchComponentMob