import Image from 'next/image';
import React, {useState, useRef} from 'react';
import classnames from 'classnames';
import {AnimatePresence, motion} from 'motion/react';

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
			<AnimatePresence>
				{isOpen ? (
					<motion.div
						className={styles.startMenu}
						initial={{translateY: 0, overflow: 'hidden'}}
						animate={{height: 400, overflow: 'visible'}}
						exit={{height: 0, overflow: 'hidden'}}
						transition={{ease: 'easeOut', duration: 0.15}}
					>
						<div className={styles.menuStripeBG}>
							<motion.div
								className={styles.menuStripeFG}
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{ease: 'easeOut', duration: 0.15, delay: 0.15}}
							>
								<div className={styles.verticalText}>
									pizza-pizza
								</div>
							</motion.div>
						</div>
						<StartMenuAppList
							apps={desktopApps}
							launchApp={(app) => {
								// timeout prevents the window from closing as soon as it opens when using keyboard controls
								window.setTimeout(() => launchApp(app), 10);
								setIsOpen(false);
							}}
						/>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
