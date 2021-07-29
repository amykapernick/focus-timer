import React, {Fragment} from "react";
import ReactDom from "react-dom";

import DevStyles from './components/partials/devStyles'

import IndexPage from './pages'

import './styles/main.scss'


const App = () => {
	return (
		<Fragment>
			{process.env.NODE_ENV === `development`
				&& <DevStyles />
			}
			<IndexPage />
		</Fragment>
	)
};

ReactDom.render(<App />, document.getElementById("app"));