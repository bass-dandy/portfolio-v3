import classnames from 'classnames';

import styles from './button.module.css';

export const Button: React.FC<{
	children: React.ReactNode;
	variant?: "outset" | "menu";
	className?: string;
} & React.ComponentProps<"button">> = ({
	children,
	variant = "outset",
	className,
	...buttonProps
}) => (
	<button
		className={classnames(
			styles.button,
			variant === 'outset' ? styles.outset : styles.menu,
			className
		)}
		{...buttonProps}
	>
		{children}
	</button>
);
