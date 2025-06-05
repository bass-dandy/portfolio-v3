import React, {useEffect, useRef} from 'react';
import classnames from 'classnames';
import Image from 'next/image';

import {appsByName} from '@/apps';
import {useRunningAppContext} from '@/context';

import Clock from './partials/clock';
import StartMenu from './partials/start-menu';
import styles from './taskbar.module.css';

export default function Taskbar() {
	// appRefs.current is actually an object of refs keyed by app name
	const appRefs = useRef<Record<string, HTMLButtonElement | null>>({});
	const {runningApps, focusApp} = useRunningAppContext();

	useEffect(() => {
		const focusMinimized = (e: CustomEvent) => appRefs.current[e.detail]?.focus();
		window.addEventListener('appminimized', focusMinimized as EventListener);
		return () => window.removeEventListener('appminimized', focusMinimized as EventListener);
	}, []);

	return (
		<div className={styles.taskbar}>
			<StartMenu />
			<div className={styles.taskbarApps}>
				{runningApps.map((app) => (
					<button
						ref={(e) => {
							if (appRefs.current)
							appRefs.current[app.name] = e;
						}}
						className={classnames(styles.taskbarApp, {
							[styles.focused]: app.isFocused
						})}
						onClick={() => focusApp(app.name)}
						key={app.name}
						aria-label={!app.isFocused ? `focus ${app.name}` : ''}
					>
						<Image
							src={appsByName[app.name].iconSrc}
							alt=""
							width={50}
							height={50}
						/>
						{app.name}
					</button>
				)) }
			</div>
			<Clock />
		</div>
	);
}
