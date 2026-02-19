import {useEffect, useState} from 'react';

import styles from './window-resize-handle.module.css';

interface WindowResizeHandleProps {
	onResizeStart: (e: MouseEvent) => void;
	onResize: (e: MouseEvent) => void;
	onResizeEnd: (e: MouseEvent) => void;
}

export default function WindowResizeHandle({onResizeStart, onResize, onResizeEnd}: WindowResizeHandleProps) {
	const [isResizing, setIsResizing] = useState(false);

	useEffect(() => {
		const handleMouseUp = (e: MouseEvent) => {
			if (isResizing) {
				onResizeEnd(e);
				setIsResizing(false);
			}
		};
		window.addEventListener('mouseup', handleMouseUp);
		return () => window.removeEventListener('mouseup', handleMouseUp);
	}, [onResizeEnd, isResizing]);

	useEffect(() => {
		const handleWindowResize = (e: MouseEvent) => {
			if (isResizing) {
				onResize(e);
			}
		};
		window.addEventListener('mousemove', handleWindowResize);
		return () => window.removeEventListener('mousemove', handleWindowResize);
	}, [isResizing, onResize]);

	return (
		<div
			className={styles.resizeHandle}
			onMouseDown={(e) => {
				onResizeStart(e.nativeEvent)
				setIsResizing(true);
			}}
		/>
	);
}
