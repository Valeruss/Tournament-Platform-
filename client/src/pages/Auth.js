import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, PLATFORM_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {observer} from 'mobx-react-lite'
import { Context } from '..//index';
import { login, registration } from '../http/userAPI';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(nickname, password)
            } else {
                data = await registration(nickname, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(PLATFORM_ROUTE)
            
            console.log(`Auth: ${data.id} ${data.nickname}`)
            user.setAuthUser(data)

        } catch (e) {
            alert(e.response.data.message)
        }
    }
    
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600, borderWidth: 10}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className="d-flex flex-column">

                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email..."
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    <Row className="d-flex justify-content-between mt-3 ps-3 pe-3"> 
    {/* ТВАРЬ ЛОМАЕТ КНОПКУ */}
                        {isLogin ?
                            <div>
                                Don`t have an account ? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
                            </div>
                            :
                            <div>
                                Have an account ? <NavLink to={LOGIN_ROUTE}>Sign In!</NavLink>
                            </div>
                        }
                        
                        <Button
                            className="align-self-end"
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth