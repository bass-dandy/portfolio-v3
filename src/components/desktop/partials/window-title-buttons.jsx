import Image from 'next/image';
import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';

import {Button} from '@/components/button';

import styles from './window-title-buttons.module.css';

const TitleButtons = forwardRef((props, ref) => {
	const closeButton = useRef(null);

	useImperativeHandle(ref, () => ({
		focus() {
			closeButton.current.focus();
		}
	}));

	return (
		<div className={styles.titleButtons}>
			<Button
				className={styles.minimize}
				onClick={props.onMinimize}
				aria-label="minimize window"
			>
				<Image src="/img/window/minimize.png" alt="" width={50} height={50} />
			</Button>
			{ props.canMaximize ? (
				<Button
					className={styles.maximize}
					onClick={props.onMaximize}
					aria-label="maximize window"
				>
					<Image
						src={props.isMaximized ? '/img/window/restore_down.png' : '/img/window/maximize.png'}
						alt=""
						width={50}
						height={50}
					/>
				</Button>
			) : null }
			<Button
				className={styles.close}
				onClick={props.onClose}
				ref={closeButton}
				aria-label="close window"
			>
				<Image src="/img/window/close.png" alt="" width={50} height={50} />
			</Button>
		</div>
	);
});

TitleButtons.propTypes = {
	appName: PropTypes.string.isRequired,
	onMinimize: PropTypes.func.isRequired,
	onMaximize: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	canMaximize: PropTypes.bool
};

export default TitleButtons;
