import React, { useState, useContext } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoNotifications } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Context } from '../../../Front-End/src/Context/StoreContext';


const Navbar = () => {
    const navigate = useNavigate();
    const {token, setIsLoggedIn, setUser} = useContext(Context)
    const navList = [
        {
            title:'Home',
            li:true
        },{
            title:'my-jobs',
            li:true
        },{
            title:'Applications',
            li:true
        },
        {
            title:'post-job',
            li:true
        },
        {
            component:<IoNotifications />,
            url:'/notifications',
            li:false,
            className:'notifications'
            

        },
        { component:<MdOutlineMessage />
        ,
            url:'/dms',
            li:false,
            className:'dms'
        },{
            component:<FaUserAlt />,
            url:'/profile',
            li:false,
            className:'profile'
        }

    ]
    const [active, setActive] = useState('Home');

    const handleActive = (active)=>{
            setActive(active);
    }

    const handleClickIcons = (url)=>{
        if(url==='/profile'){
            
        }
    }

    const logOut = ()=>{
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login')
        
    }
    const gotoJobSeeker = ()=>{
        setUser("EMPLOYEE");
        navigate('/')
    }

    
  return (
    <nav className='navbar'>
     <Link to='/home'> <h3 className='logo'>Job<span>Dekho</span></h3></Link>
      <div className="navbar-right">
        <ul className='links'>
            <a href="/home">Home </a>
            <a href="/my-jobs">My Jobs</a>
            <a href="/applications">Applications</a>
            <a href="/post-job">Post a Job</a>
        </ul>
        {
            !token ? <button>Sign Up</button>:<div className='profile'> <FaUserAlt />
            <ul className='dropdown'>
                <li>My profile</li>
                <li onClick={gotoJobSeeker}>For Job seeker</li>
                <li onClick={logOut}>Log out</li>
            </ul>
            </div> 
        }

        {/* {
            navList.map((item,i)=>{
                if(item.li){
                    return(
                        <Link onClick={()=>handleActive(item.title)} className={active===item.title?'active':''} key={i} to={'/'+item.title}>{item.title}</Link>
                    )
                }
                else{
                    return(<div onClick={()=>handleClickIcons(item.url)} className={item.className} key={i}>{item.component}
                    </div>)
                }
            })
        } */}
            
      </div>
      <div className="profile-logout">
                
            </div>
    </nav>
  )
}

export default Navbar
