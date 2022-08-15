import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import './Counter.css';
import * as dayjs from 'dayjs'
import 'dayjs/locale/de-ch'
dayjs.locale('de-ch')

export default function Counter({ children }) {
	//const [time, setTime] = useState(0);
	const time = dayjs().diff(dayjs().add(8, 'hours'), 'hours', true)

	return (
		<>
			<div class="counter">
				<pre>{time} hours</pre>
			</div>
			<div class="counter-message">{children}</div>
		</>
	);
}
