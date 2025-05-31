import React, {useLayoutEffect} from 'react';
import styles from './visualizer.module.css';

import Visualization from './visualization';

const Visualizer: React.FC<{ audio: HTMLAudioElement | null }> = ({audio}) => {
	const canvas = React.useRef<HTMLCanvasElement>(null);

	useLayoutEffect(() => {
		if (audio) {
			// connect audio source to analyzer
			const ctx = new AudioContext();
			const analyser = ctx.createAnalyser();
			const src = ctx.createMediaElementSource(audio);
			src.connect(analyser);
			analyser.connect(ctx.destination);

			const frequencyData = new Uint8Array(analyser.frequencyBinCount);
			const vis = new Visualization();

			// grab audio analysis every frame and draw the visualization
			let frame = requestAnimationFrame(
				function getFrequencies() {
					frame = requestAnimationFrame(getFrequencies);
					if (canvas.current) {
						analyser.getByteFrequencyData(frequencyData);
						vis.draw(canvas.current, frequencyData);
					}
				}
			);

			// clean up analysis collection
			return () => {
				cancelAnimationFrame(frame);
			};
		}
	}, [audio]);

	return (
		<canvas
			ref={canvas}
			className={styles.canvas}
			width={canvas.current?.clientWidth}
			height={canvas.current?.clientHeight}
		/>
	);
}

export default Visualizer;
