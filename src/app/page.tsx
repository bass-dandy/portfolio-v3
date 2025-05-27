'use client'

import {useEffect} from 'react';
import {Provider} from 'react-redux';

import Desktop from '../components/desktop';
import Taskbar from '../components/taskbar';
import createStore from '../redux/store';
import styles from "./page.module.css";

const TAB = 9;

const store = createStore({
	windows: {
		runningApps: []
	}
});

const Home: React.FC = () => {
	useEffect(() => {
		const keydownListener = (e: KeyboardEvent) => {
			if (e.keyCode === TAB) {
				document.body.classList.add(styles.keyboardAccessible);
			}
		};
		document.addEventListener('keydown', keydownListener);

		const mousedownListener = () => {
			document.body.classList.remove(styles.keyboardAccessible);
		};
		document.addEventListener('mousedown', mousedownListener);

		return () => {
			document.removeEventListener('keydown', keydownListener);
			document.removeEventListener('mousedown', mousedownListener);
		};
	}, []);

	return (
		<Provider store={store}>
		<>
			<Desktop/>
			<Taskbar/>
		</>
		</Provider>
	);
};

export default Home;
