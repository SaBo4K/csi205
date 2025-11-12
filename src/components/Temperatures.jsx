import { useMemo, useState } from 'react';
import Value from './Counter';

/**
 * Temperature conversion component with three nested boxes
 * Converts between Celsius, Fahrenheit, and Kelvin in real-time
 * Uses Celsius as canonical state with computed values for other units
 * Prevents temperatures below absolute zero (-273.15°C)
 * 
 * @param {string} name - Display name for the component (default: 'TEMPERATURES')
 */

// Format number with exactly 2 decimal places (keeps trailing zeros)
const fmt2 = (n) => Number(n).toFixed(2);

const Temperatures = ({ name }) => {
	// Canonical state in Celsius - all other temperatures are computed from this
	const [celsius, setCelsius] = useState(25);

	// Computed values for other temperature units
	const fahrenheit = useMemo(() => celsius * 9 / 5 + 32, [celsius]);
	const kelvin = useMemo(() => celsius + 273.15, [celsius]);

	// Clamp temperature to absolute zero (-273.15°C)
	const clampC = (c) => Math.max(-273.15, c);

	// Controlled setters that accept either value or updater function (like React's setState)
	
	// Direct Celsius setter
	const setFromCelsius = (updater) => {
		setCelsius((prevC) => clampC(typeof updater === 'function' ? updater(prevC) : updater));
	};

	// Convert from Fahrenheit to Celsius
	const setFromFahrenheit = (updater) => {
		setCelsius((prevC) => {
			const prevF = prevC * 9 / 5 + 32;
			const nextF = typeof updater === 'function' ? updater(prevF) : updater;
			const nextC = (nextF - 32) * 5 / 9;
			return clampC(nextC);
		});
	};

	// Convert from Kelvin to Celsius
	const setFromKelvin = (updater) => {
		setCelsius((prevC) => {
			const prevK = prevC + 273.15;
			const nextK = typeof updater === 'function' ? updater(prevK) : updater;
			const nextC = nextK - 273.15;
			return clampC(nextC);
		});
	};

	return (
		<div className="h-100 d-flex flex-column justify-content-between">
			{/* Component title */}
			<h1 className="text-primary text-center fs-4 mb-2">{name || 'TEMPERATURES'}</h1>
			
			{/* Temperature display badges showing current values */}
			<div className="row g-1 mb-2 text-center">
				<div className="col d-flex justify-content-center">
					<span className="badge bg-primary fs-6 px-2 py-1">{fmt2(celsius)} °C</span>
				</div>
				<div className="col d-flex justify-content-center">
					<span className="badge bg-primary fs-6 px-2 py-1">{fmt2(fahrenheit)} °F</span>
				</div>
				<div className="col d-flex justify-content-center">
					<span className="badge bg-primary fs-6 px-2 py-1">{fmt2(kelvin)} °K</span>
				</div>
			</div>
			
			{/* Temperature control boxes - three nested boxes side by side */}
			<div className="row g-1 flex-fill d-flex align-items-center">
				{/* Celsius control box */}
				<div className="col d-flex justify-content-center">
					<div className="border border-black border-2 rounded-3 p-2 bg-light text-center w-100">
						<div className="fs-6 text-primary fw-bold mb-1">CELSIUS</div>
						<div className="d-flex justify-content-center align-items-center gap-1">
							<button 
								className="btn btn-danger px-2 py-1" 
								onClick={() => setFromCelsius(prev => prev - 1)}
								style={{ fontSize: '0.9rem', minWidth: '30px' }}
							>
								&minus;
							</button>
							<span 
								className="fw-bold text-center" 
								style={{ fontSize: '1.1rem', minWidth: '50px' }}
							>
								{fmt2(celsius)}
							</span>
							<button 
								className="btn btn-success px-2 py-1" 
								onClick={() => setFromCelsius(prev => prev + 1)}
								style={{ fontSize: '0.9rem', minWidth: '30px' }}
							>
								+
							</button>
						</div>
					</div>
				</div>
				
				{/* Fahrenheit control box */}
				<div className="col d-flex justify-content-center">
					<div className="border border-black border-2 rounded-3 p-2 bg-light text-center w-100">
						<div className="fs-6 text-primary fw-bold mb-1">FAHRENHEIT</div>
						<div className="d-flex justify-content-center align-items-center gap-1">
							<button 
								className="btn btn-danger px-2 py-1" 
								onClick={() => setFromFahrenheit(prev => prev - 1)}
								style={{ fontSize: '0.9rem', minWidth: '30px' }}
							>
								&minus;
							</button>
							<span 
								className="fw-bold text-center" 
								style={{ fontSize: '1.1rem', minWidth: '50px' }}
							>
								{fmt2(fahrenheit)}
							</span>
							<button 
								className="btn btn-success px-2 py-1" 
								onClick={() => setFromFahrenheit(prev => prev + 1)}
								style={{ fontSize: '0.9rem', minWidth: '30px' }}
							>
								+
							</button>
						</div>
					</div>
				</div>
				
				{/* Kelvin control box */}
				<div className="col d-flex justify-content-center">
					<div className="border border-black border-2 rounded-3 p-2 bg-light text-center w-100">
						<div className="fs-6 text-primary fw-bold mb-1">KELVIN</div>
						<div className="d-flex justify-content-center align-items-center gap-1">
							<button 
								className="btn btn-danger px-2 py-1" 
								onClick={() => setFromKelvin(prev => prev - 1)}
								style={{ fontSize: '0.9rem', minWidth: '30px' }}
							>
								&minus;
							</button>
							<span 
								className="fw-bold text-center" 
								style={{ fontSize: '1.1rem', minWidth: '50px' }}
							>
								{fmt2(kelvin)}
							</span>
							<button 
								className="btn btn-success px-2 py-1" 
								onClick={() => setFromKelvin(prev => prev + 1)}
								style={{ fontSize: '0.9rem', minWidth: '30px' }}
							>
								+
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Temperatures;
