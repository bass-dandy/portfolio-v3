import React, {useRef, useState} from 'react';

import useClickOutside from '@/hooks/useClickOutside';

import DropdownMenu from './partials/dropdown-menu';
import styles from './menu-bar.module.css';

const MenuBar: React.FC<{
	options: {
		[label: string]: {
			label: string;
			onClick: () => void;
			isDisabled?: boolean;
		}[];
	};
}> = ({options}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [openItem, setOpenItem] = useState('');

	const menuBar = useRef<HTMLUListElement>(null);
	useClickOutside(menuBar, () => setIsOpen(false));

	return (
		<ul className={styles.menuBar} ref={menuBar}>
			{Object.entries(options).map(([label, items]) => (
				<DropdownMenu
					key={label}
					label={label}
					items={items}
					isOpen={isOpen && label === openItem}
					onOpen={() => setIsOpen(true)}
					onClose={() => setIsOpen(false)}
					onHover={() => setOpenItem(label)}
				/>
			)) }
		</ul>
	);
}

export default MenuBar;
