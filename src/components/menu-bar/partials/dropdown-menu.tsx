import React from 'react';
import classnames from 'classnames';

import {Button} from '@/components/button';

import styles from './dropdown-menu.module.css';

const DropdownMenu: React.FC<{
	label: string;
	items: {
		label: string;
		onClick: () => void;
		isDisabled?: boolean; 
	}[];
	onOpen: () => void;
	onClose: () => void;
	onHover: () => void;
	isOpen: boolean;
}> = (props) =>  (
	<li
		className={classnames(styles.menuBarItem, {
			[styles.open]: props.isOpen
		})}
	>
		<Button
			variant="menu"
			onClick={props.isOpen ? props.onClose : props.onOpen}
			onMouseOver={props.onHover}
			onFocus={props.onHover}
		>
			{props.label}
		</Button>
		<ul className={styles.dropdownMenu}>
			{props.items.map((item) => (
				<li key={item.label} className={styles.dropdownMenuItem}>
					<Button
						variant="menu"
						onClick={(e) => {
							item.onClick();
							props.onClose();
							e.stopPropagation(); // stop clicks on disabled items from closing the menu
						}}
						disabled={item.isDisabled}
						className={styles.dropdownMenuItem}
					>
						{item.label}
					</Button>
				</li>
			))}
		</ul>
	</li>
);

export default DropdownMenu;
