import React, { useContext } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import { Context } from '../index';
import { authRoute, publicRoute } from '../routes';
import { PLATFORM_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite'

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return(
        <Switch>
            {user.isAuth && authRoute.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact />
            )}
            {publicRoute.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={PLATFORM_ROUTE} />
        </Switch>
    )
})

export default AppRouter