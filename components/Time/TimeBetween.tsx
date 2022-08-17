import { useState } from 'react';

import { Stack, Title } from '@mantine/core';

import TimeControls from './TimeControls';
import TimeOutput from './TimeOutput';
import { Config } from './_Config';


export function TimeBetween() {
	const defaultStart = Config.dayjs("07:30", Config.timeFormat).toDate();
	const defaultEnd = Config.dayjs("17:00", Config.timeFormat).toDate();
  
	const [time, setTime] = useState<[Date, Date, Number]>([defaultStart, defaultEnd, 30])

	return (
			<Stack>
				<Title order={1}>Time between</Title>
				<TimeControls value={time} onChange={setTime}></TimeControls>
				<TimeOutput unit='hours' output={
					Config.dayjs(time[1]).subtract(time[2] || 0, 'minute').diff(Config.dayjs(time[0]), 'hours', true).toFixed(2)
				}></TimeOutput>
			</Stack>
	);
}
