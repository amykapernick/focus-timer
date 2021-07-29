import React from "react";
import ReactDom from "react-dom";

import IndexPage from './pages'

import './styles/main.scss'


const App = () => {
	return (
		<IndexPage />
	)
};

ReactDom.render(<App />, document.getElementById("app"));