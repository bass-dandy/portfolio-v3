import {produce} from 'immer';
import {createContext, useCallback, useContext} from 'react';
import type {AppName, RunningApp} from './apps';

// Map guarantees entries are iterated in insertion order (necessary for taskbar ordering)
type RunningAppState = Map<AppName, RunningApp>;

export const RunningAppContext = createContext<{
	runningApps: RunningAppState;
	setRunningApps: (apps: RunningAppState | ((prev: RunningAppState) => RunningAppState)) => void;
	renderOrder: AppName[];
	setRenderOrder: (appNames: AppName[] | ((prev: AppName[]) => AppName[])) => void;
}>({
	runningApps: new Map(),
	setRunningApps: () => null,
	renderOrder: [],
	setRenderOrder: () => null,
});

export const useRunningAppContext = () => {
	const {runningApps, setRunningApps, renderOrder, setRenderOrder} = useContext(RunningAppContext);

	const focusApp = useCallback((name: AppName) => {
		setRunningApps((prevApps) => produce(prevApps, (draft) => {
			draft.forEach((app) => {
				app.isFocused = app.name === name;
				app.isMinimized = app.name === name ? false : app.isMinimized;
			});
		}));
		setRenderOrder((prevOrder) => [...prevOrder.filter((filterName) => filterName !== name), name])
	}, [setRunningApps, setRenderOrder]);

	const blurAllApps = useCallback(() => {
		setRunningApps((prevApps) => produce(prevApps, (draft) => {
			draft.forEach((app) => {
				app.isFocused = false;
			});
		}));
	}, [setRunningApps]);

	const launchApp = useCallback((name: AppName) => {
		if (!runningApps.has(name)) {
			blurAllApps();
			setRunningApps((prevApps) => produce(prevApps, (draft) => {
				draft.set(name, {
					name,
					isFocused: true,
					isMinimized: false,
					isMoving: false,
				});
			}));
			setRenderOrder((prevOrder) => [...prevOrder.filter((filterName) => filterName !== name), name])
		} else {
			focusApp(name);
		}
	}, [runningApps, setRunningApps, focusApp, blurAllApps, setRenderOrder]);

	const killApp = useCallback((name: AppName) => {
		setRunningApps((prevApps) => produce(prevApps, (draft) => {
			draft.delete(name);
			window.dispatchEvent(
				new CustomEvent('appkilled', {detail: name})
			);
			setRenderOrder((prevOrder) => prevOrder.filter((filterName) => filterName !== name))
		}));
	}, [setRunningApps, setRenderOrder]);

	// this is just a private helper
	const updateApp = useCallback((name: AppName, update: Partial<RunningApp>) => {
		setRunningApps((prevApps) => produce(prevApps, (draft) => {
			draft.set(name, {...draft.get(name)!, ...update})
		}));
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

	const hasAppMovement = useCallback(() => {
		return runningApps.values().some((app) => app.isMoving);
	}, [runningApps]);

	return {
		runningApps,
		renderOrder,
		focusApp,
		launchApp,
		killApp,
		blurAllApps,
		minimizeApp,
		beginAppMovement,
		endAppMovement,
		hasAppMovement,
	};
};
