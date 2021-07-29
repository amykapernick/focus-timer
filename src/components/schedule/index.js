import { format, getDay, parse, isBefore } from 'date-fns'
import React, { Fragment, useEffect, useState } from 'react'

import schedules from '../../../_data/times'

import {block, scheduleContainer} from './schedule.module.scss'

const Schedule = () => {
	const today = getDay(new Date())
	const [day, setDay] = useState(schedules[today] || [])
	const formatTime = (time) => {
		const timeObj =  parse(time, 'h:mmaaaaa', new Date())
		return format(timeObj, 'h:mm aaa')
	}
	const checkCurrent = () => {
		day.some((section, i) => {
			const timeObj = parse(section.start, 'h:mmaaaaa', new Date())
		
			if(isBefore(timeObj, new Date())) {
				const nextSection = day[i+1]
				const nextSectionTime = parse(nextSection.start, 'h:mmaaaaa', new Date())
	
				if(isBefore(nextSectionTime, new Date())) {
					return false
				}
				else {
					section.current = true
				}
			}
	
			return false
		})
	}
	

	checkCurrent()

	useEffect(() => {
		const cron = () => {
			setTimeout(() => {
				checkCurrent()
				cron()
			}, 60000) //Run Every 5 minutes
		}

		cron()
	}, [])

	return (
		<div className={scheduleContainer}>
			<h2>Schedule</h2>
			<ul>
				{day.map(section => (
					<li key={section.start} data-current={section.current} className={block}>
						<p>{formatTime(section.start)}</p>
						{section.end && <p>End: {formatTime(section.end)}</p>}
						<p>{section.label}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Schedule