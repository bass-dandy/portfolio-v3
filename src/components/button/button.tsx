import classnames from 'classnames';

import styles from './button.module.css';

export const Button: React.FC<{
	children: React.ReactNode;
	className?: string;
} & React.ComponentProps<"button">> = ({ children, className, ...buttonProps }) => (
	<button className={classnames(styles.button, className)} {...buttonProps}>
		{children}
	</button>
);
