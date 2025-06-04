import React, {useRef} from 'react';

import {desktopApps, type AppName} from '@/apps';
import useClickOutside from '@/hooks/useClickOutside';

import StartMenuAppList from './start-menu-app-list';
import styles from './start-menu.module.css';

interface StartMenuProps {
	launchApp: (name: AppName) => void;
	onClose: () => void;
}

export default function StartMenu({launchApp, onClose}: StartMenuProps) {
	const menu = useRef<HTMLDivElement>(null);
	useClickOutside(menu, onClose);

	return (
		<div className={styles.startMenu} ref={menu}>
			<div className={styles.menuLogo}>
				<div className={styles.verticalText}>
					pizza-pizza
				</div>
			</div>
			<StartMenuAppList apps={desktopApps} launchApp={launchApp} />
		</div>
	);
}
