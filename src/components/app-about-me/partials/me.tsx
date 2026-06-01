import Image from 'next/image';

import {type AppName} from '@/apps';
import {useRunningAppContext} from '@/context';

import styles from './me.module.css';

const AppLink: React.FC<{
	children: React.ReactNode;
	appName: AppName;
}> = ({children, appName}) => {
	const {launchApp} = useRunningAppContext();

	return (
		<button
			className={styles.appLink}
			onClick={() => launchApp(appName)}
		>
			{children}
		</button>
	);
}

const Me: React.FC = () => (
	<div className={styles.content}>
		<Image
			src="/img/about-me/me.webp"
			alt="photo of some nerd (me)"
			width={1063}
			height={1419}
			className={styles.headshot}
		/>
		<p className={styles.paragraph}>
			Hello! My name is Chris and I&apos;m a front-end web developer living in NYC. You can check
			out <AppLink appName="Resume">my resume</AppLink> for a more detailed description of my experience, and if you&apos;re
			interested in examples of my work then have a look at <AppLink appName="My Projects">my personal projects</AppLink> :D
		</p>
		<p className={styles.paragraph}>
			Outside of work, I love music! I play a few instruments (mostly bass),
			compose chiptune music on my gameboy, and have been to about one billion(!) live shows. A bit
			of <AppLink appName="My Music">my own music</AppLink> is hosted on this very website :o
		</p>
		<p className={styles.paragraph}>
			Some of my other interests include: crafting, cosplay, movies, Magic: The Gathering, video games
			(I am a FromSoft sicko), and snowboarding. This list is non-exhastive and ever-growing, please send help!
		</p>
		<p className={styles.paragraph}>
			This website is written with React, TypeScript, Motion, and Immer, built to a static export with Next.js, and hosted on GitHub.
			Behold its vital <a href="https://github.com/bass-dandy/portfolio-v3" target="blank">source code</a> at your leisure.
		</p>
	</div>
);

export default Me;
