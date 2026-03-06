import {useEffect} from 'react';

// keycodes
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const TAB = 9;

export default function useArrowKeyFocus(
	ref: React.RefObject<HTMLElement | null>,
	opts: {preventTab: boolean} = {preventTab: true}
) {
	useEffect(() => {
		const container = ref.current;

		const handleKeyDown = (e: KeyboardEvent) => {
			const focusables = Array.from(
				container?.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>(
					':scope > button, :scope > a[href], :scope > li > button, :scope > li > a[href]'
				) ?? []
			);
			const currentIndex = focusables.indexOf(document.activeElement as HTMLButtonElement);

			if (currentIndex >= 0) {
				if (opts.preventTab) {
					focusables.forEach((focusable, i) => {
						focusable.tabIndex = i === currentIndex ? 0 : -1;
					});
				}
				if (e.keyCode === LEFT || e.keyCode === UP || (!opts.preventTab && e.shiftKey && e.keyCode === TAB)) {
					e.preventDefault();
					focusables[
						currentIndex > 0 ? currentIndex - 1 : focusables.length - 1
					].focus();
				} else if (e.keyCode === RIGHT || e.keyCode === DOWN || (!opts.preventTab && e.keyCode === TAB)) {
					e.preventDefault();
					focusables[
						(currentIndex + 1) % focusables.length
					].focus();
				}
			}
		};

		container?.addEventListener('keydown', handleKeyDown);
		return () => container?.removeEventListener('keydown', handleKeyDown);
	}, [ref, opts]);
}
