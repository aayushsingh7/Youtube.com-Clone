import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { AiFillHome, AiOutlineHistory, AiOutlineHome } from 'react-icons/ai';
import { MdAccessTime, MdAccessTimeFilled, MdLibraryAdd, MdOutlineLibraryAdd, MdOutlineSubscriptions, MdSubscriptions } from 'react-icons/md';
import { RiVideoFill, RiVideoLine } from 'react-icons/ri'
import { AppContext } from '../context/AppContext';

const BottomNavbar = () => {
    const {user , setSearching} = useContext(AppContext)

    let pathname = location.pathname;

    useEffect(() => {
        pathname = location.pathname;
    }, [location.pathname])


    return (
        <div className="BottomNavbar">
            <NavLink to={'/'} className="Navigate-boxes column"  onClick={()=> setSearching("")} >
                {pathname === '/' || pathname.startsWith('/watch/') ? <AiFillHome style={{ fontSize: "23px", color: "#f1f1f1" }} /> : <AiOutlineHome style={{ fontSize: "23px", color: "#f1f1f1" }} />}
                <p style={{ fontSize: "1rem",marginTop:"2px" }}>Home</p>
            </NavLink>

            <NavLink to={'/subscriptions'} className="Navigate-boxes column" onClick={()=> setSearching("")} >
                {pathname === '/subscriptions' ? <MdSubscriptions style={{ fontSize: "23px", color: "#f1f1f1" }} /> : <MdOutlineSubscriptions style={{ fontSize: "23px", color: "#f1f1f1" }} />}
                <p style={{ fontSize: "1rem",marginTop:"2px" }}>Subscriptions</p>
            </NavLink>

            <NavLink to={'/history'} className="Navigate-boxes column"  onClick={()=> setSearching("")}>
                <AiOutlineHistory style={{ fontSize: "23px", color: "#f1f1f1" }} />
                <p style={{ fontSize: "1rem",marginTop:"2px" }}>History</p>
            </NavLink>

            <NavLink to={'/watchlater'} className="Navigate-boxes column" onClick={()=> setSearching("")} >
                {pathname === '/watchlater' ? <MdAccessTimeFilled style={{ fontSize: "23px", color: "#f1f1f1" }} /> : <MdAccessTime style={{ fontSize: "23px", color: "#f1f1f1" }} />}
                <p style={{ fontSize: "1rem",marginTop:"2px" }}>Watchlater</p>
            </NavLink>
        </div>
    )
}

export default BottomNavbar