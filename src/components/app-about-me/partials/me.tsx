import Image from 'next/image';

import {type AppName} from '@/apps';
import {useRunningAppContext} from '@/context';

import styles from './me.module.css';

const AppLink: React.FC<{ children: React.ReactNode, appName: AppName }> = ({children, appName}) => {
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
	<>
		<Image
			src="/img/about-me/headshot.png"
			alt="photo of some nerd (me)"
			width={442}
			height={717}
			className={styles.headshot}
		/>
		<p className={styles.paragraph}>
			Thanks for checking out my website! My name is Christian Dinh and I&apos;m a software engineer
			living in NYC. Most of my experience is in front end web dev, but I probably wouldn&apos;t
			mind the opportunity to branch out a bit. If you&apos;re interested in a more detailed description
			of my experience take a look at <AppLink appName="Resume">my resume</AppLink>, and if you&apos;re
			interested in examples of my work take a look at <AppLink appName="My Projects">my projects</AppLink> :D
		</p>
		<p className={styles.paragraph}>
			Outside of programming, I {'<3'} music! I play a few instruments (bass is my fav),
			compose chiptune music on my gameboy, and go to a lot of live shows (when I&apos;m not living
			through a pandemic). Some of <AppLink appName="My Music">my music</AppLink> is hosted on
			this website. Some other things I think are dope: movies, Magic: The Gathering (mostly EDH and
			proxy vintage), video games, snowboarding, cooking, cocktails, and long walks on the beach.
		</p>
	</>
);

export default Me;
