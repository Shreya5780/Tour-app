import React, {useRef,useEffect, useContext, useState} from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './header.css';

import logo from '../../assets/images/logo.png';
import { AuthContext } from '../../context/AuthContext';

const nav__links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/tours',
    display: 'Tours',
  },
  {
    path: '/blogs',
    display: 'Blogs',
  },


];

const Header = () => {

  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const {user, dispatch} = useContext(AuthContext)

  const logout = ()=>{
    dispatch({type: 'LOGOUT'})
    navigate('/login')
  }

  const [showProfile, setShowProfile] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const viewProfile = ()=>{
    setShowProfile(prevState => !prevState);
    if (!showProfile) {
      setUserInfo(user);
    } else {
      setUserInfo(null);
    }
    // return <h5>{user.username}</h5>
  }

  const stickyHeaderFunc = ()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop >80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header')
      }else{
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

 useEffect(()=>{
    stickyHeaderFunc()

    return window.removeEventListener('scroll',stickyHeaderFunc)
 })

 const toggleMenu = ()=> menuRef.current.classList.toggle('show__menu')

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* logo  */}
            <div className="logo">
              <img src={logo} alt="" width="100px" height="100px" />
            </div>
            {/* logo end */}
            {/* menu start */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className={navClass =>navClass.isActive ? "active__link" : "" }activeClassName="active">
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* menu end */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">

                {
                  user? <>
                    <Button className='btn primary__btn' onClick={viewProfile}>Profile</Button>
                    {showProfile && userInfo && (
                      <div>
                        <h5>Username: {userInfo.username}</h5>
                        <h5>Email: {userInfo.email}</h5>
                        {/* <h5>Password: {userInfo.password}</h5> */}
                      </div>
                    )}                    
                    {/* <span className="username m-4">{user.username}</span> */}
                  <Button className='btn primary__btn' onClick={logout}>Logout</Button>
                  </> : <>
                  <Button className="btn secondary__btn">
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="btn primary__btn">
                  <Link to="/register">Register</Link>
                </Button>
                  </>
                }
                
                <Button className="btn primary__btn">
                  <Link to="/admin">Admin</Link>
                </Button>
                <Button className="btn primary__btn">
                  <Link to="/apicall">Api</Link>
                </Button>
              </div>

              <span className="mobile_menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
