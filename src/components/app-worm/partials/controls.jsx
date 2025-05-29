import React from 'react';
import PropTypes from 'prop-types';
import styles from './controls.module.css';

export default function Controls(props) {
	return (
		<>
			<div className={styles.desktopControls}>
				<div className={styles.desc}>
					See this project on:
					<ul>
						<li>
							<a href="https://github.com/bass-dandy/w0rm" target="blank">
								github
							</a>
						</li>
						<li>
							<a href="https://www.npmjs.com/package/@bass_dandy/w0rm" target="blank">
								npm
							</a>
						</li>
					</ul>
				</div>
				<table className={styles.controlsTable}>
					<tbody>
						<tr>
							<td>arrow keys</td>
							<td>move</td>
						</tr>
						<tr>
							<td>z, x</td>
							<td>shoot portals</td>
						</tr>
						<tr>
							<td>esc</td>
							<td>pause</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={styles.mobileControls}>
				<div className={styles.dpad}>
					<button className={styles.dpadUp} onClick={props.game.up}/>
					<button className={styles.dpadLeft} onClick={props.game.left}/>
					<button className={styles.dpadRight} onClick={props.game.right}/>
					<button className={styles.dpadDown} onClick={props.game.down}/>
				</div>
				<div className={styles.fireButtons}>
					<button className={styles.fire1} onClick={props.game.fire1}/>
					<button className={styles.fire2} onClick={props.game.fire2}/>
				</div>
			</div>
		</>
	);
}

Controls.propTypes = {
	game: PropTypes.object.isRequired
};
