import React, {Fragment, useEffect, useState} from 'react'
import {add, differenceInSeconds, differenceInMilliseconds} from 'date-fns'

import Button from '../parts/button'

import { timer as defaults } from '../../../_data/defaults'

import {countdownTimer, buttons, container} from './timer.module.scss'

const Timer = () => {
	const [working, toggleWorking] = useState(false)
	const [shortBreak, toggleShortBreak] = useState(false)
	const [longBreak, toggleLongBreak] = useState(false)
	const [timer, setTimer] = useState(false)
	const [currentState, setCurrentState] = useState('work')
	const [timerState, setTimerState] = useState(false)
	let countdown
	const stopTimer = () => {
		clearTimeout(countdown)
		setTimer(false)
		
		if(working) {
			toggleWorking(false)
			setCurrentState('break')
		} 

		if(shortBreak) {
			toggleShortBreak(false)
			setCurrentState('work')
		} 

		if(longBreak) {
			toggleLongBreak(false)
			setCurrentState('work')
		} 
	}
	const startTimer = (section) => {
		const duration = defaults[section] * 60
		let toggle
		let state
		
		if(section === 'shortBreak') {
			state = shortBreak
			toggle = toggleShortBreak
		}
		else {
			state = working
			toggle = toggleWorking
		}

		if(!state) {
			setTimer(duration)
			toggle(!state)
		}
		else {
			stopTimer()
		}
	}
	const formatTimer = (time) => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60

		return `${minutes} : ${seconds.toString().padStart(2, '0').slice(-2)}`
	}
	
	useEffect(() => {
		if(timer > 0) {
			countdown = setTimeout(() => {
				setTimer(timer - 1)
			}, 1000)

			if(timer < 60) {
				setTimerState('warning')
			}
			
		}
		else if(timer === 0) {
			setTimerState('end')
			stopTimer()
			setTimer(0)
		}
	}, [timer])
	

	return (
		<div className={container}>
			<div data-state={timerState} className={countdownTimer}>
				{timer > 0 
						? <p>{formatTimer(timer)}</p>
						: <p>Time's Up!</p>
					}
			</div>
			<ul className={buttons}>
				{currentState == 'work' 
					&& <li>
						<Button onClick={() => startTimer('work')}>
						<span>{working ? 'Stop' : 'Start'} Work</span>
					</Button>
					</li>
				}
				{currentState == 'break' 
					&& <Fragment>
						<li>
						<Button onClick={() => startTimer('shortBreak')}>
							<span>{shortBreak ? 'Stop' : 'Start'} Break</span>
						</Button>
						</li>
						<li>
						<Button onClick={() => startTimer('longBreak')}>
							<span>{longBreak ? 'Stop' : 'Start'} Long Break</span>
						</Button>
						</li>
					</Fragment>
				}
			</ul>
		</div>
	)
}

export default Timer