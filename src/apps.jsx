import AboutMeApp from './components/app-about-me';
import ResumeApp from './components/app-resume';
import WormApp from './components/app-worm';
import MediaPlayerApp from './components/app-media-player';
import ProjectApp from './components/app-project';

export const AboutMe = {
	name: 'About Me',
	content: AboutMeApp,
	iconSrc: '/img/app-icons/about-me.png',
	width: 530,
	height: 450,
	minWidth: 300,
	minHeight: 200
};

export const Worm = {
	name: 'Worm',
	content: WormApp,
	iconSrc: '/img/app-icons/worm.png',
	resizeDisabled: true
};

export const Resume = {
	name: 'Resume',
	content: ResumeApp,
	iconSrc: '/img/app-icons/resume.png',
	width: 600,
	height: 800,
	minWidth: 250,
	minHeight: 200
};

export const MediaPlayer = {
	name: 'My Music',
	content: MediaPlayerApp,
	iconSrc: '/img/app-icons/media-player.png',
	width: 500,
	height: 400,
	minWidth: 500,
	minHeight: 300
};

export const Simpai = {
	name: 'SimPAI',
	iconSrc: '/img/app-icons/simpai.png',
	content: (windowProps) => (
		<ProjectApp
			description={(
				<>
					SimPAI is a tool for inspecting text-based resources within a Sims 2 .package file, useful for
					authoring simple mods (eg: custom careers). The web app is written in Svelte and is distributed
					via pnpm monorepo alongside a parsing library I also authored. This project is heavily based
					on SimPE, the de-facto Sims 2 modding tool.
				</>
			)}
			url="https://bass-dandy.github.io/simpai"
			{...windowProps}
		/>
	),
	width: 800,
	height: 600,
	minWidth: 350,
	minHeight: 230
};

export const Planechase = {
	name: 'Planechase',
	iconSrc: '/img/app-icons/planechase.png',
	content: (windowProps) => (
		<ProjectApp
			description="A web app for creating planar decks for the Planechase variant of Magic: The Gathering. Once created, you can use your deck to play both vanilla Planechase and eternities map. The app is pretty old - I think it was written in React 15 with MaterialUI. Needless to say I've learned a lot since then, but I am still proud of the linear-algebra-in-CSS solution to zooming in on the map."
			url="https://bass-dandy.github.io/planechase"
			{...windowProps}
		/>
	),
	width: 800,
	height: 600,
	minWidth: 350,
	minHeight: 230
};

export const PizzaDashPizzaDotPizza = {
	name: 'Pizza Dash Pizza Dot Pizza',
	iconSrc: '/img/start.png',
	content: (windowProps) => (
		<ProjectApp url="https://pizza-pizza.pizza" {...windowProps} />
	),
	width: 800,
	height: 600,
	minWidth: 350,
	minHeight: 230
};

export const ACNHChecklists = {
	name: 'Animal Crossing Checklists',
	iconSrc: '/img/app-icons/acnh.png',
	content: (windowProps) => (
		<ProjectApp
			description="A checklist for tracking collectibles in Animal Crossing: New Horizons. Technically very jank - for some reason I wanted to homebrew a React static page emitter. It was largely a CSS project anyway, and all animations you see are pure CSS. Check out the light / dark mode transition in the upper left!"
			url="https://bass-dandy.github.io/acnh-checklists"
			{...windowProps}
		/>
	),
	width: 800,
	height: 600,
	minWidth: 350,
	minHeight: 230
};

export const UnifiedSandwichFramework = {
	name: 'Unified Sandwich Framework',
	iconSrc: '/img/app-icons/sandwich.png',
	content: (windowProps) => (
		<ProjectApp
			description="A simple site explaining my unified sandwich theory. Literally just HTML/CSS/JS like the good old days!"
			url="https://sandwich.one"
			{...windowProps}
		/>
	),
	width: 800,
	height: 600,
	minWidth: 350,
	minHeight: 230
};

export const Homeward = {
	name: 'Homeward',
	iconSrc: '/img/app-icons/homeward.webp',
	content: (windowProps) => (
		<ProjectApp
			description={(
				<>
					A Svelte app for visualizing Dark Souls 3 fog gate randomizer spoiler logs as a network graph.
				</>
			)}
			url="https://bass-dandy.github.io/homeward"
			{...windowProps}
		/>
	),
	width: 800,
	height: 600,
	minWidth: 350,
	minHeight: 230
};

export const Projects = {
	name: 'My Projects',
	iconSrc: '/img/app-icons/folder.png',
	width: 500,
	height: 300,
	minWidth: 300,
	minHeight: 200,
	children: [
		Worm,
		Simpai,
		Homeward,
		Planechase,
		ACNHChecklists,
		UnifiedSandwichFramework,
		PizzaDashPizzaDotPizza
	]
};

export default [
	AboutMe,
	Resume,
	Projects,
	MediaPlayer,
];
