import React, { useContext, useEffect, useRef } from 'react'
import { AiFillHome, AiOutlineHistory, AiOutlineHome, AiOutlineLogout } from 'react-icons/ai';
import { MdAccessTime, MdAccessTimeFilled, MdLibraryAdd, MdOutlineLibraryAdd, MdOutlineSubscriptions, MdSubscriptions } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { RiVideoFill, RiVideoLine } from 'react-icons/ri'
import { AppContext } from '../context/AppContext';

const SideNavbar = () => {
  let pathname = location.pathname;
  const { openSideNav, setOpenSideNav, user , subscribedTo,subscribedCreatorList,windowWidth} = useContext(AppContext)


  useEffect(() => {
    pathname = location.pathname;
  }, [location.pathname])

  const scrollToTop = () => {
    scrollTo(0, 0)
    if(windowWidth < 1400){
      setOpenSideNav(false)
    }
  }

  useEffect(() => {
    if (openSideNav && pathname.startsWith('/watch')) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "scroll"
    }
  }, [openSideNav])

  

  return (
    <>

      <div onClick={()=> setOpenSideNav(false)}  className={openSideNav ? "rgba-container show-container" : "rgba-container hide-container"}></div>
      <div className={pathname.includes('/watch/') ? openSideNav ? "SideNavbar abosolute openabsolute" : "SideNavbar abosolute closeaboslute" : openSideNav ? "SideNavbar open" : "SideNavbar close"} id="sidenavbar">
        <div className="First-section">
          <NavLink to={'/'} className="Navigate-boxes" onClick={scrollToTop}>
            {pathname === '/' ? <AiFillHome style={{ fontSize: "23px", color: "#f1f1f1" }} /> : <AiOutlineHome style={{ fontSize: "23px", color: "#f1f1f1" }} />}
            <p style={{ marginLeft: "20px", fontSize: "1rem", position: "relative", top: "2px" }}>Home</p>
          </NavLink>

          <NavLink to={'/subscriptions'} className="Navigate-boxes" style={{ marginTop: "5px" }} onClick={scrollToTop}>
            {pathname === '/subscriptions' ? <MdSubscriptions style={{ fontSize: "23px", color: "#f1f1f1" }} /> : <MdOutlineSubscriptions style={{ fontSize: "23px", color: "#f1f1f1" }} />}
            <p style={{ marginLeft: "20px", fontSize: "1rem" }}>Subscriptions</p>
          </NavLink>
        </div>

        <div className="Second-section" style={{ marginTop: "10px" }}>
          <NavLink to={'/history'} className="Navigate-boxes" style={{ marginTop: "5px" }} onClick={scrollToTop}>
            <AiOutlineHistory style={{ fontSize: "23px", color: "#f1f1f1" }} />
            <p style={{ marginLeft: "20px", fontSize: "1rem" }}>History</p>
          </NavLink>

          <NavLink to={!user._id ? `/login` : `/profile/${user._id}`} className="Navigate-boxes" style={{ marginTop: "5px" }} onClick={scrollToTop}>
            {pathname === '/your/video' ? <RiVideoLine style={{ fontSize: "23px", color: "#f1f1f1" }} /> : <RiVideoFill style={{ fontSize: "23px", color: "#f1f1f1" }} />}
            <p style={{ marginLeft: "20px", fontSize: "1rem" }}>Your video</p>
          </NavLink>

          <NavLink to={'/watchlater'} className="Navigate-boxes" style={{ marginTop: "5px" }} onClick={scrollToTop}>
            {pathname === '/watchlater' ? <MdAccessTimeFilled style={{ fontSize: "23px", color: "#f1f1f1" }} /> : <MdAccessTime style={{ fontSize: "23px", color: "#f1f1f1" }} />}
            <p style={{ marginLeft: "20px", fontSize: "1rem" }}>Watchlater</p>
          </NavLink>

          {
            !user._id ? null :
             <NavLink to={'/logout'} className="Navigate-boxes logout" style={{ marginTop: "5px" }} 
             onClick={() => setOpenSideNav(false)}>
              <AiOutlineLogout style={{ fontSize: "23px", color: "#f1f1f1" }} />
              <p style={{ marginLeft: "20px", fontSize: "1rem" }}>Logout</p>
            </NavLink>
          }

        </div>



        <div className="Third-section">
          {!user._id ? <NavLink to={'/login'}> <button className='sign-in-user' style={{ width: "100%", fontSize: "1.3rem", padding: "9px" }}>Login</button> </NavLink> :
            <>
              <p style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#f1f1f1" }}>Subscriptions</p>
              {
                subscribedCreatorList?.length > 0 ? subscribedCreatorList.filter((creator, index, self) =>
                index === self.findIndex((c) => c._id === creator._id)).map((response) => {
                  return (<NavLink to={`/profile/${response._id}`} className="Navigate-boxes" style={{ marginTop: "5px" }}
                    onClick={scrollToTop} key={response._id}>
                    <img src={response.picture} alt="" />
                    <p style={{ marginLeft: "20px", fontSize: "1rem" }}>{response.name}</p>
                  </NavLink>)
                }) : <p style={{ fontSize: "1rem", marginTop: "10px", color: "#aaa" }}>No Subscription Yet</p>}</>
          }
        </div>
      </div>
    </>
  )
}

export default SideNavbar