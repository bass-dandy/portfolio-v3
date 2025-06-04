import React from 'react';

interface ErrorBoundaryProps {
	onCatch?: () => void;
	fallback?: React.ReactNode;
	children: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, {
	hasError: boolean;
}> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {hasError: false};
	}

	static getDerivedStateFromError() {
		return {hasError: true};
	}

	componentDidCatch() {
		this.props.onCatch?.();
	}

	render() {
		return this.state.hasError && this.props.fallback
			? this.props.fallback
			: this.props.children;
	}
}
