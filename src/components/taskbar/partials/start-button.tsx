import Image from 'next/image';
import React, {useState, useRef} from 'react';
import classnames from 'classnames';

import {useRunningAppContext} from '@/context';

import StartMenu from './start-menu';
import styles from './start-button.module.css';

const ESC = 27;

export default function StartButton() {
	const [isOpen, setIsOpen] = useState(false);
	const startButton = useRef<HTMLButtonElement>(null);
	const {launchApp} = useRunningAppContext();

	return (
		<div
			className={styles.wrapper}
			onKeyDown={(e) => {
				if (isOpen && e.keyCode === ESC) {
					setIsOpen(false);
					startButton.current?.focus();
				}
			}}
		>
			<button
				ref={startButton}
				className={classnames(styles.startButton, {
					[styles.active]: isOpen
				})}
				onClick={() => setIsOpen(!isOpen)}
				aria-label="open app drawer"
			>
				<Image src="/img/start.png" alt="" width={178} height={178} />
				Start
			</button>
			{isOpen ? (
				<StartMenu
					launchApp={(app) => {
						// timeout prevents the window from closing as soon as it opens when using keyboard controls
						window.setTimeout(() => launchApp(app), 10);
						setIsOpen(false);
					}}
					onClose={() => setIsOpen(false)}
				/>
			) : null}
		</div>
	);
}
