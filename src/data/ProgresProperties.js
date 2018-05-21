export function LineProperties() {
	return ({
		strokeWidth: 1,
		easing: 'easeInOut',
		duration: 1400,
		color: '#A6E22E',
		trailColor: '#eee',
		trailWidth: 0.1,
		svgStyle: null,
	});
}

export function BarProperties() {
	return ({
		strokeWidth: 6,
		easing: 'easeInOut',
		duration: 1400,
		color: '#A6E22E',
		trailColor: '#eee',
		trailWidth: 1,
		svgStyle: null,
	});
}

export function SemiProperties() {
	return ({
		strokeWidth: 6,
		color: '#FFEA82',
		trailColor: '#eee',
		trailWidth: 1,
		easing: 'easeInOut',
		duration: 1400,
		svgStyle: null,
		text: {
			value: '',
			alignToBottom: false
		},
		from: {color: '#A6E22E'},
		to: {color: '#D81E5B'},
		// Set default step function for all animate calls
		step: (state, bar) => {
			bar.path.setAttribute('stroke', state.color);
			var value = Math.round(bar.value() * 100);
			if (value === 0) {
				bar.setText('');
			} else {
				bar.setText(value+"ms");
			}
	
			bar.text.style.color = state.color;
		}
	});
}