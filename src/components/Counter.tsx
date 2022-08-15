import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import './Counter.css';

//@ts-ignore
import dayjs from 'dayjs'
//@ts-ignore
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/de-ch'
dayjs.locale('de-ch')
dayjs.extend(customParseFormat)

export default function Counter({ children }) {
	const inputTimeFormat = 'hh:mm'
	const [time, setTime] = useState(0);
	const [start, setStart] = useState(dayjs())
	const [end, setEnd] = useState(dayjs())

	const updateStart = (e) => {
		setStart(
		  dayjs(e.target.value, inputTimeFormat)
	    )
		
		updateTime()
	}
	const updateEnd = (e) => {
		setEnd(
		  dayjs(e.target.value, inputTimeFormat)
	    )
		
		updateTime()
    }

	const updateTime = () => setTime(
		end.diff(
		    start, 'hours', true
	    ).toFixed(2)
	)

	return (
		<>
		    <input type='time' onChange={updateStart} />
			<p>Start: {start.format(inputTimeFormat)}</p>
			<input type="time" onChange={updateEnd} />
			<p>End: {end.format(inputTimeFormat)}</p>
			<div class="counter">
				<pre>{time} hours</pre>
			</div>
			<div class="counter-message">{children}</div>
		</>
	);
}
