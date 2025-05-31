const MIN_INTENSITY = 69;
const PIXEL_SIZE = 3;
const CREST_HEIGHT = PIXEL_SIZE * 2;
const SEAFOAM_HEIGHT = PIXEL_SIZE * 2;

const WET_SAND_COLOR = 'rgb(235,225,184)';
const CREST_COLOR = '#ffffff';
const SEAFOAM_COLOR = '#ccf2ff';
const SHALLOW_WATER_COLOR = '#99e6ff';
const WATER_COLOR = '#80dfff';
const DEEP_WATER_COLOR = '#4dd2ff';

// an audio visualization that looks like a pixelated beach 8)
export default class Visualization {
	wetSandHeights: number[] = [];
	wetSandUpdates: number[] = [];
	canvas: HTMLCanvasElement;
	audioAnalyser: AnalyserNode;
	frequencyData: Uint8Array;

	constructor(canvas: HTMLCanvasElement, audio: HTMLAudioElement) {
		// connect audio source to analyzer
		const ctx = new AudioContext();
		const analyser = ctx.createAnalyser();
		const src = ctx.createMediaElementSource(audio);
		src.connect(analyser);
		analyser.connect(ctx.destination);

		this.canvas = canvas;
		this.audioAnalyser = analyser;
		this.frequencyData = new Uint8Array(analyser.frequencyBinCount);
	}

	// constrain value to "pixel" bounds
	private pixelize = (value: number) => {
		return value - (value % PIXEL_SIZE);
	};

	draw = () => {
		this.audioAnalyser.getByteFrequencyData(this.frequencyData);

		const width = this.canvas.clientWidth;
		const height = this.canvas.clientHeight;
		const ctx = this.canvas.getContext('2d');

		if (!ctx) return;

		ctx.clearRect(0, 0, width, height);

		let x = 0; // could be done with just i, but using x separately saves calculations
		let i = 0;

		while (x < width) {
			const waveHeight = this.pixelize(
				// normalize frequency (plus min intensity) to canvas height; frequency is a byte (max=255)
				(this.frequencyData[i] + MIN_INTENSITY) * height / (255 + MIN_INTENSITY)
			);

			if (waveHeight >= (this.wetSandHeights[i] || 0)) {
				this.wetSandHeights[i] = waveHeight;
				this.wetSandUpdates[i] = Date.now();
			}

			// draw wet sand
			ctx.fillStyle = WET_SAND_COLOR;
			ctx.fillRect(x, height - this.wetSandHeights[i] - 2, PIXEL_SIZE, this.wetSandHeights[i]);
			// draw wave crest
			ctx.fillStyle = CREST_COLOR;
			ctx.fillRect(x, height - waveHeight, PIXEL_SIZE, waveHeight);
			// draw seafoam
			ctx.fillStyle = SEAFOAM_COLOR;
			ctx.fillRect(x, height - waveHeight + CREST_HEIGHT, PIXEL_SIZE, waveHeight);
			// draw shallow water
			ctx.fillStyle = SHALLOW_WATER_COLOR;
			ctx.fillRect(x, height - waveHeight + CREST_HEIGHT + SEAFOAM_HEIGHT, PIXEL_SIZE, waveHeight);
			// draw water
			ctx.fillStyle = WATER_COLOR;
			ctx.fillRect(x, height - this.pixelize(waveHeight / 2), PIXEL_SIZE, waveHeight);
			// draw deep water
			ctx.fillStyle = DEEP_WATER_COLOR;
			ctx.fillRect(x, height - this.pixelize(waveHeight / 4), PIXEL_SIZE, waveHeight);

			if (Date.now() - this.wetSandUpdates[i] > 100) {
				this.wetSandHeights[i] = this.wetSandHeights[i] - PIXEL_SIZE;
				this.wetSandUpdates[i] = Date.now();
			}

			x += PIXEL_SIZE;
			i++;
		}
	};
};
