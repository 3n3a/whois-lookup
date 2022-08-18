import { useState } from 'react';

import { Stack, Title } from '@mantine/core';

import TimeControls from './TimeControls';
import TimeOutput from './TimeOutput';
import { Config } from './_Config';


//@ts-ignore
function calculateTime(start, end, breakTime): number {
	breakTime = Number(breakTime)
	if (breakTime > 0) {
		return Number(Config.dayjs(end).subtract(breakTime, 'minute').diff(Config.dayjs(start), 'hours', true).toFixed(2))
	}
	return Number(Config.dayjs(end).diff(Config.dayjs(start), 'hours', true).toFixed(2))
}

export function TimeBetween() {
	const defaultStart = Config.dayjs("07:30", Config.timeFormat).toDate();
	const defaultEnd = Config.dayjs("17:00", Config.timeFormat).toDate();
  
	const [time, setTime] = useState<[Date, Date, String]>([defaultStart, defaultEnd, '30'])

	

	return (
			<Stack>
				<Title order={1}>Time between</Title>
				<TimeControls value={time} onChange={setTime}></TimeControls>
				<TimeOutput unit='hours' output={calculateTime(...time)}></TimeOutput>
			</Stack>
	);
}
