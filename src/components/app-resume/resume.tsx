import React, {useRef} from 'react';

import {download} from '@/util';

import MenuBar from '../menu-bar';
import styles from './resume.module.css';

const resumePdf = '/img/resume/resume.pdf';

export default function Resume({ isMoving }: { isMoving: boolean }) {
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
				{isMoving ? <div className={styles.mask} /> : null}
			</div>
		</div>
	);
}
