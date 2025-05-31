import Image from 'next/image';
import React, {useRef, useEffect} from 'react';
import classnames from 'classnames';
import {useDispatch} from 'react-redux';

import {launchApp} from '@/redux/windows';

import type {App} from '@/apps';
import styles from './desktop-icon.module.css';

const DesktopIcon: React.FC<{
	app: App;
	darkText: boolean;
	className?: string;
}> = ({app, className, darkText}) => {
	const dispatch = useDispatch();
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		const focusWhenKilled = (e: CustomEvent) => {
			if (e.detail === app.name) {
				buttonRef.current?.focus();
			}
		};
		window.addEventListener('appkilled', focusWhenKilled as EventListener);

		return () => window.removeEventListener('appkilled', focusWhenKilled as EventListener);
	}, [app.name]);

	return (
		<button
			ref={buttonRef}
			className={classnames(styles.desktopIcon, className, {
				[styles.darkText]: darkText
			})}
			onClick={() => dispatch(launchApp(app))}
		>
			<Image
				src={app.iconSrc}
				alt=""
				width={50}
				height={50}
			/>
			{app.name}
		</button>
	);
};

export default DesktopIcon;
