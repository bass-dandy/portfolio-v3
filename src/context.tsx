import {createContext, useCallback, useContext} from 'react';
import type {AppName, RunningApp} from './apps';

export const RunningAppContext = createContext<{
	runningApps: RunningApp[];
	setRunningApps: (apps: RunningApp[]) => void;
}>({
	runningApps: [],
	setRunningApps: () => null
});

export const useRunningAppContext = () => {
	const {runningApps, setRunningApps} = useContext(RunningAppContext);

	const focusApp = useCallback((name: AppName) => {
		setRunningApps(
			runningApps.map((app) => ({
				...app,
				isFocused: app.name === name,
				isMinimized: app.name === name ? false : app.isMinimized
			}))
		);
	}, [runningApps, setRunningApps]);

	const launchApp = useCallback((name: AppName) => {
		if (!runningApps.some((runningApp) => name === runningApp.name)) {
			setRunningApps([
				...runningApps.map((app) => ({
					...app,
					isFocused: false,
				})),
				{
					name: name,
					isFocused: true,
					isMinimized: false,
					isMoving: false,
				},
			]);
		} else {
			focusApp(name);
		}
	}, [runningApps, setRunningApps, focusApp]);

	const killApp = useCallback((name: AppName) => {
		const newApps = runningApps.reduce<RunningApp[]>((acc, app) => {
			if (app.name !== name) {
				acc.push(app);
			} else {
				window.dispatchEvent(
					new CustomEvent('appkilled', {detail: app.name})
				);
			}
			return acc;
		}, []);

		setRunningApps(newApps);
	}, [runningApps, setRunningApps]);

	const blurAllApps = useCallback(() => {
		setRunningApps(
			runningApps.map((app) => ({
				...app,
				isFocused: false,
			}))
		);
	}, [runningApps, setRunningApps]);

	// this is just a private helper
	const updateApp = useCallback((name: AppName, update: Partial<RunningApp>) => {
		const newApps = runningApps.map((app) => {
			return app.name === name ? {...app, ...update} : {...app}
		});
		setRunningApps(newApps);
	}, [runningApps, setRunningApps]);

	const minimizeApp = useCallback((name: AppName) => {
		window.dispatchEvent(
			new CustomEvent('appminimized', {detail: name})
		);
		updateApp(name, {isMinimized: true, isFocused: false});
	}, [updateApp]);

	return {
		runningApps,
		focusApp,
		launchApp,
		killApp,
		blurAllApps,
		minimizeApp,
	};
};
