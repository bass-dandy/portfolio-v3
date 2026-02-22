import React, {useRef} from 'react';

import {useRunningAppContext} from '@/context';
import {download} from '@/util';

import MenuBar from '../menu-bar';
import styles from './resume.module.css';

const resumePdf = '/docs/resume.pdf';

export default function Resume({isFocused}: {isFocused: boolean}) {
	const {hasAppMovement} = useRunningAppContext();
	const iframe = useRef<HTMLIFrameElement>(null);

	return (
		<div className={styles.resume}>
			<MenuBar
				options={{
					File: [
						{
							label: 'Download pdf',
							onClick: () => download(resumePdf)
						},
						{
							label: 'Print',
							onClick: () => iframe.current?.contentWindow?.print()
						}
					],
					View: [
						{
							label: 'Open in New Tab',
							onClick: () => window.open(resumePdf)
						}
					]
				}}
			/>
			<div className={styles.frame}>
				<iframe
					src={resumePdf}
					ref={iframe}
				/>
				{/*
					this mask is a bit of a hack to prevent the iframe from interfering with window
					drag + resize actions (it would otherwise swallow mouseup and mousemove events)
				*/}
				{hasAppMovement() || !isFocused ? <div className={styles.mask} /> : null}
			</div>
		</div>
	);
}
