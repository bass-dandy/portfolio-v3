import React from 'react';
import classnames from 'classnames';
import Image from 'next/image';

import type {App, AppName} from '@/apps';
import {Button} from '@/components/button';

import ArrowKeyFocus from '../../arrow-key-focus';
import styles from './start-menu-app-list.module.css';

interface StartMenuAppListProps {
	apps: App[];
	launchApp: (name: AppName) => void;
	isFloating?: boolean;
}

export default function StartMenuAppList({apps, launchApp, isFloating}: StartMenuAppListProps) {
	return (
		<ul
			className={classnames(styles.appList, {
				[styles.floating]: isFloating
			})}
		>
			<ArrowKeyFocus focusOnMount>
				{apps.map((app) => (
					<li key={app.name}>
						<Button
							variant="menu"
							className={styles.appListItem}
							onClick={(e) => {
								e.stopPropagation();
								launchApp(app.name);
							}}
						>
							<Image
								src={app.iconSrc}
								alt=""
								width={50}
								height={50}
							/>
							<div className={styles.appName}>
								{app.name}
							</div>
							{Array.isArray(app.content) && '\u25b6'}
						</Button>
						{Array.isArray(app.content) ? (
							<StartMenuAppList apps={app.content} launchApp={launchApp} isFloating />
						) : null}
					</li>
				))}
			</ArrowKeyFocus>
		</ul>
	);
}
