import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
	navigate,
	setUrl,
	goForward,
	goBackward
} from '../../redux/web-browser';

import styles from './web-browser.module.css';

const ENTER = 13;

class WebBrowser extends React.Component {

	static propTypes = {
		isFocused: PropTypes.bool,
		isDragging: PropTypes.bool,
		isResizing: PropTypes.bool
	};

	render() {
		return (
			<div className={styles.webBrowser}>
				<div className={styles.urlBarWrapper}>
					<button onClick={this.props.goBackward}>
						{'<'}
					</button>
					<button onClick={this.props.goForward}>
						{'>'}
					</button>
					<input
						type="text"
						className={styles.urlBar}
						value={this.props.url}
						onChange={(e) => this.props.setUrl(e.target.value)}
						onKeyDown={(e) => {
							if (e.keyCode === ENTER) {
								e.preventDefault();
								this.props.navigate();
							}
						}}
					/>
				</div>
				<div className={styles.content}>
					<iframe
						className={styles.frame}
						src={this.props.location}
					/>
					{/*
						this mask is a bit of a hack to prevent the iframe from interfering with window
						drag + resize actions (it would otherwise swallow mouseup and mousemove events)
					*/}
					{ !this.props.isFocused || this.props.isDragging || this.props.isResizing ? (
						<div className={styles.contentMask} />
					) : null }
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		url: state.webBrowser.url,
		location: state.webBrowser.location
	};
}

const mapDispatchToProps = {
	setUrl,
	navigate,
	goForward,
	goBackward
};

export default connect(mapStateToProps, mapDispatchToProps)(WebBrowser);
