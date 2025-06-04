import React from 'react';
import styles from './wallpaper.module.css';

const Wallpaper: React.FC<{onClick: () => void}> = ({onClick}) => (
	<div className={styles.wallpaper} onClick={onClick} />
);

export default Wallpaper;
