import classnames from 'classnames';

import styles from './button.module.css';

export const Button = ({ children, className, ...buttonProps }) => (
	<button
		className={classnames(styles.button, className)}
		{...buttonProps}
	>
		{children}
	</button>
);
