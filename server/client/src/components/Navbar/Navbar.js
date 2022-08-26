import React, { useState, useEffect } from 'react'
import memoriesText from "../../images/memories-Text.png"
import memoriesLogo from "../../images/memories-Logo.png"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import * as styled from "./styles.js"
import { decode } from "jsonwebtoken"
import { Button, Box } from '@mui/material'

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")))
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
    }, [location])

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        setUser(JSON.parse(localStorage.getItem("profile")))
        navigate("/")
    }

    return (
        <styled.appbar position="static" color="inherit">
            <Link sx={styled.brandContainer} to="/">
                <styled.textLogo src={memoriesText} alt="icon" height="45px" />
                <styled.imgLogo src={memoriesLogo} alt="memories" height="40px" />
            </Link>

            <styled.toolbar>
                {user ?
                    (<styled.profile >
                        <Box sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }} >
                            <styled.purple alt={user.result.name} src={user.result.imageUrl} >{user.result.name.charAt(0)}</styled.purple>
                            <h5 style={styled.userName} >{user.result.name}</h5>
                        </Box>
                        <Button sx={styled.logout} variant="contained" color='error' onClick={logout}  >Logout</Button>
                    </styled.profile>)
                    : (<Button component={Link} to="/auth" variant="contained" color="primary" onClick={() => { }} >Sign In</Button>)}
            </styled.toolbar>
        </styled.appbar>

    )
}

export default Navbar