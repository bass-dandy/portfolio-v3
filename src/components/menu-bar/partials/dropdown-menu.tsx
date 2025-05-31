import React from 'react';
import classnames from 'classnames';
import Clickable from '../../clickable';

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
	<Clickable
		element="li"
		className={classnames(styles.menuBarItem, {
			[styles.open]: props.isOpen
		})}
		onClick={props.isOpen ? props.onClose : props.onOpen}
		onMouseOver={props.onHover}
		onFocus={props.onHover}
	>
		{props.label}
		<ul
			className={styles.dropdownMenu}
			onClick={(e) => {
				// slight hack to stop clicks on disabled items from closing the menu
				e.stopPropagation();
			}}
		>
			{props.items.map((item) => (
				<Clickable
					element="li"
					className={classnames(styles.dropdownMenuItem, {
						[styles.disabled]: item.isDisabled
					})}
					onClick={() => {
						item.onClick();
						props.onClose();
					}}
					disabled={item.isDisabled}
					key={item.label}
				>
					{item.label}
				</Clickable>
			))}
		</ul>
	</Clickable>
);

export default DropdownMenu;
