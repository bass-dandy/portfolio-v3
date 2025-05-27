import AboutMeApp from './components/app-about-me';
import ResumeApp from './components/app-resume';
import WormApp from './components/app-worm';
import WebBrowserApp from './components/app-web-browser';
import MediaPlayerApp from './components/app-media-player';

export const AboutMe = {
	name: 'About Me',
	content: AboutMeApp,
	iconSrc: '/img/app-icons/about-me.png',
	width: 530,
	height: 450,
	minWidth: 300,
	minHeight: 200
};

export const WebBrowser = {
	name: 'Internet',
	content: WebBrowserApp,
	iconSrc: '/img/app-icons/browser.png',
	width: 800,
	height: 600,
	minWidth: 350,
	minHeight: 230
};

export const Worm = {
	name: 'Worm',
	content: WormApp,
	iconSrc: '/img/app-icons/w0rm.png',
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

const linkIcon = '/img/app-icons/link.png';

export const Simpai = {
	name: 'SimPAI',
	url: 'https://bass-dandy.github.io/simpai',
	iconSrc: linkIcon
};

export const Planechase = {
	name: 'Planechase',
	url: 'https://bass-dandy.github.io/planechase',
	iconSrc: linkIcon
};

export const PizzaDashPizzaDotPizza = {
	name: 'Pizza Dash Pizza Dot Pizza',
	url: 'https://pizza-pizza.pizza',
	iconSrc: linkIcon
};

export const ACNHChecklists = {
	name: 'Animal Crossing Checklists',
	url: 'https://bass-dandy.github.io/acnh-checklists',
	iconSrc: linkIcon
};

export const UnifiedSandwichFramework = {
	name: 'Unified Sandwich Framework',
	url: 'https://sandwich.one',
	iconSrc: linkIcon
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
	WebBrowser
];
