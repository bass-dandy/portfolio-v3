import Image from 'next/image';
import React, {useState, useEffect} from 'react';

import styles from './window-drag-handle.module.css';

interface WindowDragHandleProps {
	title: string;
	iconSrc: string;
	onDrag: (e: MouseEvent) => void;
	onDragStart: (e: MouseEvent) => void;
}

export default function WindowDragHandle({
	title,
	iconSrc,
	onDrag,
	onDragStart,
}: WindowDragHandleProps) {
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const handleMouseUp = () => {
			setIsDragging(false);
		};
		const handleWindowDrag = (e: MouseEvent) => {
			if (isDragging) {
				onDrag(e);
			}
		};
		window.addEventListener('mousemove', handleWindowDrag);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleWindowDrag);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging, onDrag]);

	return (
		<div
			className={styles.windowHeader}
			onMouseDown={(e) => {
				e.persist();
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
