import { useEffect, useState } from 'react';

/**
 * Counter component with flexible numeric stepper functionality
 * Supports both controlled and uncontrolled state management
 * Can display integers or real numbers with step increments
 * Includes compact mode for embedding in other components
 * 
 * @param {string} name - Display name for the counter
 * @param {string} type - 'real' for decimal display, otherwise integer
 * @param {number} step - Increment/decrement value (default: 1)
 * @param {number} init - Initial value for uncontrolled mode
 * @param {number} value - Current value for controlled mode
 * @param {function} setValue - State setter for controlled mode
 * @param {boolean} compact - Whether to show compact version
 */
const Counter = ({ name, type, step = 1, init, value: controlledValue, setValue: controlledSetter, compact = false }) => {
    // Determine if this is a controlled component
    const isControlled = typeof controlledSetter === 'function';
    
    // Internal state only used when uncontrolled
    const [internal, setInternal] = useState(init ?? 0);

    // Keep internal state synced with init when uncontrolled
    useEffect(() => {
        if (!isControlled) setInternal(init ?? 0);
    }, [init, isControlled]);

    // Use controlled value or internal state
    const value = isControlled ? controlledValue ?? 0 : internal;
    const setValue = isControlled ? controlledSetter : setInternal;

    // Event handlers for increment/decrement
    const dec = () => setValue(prev => (prev ?? 0) - step);
    const inc = () => setValue(prev => (prev ?? 0) + step);

    // Format display value based on type
    const display = type === 'real' ? Number(value ?? 0).toFixed(2) : Math.floor(Number(value ?? 0));

    // Compact version for use in Adder and Temperatures components
    if (compact) {
        return (
            <div className="d-flex justify-content-center align-items-center gap-1">
                <button 
                    className="btn btn-danger px-2 py-1" 
                    onClick={dec}
                    style={{ fontSize: '1rem', minWidth: '35px' }}
                >
                    &minus;
                </button>
                <span 
                    className="fw-bold text-center" 
                    style={{ fontSize: '1.5rem', minWidth: '40px' }}
                >
                    {display}
                </span>
                <button 
                    className="btn btn-success px-2 py-1" 
                    onClick={inc}
                    style={{ fontSize: '1rem', minWidth: '35px' }}
                >
                    +
                </button>
            </div>
        );
    }

    // Original standalone design with border and title
    return (
        <div className="border border-black border-2 rounded-3 mx-auto p-2 bg-secondary-subtle" style={{ width: 'fit-content', minWidth: '180px' }}>
            {/* Counter title */}
            <h1 className="text-primary text-center fs-5 mb-2">{name || 'COUNTER'}</h1>
            
            {/* Control buttons and display */}
            <div className="d-flex justify-content-center align-items-center gap-2">
                <button className="btn btn-danger px-2 py-1" onClick={dec} style={{ fontSize: '1.1rem', minWidth: '40px' }}>&minus;</button>
                <span className="fw-bold fs-4 text-center" style={{ minWidth: '50px' }}>{display}</span>
                <button className="btn btn-success px-2 py-1" onClick={inc} style={{ fontSize: '1.1rem', minWidth: '40px' }}>+</button>
            </div>
        </div>
    );
};

export default Counter;
