import React, { useState } from 'react'
import classes from './navbar.module.css'
import {Link, useNavigate} from 'react-router-dom'
import {BsHouseDoor} from 'react-icons/bs'
import {useDispatch, useSelector} from 'react-redux'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { logout } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'
import { GiHamburgerMenu } from 'react-icons/gi'


const Navbar = () => {
  const [state, setState] = useState({})
  const [photo, setPhoto] = useState("")
  const [showForm, setShowForm] = useState(false)
  const {user, token} = useSelector((state) => state.auth)
  const [showMobileNav, setShowMobileNav] =useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout =() => {
    dispatch(logout())
    navigate("/signin")
  }

  const handleState = (e) => {
    setState(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setPhoto(null)
    setState({})
  }

  const handleListProperty = async(e) => {
    e.preventDefault()

    let filename = null
    if(photo){
      const formData = new FormData()
      filename = crypto.randomUUID() + photo.name
      formData.append("filename", filename)
      formData.append("image", photo)

      await request('/upload/image', "POST", {}, formData, true)
    } else {
      return
    }

    try {
      const options = {
        'Authorization': `Bearer${token}`,
        'Content-Type': 'application/json'
      }

      await request('/property', 'POST', options, {...state, img: filename})
      handleCloseForm()
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to='/' className={classes.left}>
          Apex House Rentals <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
          <li className={classes.listItem}>Home</li>
          <li className={classes.listItem}>About</li>
          <li className={classes.listItem}>Featured</li>
          <li className={classes.listItem}>Contacts</li>
        </ul>
        <div className={classes.right}>
              {
              !user ?
              <> 
                 <Link to='/signup'>Sign up</Link>
                 <Link to='/signin'>Sign in</Link>
              </> 
              : 
              <>
                 <span>Hello {user.username}</span>
                 <span onClick={handleLogout} className={classes.logoutBtn}>Logout</span>
                 <Link onClick={() => setShowForm(true)} className={classes.list}>List your property</Link>
              </>
              } 
        </div>
      </div>
      {
        showForm && (
          <div className={classes.listPropertyForm} onClick={handleCloseForm}>
            <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
              <h2>List Property</h2>
              <form onSubmit={handleListProperty}>
              <input type="text" placeholder='Title...' name='title' onChange={handleState}/>
                <input type="text" placeholder='Type...' name='type' onChange={handleState}/>
                <input type="text" placeholder='Desc...' name='desc' onChange={handleState}/>
                <input type="text" placeholder='Location...' name='location' onChange={handleState}/>
                <input type="number" placeholder='Price...' name='price' onChange={handleState}/>
                <input type="number" placeholder='Sq. meters...' name='sqmeters' onChange={handleState}/>
                <input type="number" placeholder='Baths...' name='baths' step={1} min={2} onChange={handleState}/>
                
                <div style={{display: 'flex',alignItems: 'center',gap: '12px',width: '50%',color: 'black'}}>
                  <label htmlFor='photo'>Property picture <AiOutlineFileImage/> </label>
                  <input 
                    type="file" 
                    id="photo" 
                    style={{display:'none'}}
                      onChange={(e) => setPhoto(e.target.files[0])}
                      />
                      {photo && <p>{photo.name}</p>}
                </div>
                <button>List Property</button>
                <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/>
                
              </form>

            </div>

          </div>
        )
      }
      {
        <div className={classes.mobileNav}>
          {showMobileNav &&
          <div className={classes.navigation}>
        <Link to='/' className={classes.left}>
          Apex House Rentals <BsHouseDoor />
        </Link>
        <AiOutlineClose onClick={() => setShowMobileNav(false)} className={classes.mobileCloseIcon}/>
        <ul className={classes.center}>
          <li className={classes.listItem}>Home</li>
          <li className={classes.listItem}>About</li>
          <li className={classes.listItem}>Featured</li>
          <li className={classes.listItem}>Contacts</li>
        </ul>
        <div className={classes.right}>
              {
              !user ?
              <> 
                 <Link to='/signup'>Sign up</Link>
                 <Link to='/signin'>Sign in</Link>
              </> 
              : 
              <>
                 <span>Hello {user.username}</span>
                 <span onClick={handleLogout} className={classes.logoutBtn}>Logout</span>
                 <Link onClick={() => setShowForm(true)} className={classes.list}>List your property</Link>
              </>
              } 
        </div>
        {
          showForm && showMobileNav && (
            <div className={classes.listPropertyForm} onClick={handleCloseForm}>
            <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
              <h2>List Property</h2>
              <form onSubmit={handleListProperty}>
              <input type="text" placeholder='Title...' name='title' onChange={handleState}/>
                <input type="text" placeholder='Type...' name='type' onChange={handleState}/>
                <input type="text" placeholder='Desc...' name='desc' onChange={handleState}/>
                <input type="text" placeholder='Location...' name='location' onChange={handleState}/>
                <input type="number" placeholder='Price...' name='price' onChange={handleState}/>
                <input type="number" placeholder='Sq. meters...' name='sqmeters' onChange={handleState}/>
                <input type="number" placeholder='Baths...' name='baths' step={1} min={2} onChange={handleState}/>
                
                <div style={{display: 'flex',alignItems: 'center',gap: '12px',width: '50%'}}>
                  <label htmlFor='photo'>Property picture <AiOutlineFileImage/> </label>
                  <input 
                    type="file" 
                    id="photo" 
                    style={{display:'none'}}
                      onChange={(e) => setPhoto(e.target.files[0])}
                      />
                      {photo && <p>{photo.name}</p>}
                </div>
                <button>List Property</button>
                <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/>
                
              </form>

            </div>

          </div>
          )
        }
      </div>
     }
     {!showMobileNav && <GiHamburgerMenu onClick={() => setShowMobileNav(prev => !prev)} className={classes.hamburgerIcon}/>}
    </div>
  }
  </div>
  )

}

export default Navbar