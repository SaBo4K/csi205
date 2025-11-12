import { useState } from 'react';
import Value from './Counter'

/**
 * Adder component that adds two numbers (A + B)
 * Features nested box design with individual controls for A and B values
 * Displays real-time sum calculation with status badges
 * 
 * @param {string} name - Display name for the component (default: 'ADD')
 */
const Adder = ({ name }) => {
    // State for the two numbers being added
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    
    // Calculate sum in real-time
    const sum = a + b;
    
    return (
        <div className="border border-black border-2 rounded-4 mx-auto p-3 bg-secondary-subtle h-100" style={{ width: '100%' }}>
            <div className="h-100 d-flex flex-column justify-content-between">
                {/* Component title */}
                <h1 className="text-center text-primary mb-2 fs-3">{name || 'ADD'}</h1>
                
                {/* Status badges showing current values and sum */}
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <span className="badge bg-secondary fs-6 px-2 py-1">A={a}</span>
                    <span className="badge bg-primary fs-5 px-3 py-1">A+B={sum}</span>
                    <span className="badge bg-secondary fs-6 px-2 py-1">B={b}</span>
                </div>
                
                {/* Nested boxes containing counter controls */}
                <div className="d-flex justify-content-center gap-3 flex-fill align-items-center">
                    {/* Box A - Left side input */}
                    <div className="border border-black border-2 rounded-3 p-3 bg-light text-center flex-fill">
                        <h4 className="text-primary mb-2 fs-5">A</h4>
                        <Value name={'A'} value={a} setValue={setA} compact={true} />
                    </div>
                    
                    {/* Box B - Right side input */}
                    <div className="border border-black border-2 rounded-3 p-3 bg-light text-center flex-fill">
                        <h4 className="text-primary mb-2 fs-5">B</h4>
                        <Value name={'B'} value={b} setValue={setB} compact={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adder