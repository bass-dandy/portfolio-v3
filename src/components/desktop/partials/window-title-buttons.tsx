import Image from 'next/image';
import React, {forwardRef, useRef, useImperativeHandle} from 'react';

import {Button} from '@/components/button';

import styles from './window-title-buttons.module.css';

export interface TitleButtonsRef {
	focus: () => void;
}

interface TitleButtonsProps {
	onMinimize: () => void;
	onMaximize: () => void;
	onClose: () => void;
	canMaximize: boolean;
	isMaximized: boolean;
}

export default forwardRef<TitleButtonsRef, TitleButtonsProps>(function TitleButtons({
	onMinimize,
	onMaximize,
	onClose,
	canMaximize,
	isMaximized,
}, ref) {
	const closeButton = useRef<HTMLButtonElement>(null);

	useImperativeHandle(ref, () => ({
		focus() {
			closeButton.current?.focus();
		}
	}));

	return (
		<div className={styles.titleButtons}>
			<Button
				className={styles.minimize}
				onClick={onMinimize}
				aria-label="minimize window"
			>
				<Image src="/img/window/minimize.png" alt="" width={50} height={50} />
			</Button>
			{canMaximize ? (
				<Button
					className={styles.maximize}
					onClick={onMaximize}
					aria-label="maximize window"
				>
					<Image
						src={isMaximized ? '/img/window/restore_down.png' : '/img/window/maximize.png'}
						alt=""
						width={50}
						height={50}
					/>
				</Button>
			) : null }
			<Button
				className={styles.close}
				onClick={onClose}
				ref={closeButton}
				aria-label="close window"
			>
				<Image src="/img/window/close.png" alt="" width={50} height={50} />
			</Button>
		</div>
	);
});
