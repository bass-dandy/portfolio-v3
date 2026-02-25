import classnames from 'classnames';
import {motion} from 'motion/react'
import {useMemo, useRef} from 'react';

import type {AppName, RunningApp} from '@/apps';
import styles from './window-mover.module.css';

// minimize window to taskbar with fly in/out effect
function getMinimizeTarget(appName: AppName, element: HTMLDivElement) {
	const taskbarBtnRect = document
		.getElementById(`taskbar-${appName.replace(' ', '-')}`)
		?.getBoundingClientRect();

	return taskbarBtnRect ? {
		left: taskbarBtnRect.left,
		top: taskbarBtnRect.top,
		scale: taskbarBtnRect.width / element.getBoundingClientRect().width,
		visibility: 'hidden',
	} : {};
}

// This component handles window placement and animates the transitions between window states.
// State management and content rendering are handled elsewhere
function WindowMover({
	appWindow,
	isMaximized,
	top,
	left,
	width,
	height,
	children,
}: {
	appWindow: RunningApp;
	isMaximized: boolean;
	top: number;
	left: number;
	width?: number;
	height?: number;
	children: React.ReactNode;
}) {
	const ref = useRef<HTMLDivElement>(null);

	// this value must be memoized to avoid re-calculating an incorrect size while the window is minimized
	const minimizeTarget = useMemo(() => {
		return appWindow.isMinimized && ref.current
			? getMinimizeTarget(appWindow.name, ref.current)
			: undefined;
	}, [appWindow.name, appWindow.isMinimized]);

	return (
		<motion.div
			ref={ref}
			className={classnames(styles.windowMover, {
				[styles.focused]: appWindow.isFocused,
				[styles.maximized]: isMaximized,
			})}
			style={isMaximized ? {
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
			} : {
				top,
				left,
				width: width ?? 'auto',
				height: height ?? 'auto',
			}}
			animate={minimizeTarget}
			transition={appWindow.isMinimized ? {
				left: {duration: 0.25, ease: 'easeIn'},
				top: {duration: 0.25, ease: 'easeIn', delay: 0.05},
				scale: {duration: 0.25, ease: 'easeIn'},
				visibility: {delay: 0.3},
			} : {
				left: {duration: 0.25, ease: 'easeInOut', delay: 0.05},
				top: {duration: 0.25, ease: 'easeOut'},
				scale: {duration: 0.25, ease: 'easeInOut', delay: 0.05},
				visibility: {delay: 0},
			}}
		>
			{children}
		</motion.div>
	);
}

export default WindowMover;
