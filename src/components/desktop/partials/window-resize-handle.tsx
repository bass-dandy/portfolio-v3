import {useEffect, useState} from 'react';

import styles from './window-resize-handle.module.css';

interface WindowResizeHandleProps {
	onResize: (e: MouseEvent) => void;
}

export default function WindowResizeHandle({onResize}: WindowResizeHandleProps) {
	const [isResizing, setIsResizing] = useState(false);

	useEffect(() => {
		const handleMouseUp = () => {
			setIsResizing(false);
		};
		const handleWindowResize = (e: MouseEvent) => {
			if (isResizing) {
				onResize(e);
			}
		};
		window.addEventListener('mousemove', handleWindowResize);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleWindowResize);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isResizing, onResize]);

	return (
		<div
			className={styles.resizeHandle}
			onMouseDown={(e) => {
				e.persist();
				setIsResizing(true);
			}}
		/>
	);
}
