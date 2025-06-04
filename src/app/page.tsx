'use client'

import {useEffect, useState} from 'react';

import type {RunningApp} from '@/apps';
import Desktop from '@/components/desktop';
import Taskbar from '@/components/taskbar';
import {RunningAppContext} from '@/context';

import styles from "./page.module.css";

const TAB = 9;

const Home: React.FC = () => {
	const [runningApps, setRunningApps] = useState<RunningApp[]>([]);

	useEffect(() => {
		const keydownListener = (e: KeyboardEvent) => {
			if (e.keyCode === TAB) {
				document.body.classList.add(styles.keyboardAccessible);
			}
		};
		document.addEventListener('keydown', keydownListener);

		const mousedownListener = () => {
			document.body.classList.remove(styles.keyboardAccessible);
		};
		document.addEventListener('mousedown', mousedownListener);

		return () => {
			document.removeEventListener('keydown', keydownListener);
			document.removeEventListener('mousedown', mousedownListener);
		};
	}, []);

	return (
		<RunningAppContext.Provider value={{runningApps, setRunningApps}}>
			<Desktop/>
			<Taskbar/>
		</RunningAppContext.Provider>
	);
};

export default Home;
