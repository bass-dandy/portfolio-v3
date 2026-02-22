import React, {useCallback, useEffect, useRef, useState} from 'react';
import classnames from 'classnames';

import {appsByName, appIsResizable, type RunningApp} from '@/apps';
import {useRunningAppContext} from '@/context';
import {clamp} from '@/util';

import Directory from '../../app-directory';
import ErrorBoundary from '../../error-boundary';
import TitleButtons, {type TitleButtonsRef} from './window-title-buttons';
import DragHandle from './window-drag-handle';
import ResizeHandle from './window-resize-handle';

import styles from './window.module.css';

function getInitialTop(
	containerHeight: number,
	windowHeight: number,
	opts?: {center: boolean}
) {
	if (opts?.center && windowHeight <= containerHeight) {
		return containerHeight / 2 - windowHeight / 2;
	}
	// randomize initial vertical position to the top 1/4 of the viewport
	return Math.random() * clamp(containerHeight - windowHeight, 0, containerHeight / 4);
}

function getInitialLeft(
	containerWidth: number,
	windowWidth: number,
	opts?: {center: boolean}
) {
	if (opts?.center && windowWidth <= containerWidth) {
		return containerWidth / 2 - windowWidth / 2;
	}
	// randomize initial horizontal position, clearing desktop icons (which are 85px wide) if able
	return containerWidth - windowWidth >= 85
		? Math.random() * (containerWidth - windowWidth - 85) + 85
		: Math.random() * Math.max(containerWidth - windowWidth, 0)
}

interface WindowProps {
	appWindow: RunningApp;
	containerWidth: number;
	containerHeight: number;
}

export default function Window({
	appWindow,
	containerWidth,
	containerHeight,
}: WindowProps) {
	const appConfig = appsByName[appWindow.name];
	const isResizable = appIsResizable(appConfig);

	const {
		killApp,
		focusApp,
		minimizeApp,
		beginAppMovement,
		endAppMovement,
		hasAppMovement,
		runningApps,
	} = useRunningAppContext();

	const [top, setTop] = useState(
		isResizable
			? getInitialTop(containerHeight, appConfig.height, {center: runningApps.length === 1})
			: 0
	);
	const [left, setLeft] = useState(
		isResizable
			? getInitialLeft(containerWidth, appConfig.width, {center: runningApps.length === 1})
			: 0
	);
	const [width, setWidth] = useState(
		isResizable ? Math.min(appConfig.width, containerWidth) : 0
	);
	const [height, setHeight] = useState(
		isResizable ? Math.min(appConfig.height, containerHeight) : 0
	);
	const [dragOffsetTop, setDragOffsetTop] = useState(0);
	const [dragOffsetLeft, setDragOffsetLeft] = useState(0);
	const [isMaximized, setIsMaximized] = useState(false);

	const headerRef = useRef<HTMLDivElement>(null);
	const titleButtonsRef = useRef<TitleButtonsRef>(null);

	useEffect(() => {
		titleButtonsRef.current?.focus();
	}, []);

	useEffect(() => {
		// shift focus if window was just unminimized
		if (!appWindow.isMinimized) {
			titleButtonsRef.current?.focus();
		}
	}, [appWindow.isMinimized]);

	const handleDragStart = useCallback((e: MouseEvent) => {
		if (isMaximized) {
			if (e.clientX < left) {
				setDragOffsetLeft(
					Math.min(e.clientX, Math.ceil(width / 2))
				);
			} else if (e.clientX > left + width) {
				setDragOffsetLeft(
					Math.max(
						width - (containerWidth - e.clientX),
						Math.ceil(width / 2)
					)
				);
			}
			setTop(0);
			setDragOffsetTop(e.clientY);
		} else {
			setDragOffsetLeft(e.clientX - left);
			setDragOffsetTop(e.clientY - top);
		}
		beginAppMovement(appWindow.name);
	}, [appWindow, beginAppMovement, left, top, isMaximized, containerWidth, width]);

	const handleWindowDrag = useCallback((e: MouseEvent) => {
		if (isMaximized) {
			setIsMaximized(false);
		}
		setTop(
			clamp(
				e.clientY - dragOffsetTop,
				0,
				containerHeight - (headerRef.current?.clientHeight ?? 0) - 6 // 6 = margin + border
			)
		);
		setLeft(
			clamp(
				e.clientX - dragOffsetLeft,
				-dragOffsetLeft,
				containerWidth - dragOffsetLeft
			)
		);
	}, [isMaximized, dragOffsetLeft, dragOffsetTop, containerWidth, containerHeight]);

	const handleWindowResize = useCallback((e: MouseEvent) => {
		if (!isResizable) return;

		const maxHeight = containerHeight - top;
		const maxWidth = containerWidth - left;

		setWidth(
			clamp(e.clientX - left, appConfig.minWidth, maxWidth)
		);
		setHeight(
			clamp(e.clientY - top, appConfig.minHeight, maxHeight)
		);
	}, [appConfig, left, top, containerWidth, containerHeight, isResizable]);

	const handleResizeStart = useCallback(() => {
		beginAppMovement(appWindow.name);
	}, [appWindow, beginAppMovement]);

	const handleMovementEnd = useCallback(() => {
		endAppMovement(appWindow.name);
	}, [appWindow, endAppMovement]);

	return (
		<div
			className={classnames(styles.window, {
				[styles.focused]: appWindow.isFocused,
				[styles.minimized]: appWindow.isMinimized,
				[styles.maximized]: isMaximized,
			})}
			style={{
				top,
				left,
				width: isResizable ? width : 'auto',
				height: isResizable ? height : 'auto',
			}}
			onMouseDown={() => focusApp(appWindow.name)}
		>
			<div className={styles.header} ref={headerRef}>
				<DragHandle
					title={appWindow.name}
					iconSrc={appConfig.iconSrc}
					onDragStart={handleDragStart}
					onDrag={handleWindowDrag}
					onDragEnd={handleMovementEnd}
				/>
				<TitleButtons
					ref={titleButtonsRef}
					onMinimize={() => minimizeApp(appWindow.name)}
					onMaximize={() => setIsMaximized((val) => !val)}
					onClose={() => killApp(appWindow.name)}
					canMaximize={isResizable}
					isMaximized={isMaximized}
				/>
			</div>
			<div
				className={classnames(styles.content, {
					[styles.disableSelect]: hasAppMovement(),
				})}
			>
				<ErrorBoundary onCatch={() => killApp(appWindow.name)}>
					{Array.isArray(appConfig.content) ? (
						<Directory contents={appConfig.content} />
					) : (
						<appConfig.content {...appWindow} />
					)}
				</ErrorBoundary>
			</div>
			{isResizable && !isMaximized ? (
				<div className={styles.footer}>
					<ResizeHandle
						onResizeStart={handleResizeStart}
						onResize={handleWindowResize}
						onResizeEnd={handleMovementEnd}
					/>
				</div>
			) : null}
		</div>
	);
}
