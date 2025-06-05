import Image from 'next/image';
import React, {useState, useRef} from 'react';
import classnames from 'classnames';

import {desktopApps} from '@/apps';
import {useRunningAppContext} from '@/context';
import useClickOutside from '@/hooks/useClickOutside';

import StartMenuAppList from './start-menu-app-list';
import styles from './start-menu.module.css';

const ESC = 27;

export default function StartButton() {
	const [isOpen, setIsOpen] = useState(false);
	const {launchApp} = useRunningAppContext();
	const startButtonRef = useRef<HTMLButtonElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useClickOutside(wrapperRef, () => setIsOpen(false));

	return (
		<div
			ref={wrapperRef}
			className={styles.wrapper}
			onKeyDown={(e) => {
				if (isOpen && e.keyCode === ESC) {
					setIsOpen(false);
					startButtonRef.current?.focus();
				}
			}}
		>
			<button
				ref={startButtonRef}
				className={classnames(styles.startButton, {
					[styles.active]: isOpen
				})}
				onClick={() => {
					setIsOpen((currentIsOpen) => !currentIsOpen);
				}}
				aria-label="open app drawer"
			>
				<Image src="/img/start.png" alt="" width={178} height={178} />
				Start
			</button>
			{isOpen ? (
				<div className={styles.startMenu}>
					<div className={styles.menuLogo}>
						<div className={styles.verticalText}>
							pizza-pizza
						</div>
					</div>
					<StartMenuAppList
						apps={desktopApps}
						launchApp={(app) => {
							// timeout prevents the window from closing as soon as it opens when using keyboard controls
							window.setTimeout(() => launchApp(app), 10);
							setIsOpen(false);
						}}
					/>
				</div>
			) : null}
		</div>
	);
}
