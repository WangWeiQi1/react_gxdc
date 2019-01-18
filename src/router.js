import React from 'react'

import App from './App'

import {
	HashRouter as Router,
	Route,
	Switch
} from 'react-router-dom'

import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/nomatch'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tab from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import LoginForm from './pages/form/login'
import RegisterForm from './pages/form/register'
import BasicTable from './pages/table/basicTable'

export default class IRouter extends React.Component {
	render() {
		return (
			<Router>
           		<App>
           			<Route path="/login" component={Login} />
           			<Route path="/admin" render={() => 
						<Admin>
							<Switch>
								<Route path="/admin/ui/buttons" component={Buttons} />
								<Route path="/admin/ui/modals" component={Modals} />
								<Route path="/admin/ui/loadings" component={Loadings} />
								<Route path="/admin/ui/notification" component={Notice} />
								<Route path="/admin/ui/messages" component={Messages} />
								<Route path="/admin/ui/tabs" component={Tab} />
								<Route path="/admin/ui/gallery" component={Gallery} />
								<Route path="/admin/ui/carousel" component={Carousel} />
								<Route path="/admin/form/login" component={LoginForm} />
								<Route path="/admin/form/reg" component={RegisterForm} />
								<Route path="/admin/table/basic" component={BasicTable} />
								<Route component={NoMatch} />
							</Switch>
						</Admin>
           			} />
           			<Route path="/order/detail" component={Login} />
           		</App>
           	</Router>
		)
	}
}