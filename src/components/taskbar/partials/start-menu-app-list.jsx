import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {Button} from '@/components/button';

import ArrowKeyFocus from '../../arrow-key-focus';
import styles from './start-menu-app-list.module.css';

export default function StartMenuAppList(props) {
	return (
		<ul
			className={classnames(styles.appList, {
				[styles.floating]: props.floating
			})}
		>
			<ArrowKeyFocus focusOnMount>
				{props.apps.map((app) => (
					<li key={app.name}>
						<Button
							variant="menu"
							className={styles.appListItem}
							onClick={(e) => {
								e.stopPropagation();
								props.launchApp(app);
							}}
						>
							<img
								src={app.iconSrc}
								alt=""
							/>
							<div className={styles.appName}>
								{app.name}
							</div>
							{Array.isArray(app.content) && '\u25b6'}
						</Button>
						{Array.isArray(app.content) ? (
							<StartMenuAppList
								apps={app.content}
								launchApp={props.launchApp}
								floating
							/>
						) : null}
					</li>
				))}
			</ArrowKeyFocus>
		</ul>
	);
}

StartMenuAppList.propTypes = {
	apps: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			iconSrc: PropTypes.string.isRequired,
			children: PropTypes.arrayOf(PropTypes.object)
		})
	).isRequired,
	launchApp: PropTypes.func.isRequired,
	floating: PropTypes.bool
};
