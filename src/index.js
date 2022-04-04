import React, { Fragment } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DevStyles from './components/partials/devStyles';

import IndexPage from './pages';
import SchedulePage from "./pages/schedule";

import './styles/main.scss';

const App = () => (
	<Fragment>
		{process.env.NODE_ENV === `development`
				&& <DevStyles />
		}
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<IndexPage />} />
				<Route path="/schedule" element={<SchedulePage />} />
			</Routes>
		</BrowserRouter>
	</Fragment>
);

createRoot(document.querySelector(`#app`)).render(<App />);
