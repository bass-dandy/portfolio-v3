import React, {useState, useEffect} from 'react';
import styles from './clock.module.css';

function getCurrentTime() {
	const date = new Date();
	return date.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric'});
}

export default function Clock() {
	const [time, setTime] = useState(getCurrentTime());

	useEffect(() => {
		const interval = window.setInterval(() => {
			setTime(getCurrentTime());
		}, 1000);

		return () => window.clearInterval(interval);
	}, []);

	return (
		<div className={styles.clock}>
			{time}
		</div>
	);
}
