import {
	addMinutes, differenceInMinutes, format, getDay, isAfter, isBefore, isEqual, isTomorrow, parse, set
} from 'date-fns';
import React, { Fragment, useEffect, useState } from 'react';

import scheduleData from '../../../../_data/schedule';

import styles from './schedule.module.scss';

const Schedule = () => {
	const startTime = set(new Date(), {
		hours: 6,
		minutes: 0,
		seconds: 0,
		milliseconds: 0
	});
	const endTime = set(new Date(), {
		hours: 18,
		minutes: 0,
		seconds: 0,
		milliseconds: 0
	});
	const schedule = Object.keys(scheduleData).map((key) => {
		const daySlots = scheduleData[key].map((item, i) => {
			const start = parse(
				item.start,
				`h:mmaaaaa`,
				new Date()
			);
			const startRow = (differenceInMinutes(start, startTime) / 15) + 1;
			const end = item.end
				? parse(
					item.end,
					`h:mmaaaaa`,
					new Date()
				)
				: parse(
					scheduleData[key][i + 1].start,
					`h:mmaaaaa`,
					new Date()
				);
			const rows = differenceInMinutes(end, start) / 15;

			return ({
				...item,
				start,
				startRow,
				end,
				rows
			});
		});
		return ({
			day: key,
			slots: daySlots
		});
	});
	const currentDay = schedule[getDay(new Date()) - 1];
	const [currentSlot, setSlot] = useState(false);
	const times = [];

	const checkCurrent = (d, s, e) => isAfter(d, s) && isBefore(d, e);

	console.log({ currentDay });

	let genTime = startTime;

	do {
		times.push(format(genTime, `h:mm aaa`));
		genTime = addMinutes(genTime, 15);
	} while (isBefore(genTime, endTime) || isEqual(genTime, endTime));

	useEffect(() => {
		setSlot(new Date());
		const interval = setInterval(() => {
			document.querySelector(`#current`).scrollIntoView({ behavior: `smooth`, block: `center` });
			setSlot(new Date());
		}, 1000 * 60);

		return () => clearInterval(interval);
	}, []);

	return (
		<ul className={styles.schedule} data-active={!!currentSlot}>
			<li className={styles.column}>
				<p className={styles.title}>Time</p>
				<ul className={styles.times}>
					{times.map((time) => (
						<li key={time}>{time}</li>
					))}
				</ul>
			</li>
			{schedule.map(({ day, slots }) => (
				<li className={styles.column} key={day}>
					<p className={styles.title}>{day}</p>
					<ul className={styles.slots}>
						{slots.map((item) => {
							const current = day === currentDay?.day
								&& checkCurrent(currentSlot, item.start, item.end);
							const props = {
								'data-current': current
							};

							if (current) {
								props.id = `current`;
							}
							return (
								<li
									{...props}
									className={styles[item.type]}
									key={item.start}
									style={{
										'--rows': item.rows,
										'--row_start': item.startRow
									}}
								>
									{item.label}
								</li>
							);
						})}
						{day === currentDay?.day
							&& <li
								className={styles.marker}
								style={{
									'--row_start': (Math.floor(differenceInMinutes(currentSlot, startTime) / 15)) + 1,
									'--rows': 1
								}}
							>
									Current Time(ish)
							</li>
						}
					</ul>
				</li>
			))}
		</ul>
	);
};

export default Schedule;
