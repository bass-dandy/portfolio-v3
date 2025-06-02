import {useEffect} from 'react';

const useClickOutside = (ref: React.RefObject<HTMLElement | null>, onClickOutside: (e: Event) => void) => {
	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (ref.current !== e.target && !ref.current?.contains(e.target as HTMLElement)) {
				onClickOutside(e);
			}
		};
		document.addEventListener('click', onClickOutside);

		return () => document.removeEventListener('click', onClickOutside);
	}, [ref, onClickOutside]);
}

export default useClickOutside;
