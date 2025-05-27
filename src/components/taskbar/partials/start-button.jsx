import Image from 'next/image';
import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import classnames from 'classnames';
import StartMenu from './start-menu';

import {launchApp} from '@/redux/windows';

import styles from './start-button.module.css';

const ESC = 27;

export default function StartButton() {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const startButton = useRef(null);

	return (
		<div
			className={styles.wrapper}
			onKeyDown={(e) => {
				if (isOpen && e.keyCode === ESC) {
					setIsOpen(false);
					startButton.current.focus();
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
			{ isOpen ? (
				<StartMenu
					launchApp={(app) => {
						// timeout prevents the window from closing as soon as it opens when using keyboard controls
						window.setTimeout(() => dispatch(launchApp(app)), 10);
						setIsOpen(false);
					}}
					close={() => setIsOpen(false)}
				/>
			) : null }
		</div>
	);
}
