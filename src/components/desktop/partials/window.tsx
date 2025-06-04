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
	} = useRunningAppContext();

	const [top, setTop] = useState(0);
	const [left, setLeft] = useState(0);
	const [width, setWidth] = useState(isResizable ? appConfig.width : 0);
	const [height, setHeight] = useState(isResizable ? appConfig.height : 0);
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

	const unmaximizeWithDrag = useCallback((x: number, y: number) => {
		if (x < left) {
			setDragOffsetLeft(Math.min(x, Math.ceil(width / 2)));
		} else if (x > left + width) {
			setDragOffsetLeft(
				Math.max(
					width - (containerWidth - x),
					Math.ceil(width / 2)
				)
			);
		}
		setLeft(x);
		setTop(0);
		setDragOffsetTop(y);
		setIsMaximized(false);
	}, [left, width, setIsMaximized, containerWidth]);

	const handleWindowDrag = useCallback((e: MouseEvent) => {
		if (isMaximized) {
			unmaximizeWithDrag(e.clientX, e.clientY);
		} else {
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
		}
	}, [isMaximized, dragOffsetLeft, dragOffsetTop, unmaximizeWithDrag, containerWidth, containerHeight]);

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

	return (
		<div
			className={classnames(styles.window, {
				[styles.focused]: appWindow.isFocused,
				[styles.minimized]: appWindow.isMinimized,
				[styles.maximized]: isMaximized,
			})}
			style={{ top, left, width, height }}
			onMouseDown={() => focusApp(appWindow.name)}
		>
			<div className={styles.header} ref={headerRef}>
				<DragHandle
					title={appWindow.name}
					iconSrc={appConfig.iconSrc}
					onDragStart={(e) => {
						setDragOffsetLeft(e.clientX - left);
						setDragOffsetTop(e.clientY - top);
					}}
					onDrag={handleWindowDrag}
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
			<div className={styles.content}>
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
					<ResizeHandle onResize={handleWindowResize} />
				</div>
			) : null}
		</div>
	);
}
