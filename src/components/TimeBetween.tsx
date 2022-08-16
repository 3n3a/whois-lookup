import { useState } from 'react';

import { TimeInput } from '@mantine/dates';
import TimeControls from './TimeControls';
import TimeOutput from './TimeOutput';
import { Stack, Title } from '@mantine/core';
import { Config } from '../Config';


export default function TimeBetween() {
	const defaultStart = Config.dayjs("07:30", Config.timeFormat).toDate();
	const defaultEnd = Config.dayjs("17:00", Config.timeFormat).toDate();
  
	const [time, setTime] = useState<[Date, Date]>([defaultStart, defaultEnd])


	const handleTimeChange = e => {
		console.log(e)
		setTime(e)
	}

	return (
		<>
			<Stack>
				<Title order={1}>Time between</Title>
				<TimeControls value={time} onChange={handleTimeChange}></TimeControls>
				<TimeOutput output="Test Output"></TimeOutput>
				<pre>
					{Config.dayjs(time[0]).format(Config.timeFormat)}
				</pre>
				<pre>
					{Config.dayjs(time[1]).format(Config.timeFormat)}
				</pre>
			</Stack>
		</>
	);
}
