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
	url: 'https://bass-dandy.github.io/simpai',
	iconSrc: '/img/app-icons/simpai.png',
};

export const Planechase = {
	name: 'Planechase',
	url: 'https://bass-dandy.github.io/planechase',
	iconSrc: '/img/app-icons/planechase.png',
};

export const PizzaDashPizzaDotPizza = {
	name: 'Pizza Dash Pizza Dot Pizza',
	url: 'https://pizza-pizza.pizza',
	iconSrc: '/img/start.png',
};

export const ACNHChecklists = {
	name: 'Animal Crossing Checklists',
	url: 'https://bass-dandy.github.io/acnh-checklists',
	iconSrc: '/img/app-icons/acnh.png',
};

export const UnifiedSandwichFramework = {
	name: 'Unified Sandwich Framework',
	url: 'https://sandwich.one',
	iconSrc: '/img/app-icons/sandwich.png',
};

export const Homeward = {
	name: 'Homeward',
	url: 'https://bass-dandy.github.io/homeward',
	iconSrc: '/img/app-icons/homeward.webp',
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
	WebBrowser
];
