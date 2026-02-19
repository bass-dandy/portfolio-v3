import {createContext, useCallback, useContext} from 'react';
import type {AppName, RunningApp} from './apps';

export const RunningAppContext = createContext<{
	runningApps: RunningApp[];
	setRunningApps: (apps: RunningApp[] | ((prev: RunningApp[]) => RunningApp[])) => void;
}>({
	runningApps: [],
	setRunningApps: () => null
});

export const useRunningAppContext = () => {
	const {runningApps, setRunningApps} = useContext(RunningAppContext);

	const focusApp = useCallback((name: AppName) => {
		setRunningApps((prevApps) =>
			prevApps.map((app) => ({
				...app,
				isFocused: app.name === name,
				isMinimized: app.name === name ? false : app.isMinimized
			}))
		);
	}, [setRunningApps]);

	const launchApp = useCallback((name: AppName) => {
		if (!runningApps.some((runningApp) => name === runningApp.name)) {
			setRunningApps((prevApps) => [
				...prevApps.map((app) => ({
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
		setRunningApps((prevApps) => {
			return prevApps.reduce<RunningApp[]>((acc, app) => {
				if (app.name !== name) {
					acc.push(app);
				} else {
					window.dispatchEvent(
						new CustomEvent('appkilled', {detail: app.name})
					);
				}
				return acc;
			}, []);
		});
	}, [setRunningApps]);

	const blurAllApps = useCallback(() => {
		setRunningApps((prevApps) =>
			prevApps.map((app) => ({ ...app, isFocused: false }))
		);
	}, [setRunningApps]);

	// this is just a private helper
	const updateApp = useCallback((name: AppName, update: Partial<RunningApp>) => {
		setRunningApps((prevApps) =>
			prevApps.map((app) => {
				return app.name === name ? {...app, ...update} : {...app}
			})
		);
	}, [setRunningApps]);

	const minimizeApp = useCallback((name: AppName) => {
		window.dispatchEvent(
			new CustomEvent('appminimized', {detail: name})
		);
		updateApp(name, {isMinimized: true, isFocused: false});
	}, [updateApp]);

	const beginAppMovement = useCallback((name: AppName) => {
		updateApp(name, {isMoving: true});
	}, [updateApp]);

	const endAppMovement = useCallback((name: AppName) => {
		updateApp(name, {isMoving: false});
	}, [updateApp]);

	return {
		runningApps,
		focusApp,
		launchApp,
		killApp,
		blurAllApps,
		minimizeApp,
		beginAppMovement,
		endAppMovement,
	};
};
