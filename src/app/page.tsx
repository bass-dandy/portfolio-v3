'use client'

import {enableMapSet} from 'immer';
import {useEffect, useState} from 'react';

import {appsByName, type AppName, type RunningApp} from '@/apps';
import Desktop from '@/components/desktop';
import Taskbar from '@/components/taskbar';
import {RunningAppContext} from '@/context';

import styles from './page.module.css';

enableMapSet();
const TAB = 9;

const Home: React.FC = () => {
	const [runningApps, setRunningApps] = useState(new Map<AppName, RunningApp>());
	const [renderOrder, setRenderOrder] = useState<AppName[]>([]);

	useEffect(() => {
		setRunningApps(new Map([
			['About Me', {
				...appsByName['About Me'],
				isFocused: true,
				isMinimized: false,
				isMoving: false,
			}]
		]));
		setRenderOrder(['About Me'])

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
		<RunningAppContext.Provider
			value={{
				runningApps,
				setRunningApps,
				renderOrder,
				setRenderOrder,
			}}
		>
			<Desktop/>
			<Taskbar/>
		</RunningAppContext.Provider>
	);
};

export default Home;
