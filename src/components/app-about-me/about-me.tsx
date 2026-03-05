import React, {useState} from 'react';
import classnames from 'classnames';

import ArrowKeyFocus from '../arrow-key-focus';
import Me from './partials/me';
import Contact from './partials/contact';

import styles from './about-me.module.css';

const TABS = [
	{
		label: 'About Me',
		TabComponent: Me
	},
	{
		label: 'Contact',
		TabComponent: Contact
	}
] as const;

const AboutMe: React.FC = () => {
	const [activeTab, setActiveTab] = useState(0);
	const {TabComponent} = TABS[activeTab];

	return (
		<div className={styles.aboutMe}>
			<div className={styles.tabs}>
				<ArrowKeyFocus preventTab>
					{ TABS.map((tab, i) => (
						<button
							key={tab.label}
							className={classnames(styles.tab, {
								[styles.activeTab]: activeTab === i
							})}
							onClick={() => setActiveTab(i)}
							onFocus={() => setActiveTab(i)}
						>
							<h3>{tab.label}</h3>
						</button>
					)) }
				</ArrowKeyFocus>
			</div>
			<div className={styles.contentOuter}>
				<div className={styles.contentInner}>
					<TabComponent />
				</div>
			</div>
		</div>
	);
};

export default AboutMe;
