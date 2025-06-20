import {useEffect} from 'react';

const useClickOutside = (ref: React.RefObject<HTMLElement | null>, callback: (e: Event) => void) => {
	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (ref.current !== e.target && !ref.current?.contains(e.target as HTMLElement)) {
				callback(e);
			}
		};
		window.addEventListener('click', onClickOutside);

		return () => window.removeEventListener('click', onClickOutside);
	}, [ref, callback]);
}

export default useClickOutside;
