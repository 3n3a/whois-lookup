import { useState } from 'react';

import { Stack, Title } from '@mantine/core';

import TimeControls from './TimeControls';
import TimeOutput from './TimeOutput';
import { Config } from '../Config';
import App from './App';


export default function TimeBetween() {
	const defaultStart = Config.dayjs("07:30", Config.timeFormat).toDate();
	const defaultEnd = Config.dayjs("17:00", Config.timeFormat).toDate();
  
	const [time, setTime] = useState<[Date, Date]>([defaultStart, defaultEnd])

	return (
			<Stack>
				<Title order={1}>Time between</Title>
				<TimeControls value={time} onChange={setTime}></TimeControls>
				<TimeOutput unit='hours' output={
					Config.dayjs(time[1]).diff(Config.dayjs(time[0]), 'hours', true).toFixed(2)
				}></TimeOutput>
			</Stack>
	);
}
