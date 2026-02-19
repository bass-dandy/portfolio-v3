import Image from 'next/image';
import React, {useState, useEffect} from 'react';

import styles from './window-drag-handle.module.css';

interface WindowDragHandleProps {
	title: string;
	iconSrc: string;
	onDragStart: (e: MouseEvent) => void;
	onDrag: (e: MouseEvent) => void;
	onDragEnd: (e: MouseEvent) => void;
}

export default function WindowDragHandle({
	title,
	iconSrc,
	onDragStart,
	onDrag,
	onDragEnd,
}: WindowDragHandleProps) {
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const handleMouseUp = (e: MouseEvent) => {
			if (isDragging) {
				onDragEnd(e);
				setIsDragging(false);
			}
		};
		window.addEventListener('mouseup', handleMouseUp);
		return () => window.removeEventListener('mouseup', handleMouseUp);
	}, [onDragEnd, isDragging]);

	useEffect(() => {
		const handleWindowDrag = (e: MouseEvent) => {
			if (isDragging) {
				onDrag(e);
			}
		};
		window.addEventListener('mousemove', handleWindowDrag);
		return () => window.removeEventListener('mousemove', handleWindowDrag);
	}, [isDragging, onDrag]);

	return (
		<div
			className={styles.windowHeader}
			onMouseDown={(e) => {
				onDragStart(e.nativeEvent);
				setIsDragging(true);
			}}
		>
			<Image
				src={iconSrc}
				className={styles.icon}
				alt=""
				width={50}
				height={50}
			/>
			<h2 className={styles.title}>
				{title}
			</h2>
		</div>
	);
}
