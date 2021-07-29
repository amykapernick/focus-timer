import React, {Fragment} from 'react'
import Schedule from '../components/schedule'

import Timer from '../components/timer'

import {page} from '../styles/pages/index.modules.scss'

const IndexPage = () => (
	<div className={page}>
		<Timer />
		<Schedule />
	</div>
)

export default IndexPage