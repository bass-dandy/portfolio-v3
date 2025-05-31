import React from 'react';

import type {App} from '@/apps';

import DesktopIcon from '../desktop-icon';
import styles from './directory.module.css';

const Directory: React.FC<{ contents: App[] }> = ({ contents }) => (
	<div className={styles.directory}>
		{contents.map((app) => (
			<DesktopIcon
				key={app.name}
				app={app}
				className={styles.appIcon}
				darkText
			/>
		))}
	</div>
);

export default Directory;
