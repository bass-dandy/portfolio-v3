import {AnimatePresence} from 'motion/react'
import React, {useState, useEffect, useRef} from 'react';

import {desktopApps} from '@/apps';
import {useRunningAppContext} from '@/context';

import Wallpaper from './partials/wallpaper';
import Window from './partials/window';
import DesktopIcon from '../desktop-icon';
import styles from './desktop.module.css';

export default function Desktop() {
	const container = useRef<HTMLDivElement>(null);
	const [containerHeight, setContainerHeight] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);

	const {runningApps, blurAllApps} = useRunningAppContext();

	useEffect(() => {
		const captureDesktopDimensions = () => {
			setContainerHeight(container.current?.clientHeight ?? 0);
			setContainerWidth(container.current?.clientWidth ?? 0);
		};
		captureDesktopDimensions();
		window.addEventListener('resize', captureDesktopDimensions);
		return () => window.removeEventListener('resize', captureDesktopDimensions);
	}, []);

	return (
		<div className={styles.desktop} ref={container}>
			<Wallpaper onClick={blurAllApps} />
			<div className={styles.desktopIcons}>
				{desktopApps.map((app) => (
					<DesktopIcon key={app.name} app={app} />
				))}
			</div>
			<AnimatePresence>
				{Array.from(runningApps.values()).map((app) => (
					<Window
						key={app.name}
						initial={{opacity: 0, scale: 0.95}}
						animate={{opacity: 1, scale: 1}}
						exit={{opacity: 0, scale: 0.95}}
						transition={{duration: 0.075, ease: 'easeOut'}}
						appWindow={app}
						containerWidth={containerWidth}
						containerHeight={containerHeight}
					/>
				))}
			</AnimatePresence>
		</div>
	);
}
