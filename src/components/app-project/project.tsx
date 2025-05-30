import styles from './project.module.css';

const Project: React.FC<{
	description?: React.ReactNode;
	url: string;
	isFocused: boolean;
	isDragging: boolean;
	isResizing: boolean;
}> = ({
	description,
	url,
	isFocused,
	isDragging,
	isResizing,
}) => (
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
			{!isFocused || isDragging || isResizing ? (
				<div className={styles.contentMask} />
			) : null}
		</div>
	</div>
);

export default Project;
