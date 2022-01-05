import React, {useContext} from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, PLATFORM_ROUTE, PROFILE_ROUTE } from '../utils/consts'
import Button from 'react-bootstrap/Button'
import {observer} from "mobx-react-lite"
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark" style={{height: 70}} className="p-0">
            <Container>
                <Navbar.Brand to={PLATFORM_ROUTE} href={PLATFORM_ROUTE}>TP</Navbar.Brand>
                {/* <NavLink style={{color: 'white'}} to={PLATFORM_ROUTE}>Tournament Platform</NavLink> */}

                {user.isAuth ?
                    <Nav className="ms-auto" style={{color: 'white', height: 70, fontSize: 20}}>

                        <div style={{fontSize: 10}}>{'Id: ' + user.authUser.id + ' | Nickname: ' + user.authUser.nickname}</div>

                        <Button 
                            variant={"outline-light"} 
                            onClick={() => history.push(PLATFORM_ROUTE)}              
                            style={{borderRadius: 0, border: 'none', fontSize: 18, width: 200}}
                        > Tournament Platform </Button>

                        <Button 
                            variant={"outline-light"} 
                            onClick={() => history.push(PROFILE_ROUTE)}              
                            style={{borderRadius: 0, border: 'none', fontSize: 18, width: 150}}
                        > Profile </Button>

                        {
                            user.authUser.role === 'ADMIN' ?
                            <Button 
                                variant={"outline-light"} 
                                onClick={() => history.push(ADMIN_ROUTE)}
                                className="ms-0"
                                style={{borderRadius: 0, border: 'none', fontSize: 18, width: 150}}
                            > Admin </Button>
                            :
                            <div></div>
                        }
                        
                        <Button 
                            variant={"outline-danger"} 
                            onClick={() => logOut()} 
                            className="ms-5"
                            style={{borderRadius: 0, border: 'none', fontSize: 18, width: 150}}
                        > Log out </Button>
                    </Nav>
                    :
                    <Nav className="ms-auto" style={{color: 'white', height: 70, fontSize: 20}}>
                        <Button 
                            variant={"outline-light"} 
                            onClick={() => history.push(PLATFORM_ROUTE)}              
                            style={{borderRadius: 0, border: 'none', fontSize: 18, width: 200}}
                        > Tournament Platform </Button>
                        
                        <Button 
                            variant={"outline-success"} 
                            onClick={() => history.push(LOGIN_ROUTE)}
                            style={{borderRadius: 0, border: 'none', fontSize: 18, width: 150, color: 'white'}}
                        > Sign In </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
})

export default NavBar