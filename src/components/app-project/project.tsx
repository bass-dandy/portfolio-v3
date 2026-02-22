import {useRunningAppContext} from '@/context';

import styles from './project.module.css';

const Project: React.FC<{
	description?: React.ReactNode;
	url: string;
	isFocused: boolean;
}> = ({description, url, isFocused}) => {
	const {hasAppMovement} = useRunningAppContext();

	return (
		<div className={styles.project}>
			{description ? (
				<div className={styles.description}>
					{description}
				</div>
			) : null}
			<div className={styles.content}>
				<iframe className={styles.frame} src={url} />
				{/*
					this mask is a bit of a hack to prevent the iframe from interfering with window
					drag + resize actions (it would otherwise swallow mouseup and mousemove events)
				*/}
				{hasAppMovement() || !isFocused ? <div className={styles.contentMask} /> : null}
			</div>
		</div>
	);
};

export default Project;
