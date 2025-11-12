import { useEffect, useRef, useState } from 'react';

/**
 * Timer component with start/pause/reset functionality
 * Displays elapsed time in human-readable format (days, hours, minutes, seconds)
 * Uses setInterval for accurate timing with cleanup on unmount
 * 
 * @param {string} name - Display name for the timer (default: 'TIMER')
 */
function Timer({ name }) {
    // State for elapsed time and running status
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    
    // Ref to hold interval ID for cleanup
    const intervalRef = useRef(null);

    // Start/stop interval when running state changes
    useEffect(() => {
        // Start timer if running and not already started
        if (running && !intervalRef.current) {
            intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
        }
        
        // Stop timer if not running and currently running
        if (!running && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        
        // Cleanup interval on component unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [running]);

    // Reset timer to zero
    const reset = () => setSeconds(0);

    // Convert seconds into human-readable time format
    const toTimeString = (s) => {
        const days = Math.floor(s / 86400);
        const hours = Math.floor((s % 86400) / 3600);
        const minutes = Math.floor((s % 3600) / 60);
        const seconds = s % 60;

        // Display appropriate units based on elapsed time
        if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
        if (minutes > 0) return `${minutes}m ${seconds}s`;
        return `${seconds}s`;
    };

    return (
        <div className="border border-black border-2 rounded-3 mx-auto p-2 bg-secondary-subtle" style={{ width: 'fit-content', minWidth: '180px' }}>
            {/* Timer title */}
            <h1 className="text-primary text-center fs-5 mb-2">{name || 'TIMER'}</h1>
            
            {/* Time display area */}
            <div className="border border-black border-1 rounded-3 text-center p-2 fs-6 mb-2 bg-white">
                {toTimeString(seconds)}
            </div>
            
            {/* Control buttons */}
            <div className="d-flex justify-content-center gap-2">
                {/* Reset button */}
                <button className="btn btn-danger btn-sm px-2 py-1" onClick={reset} style={{ fontSize: '0.75rem' }}>
                    <i className="bi bi-arrow-counterclockwise"></i>
                    <span className="ms-1">Reset</span>
                </button>
                
                {/* Play/Pause button - changes based on running state */}
                {running ? (
                    <button className="btn btn-warning btn-sm px-2 py-1" onClick={() => setRunning(false)} style={{ fontSize: '0.75rem' }}>
                        <i className="bi bi-pause-fill"></i>
                        <span className="ms-1">Pause</span>
                    </button>
                ) : (
                    <button className="btn btn-success btn-sm px-2 py-1" onClick={() => setRunning(true)} style={{ fontSize: '0.75rem' }}>
                        <i className="bi bi-play-fill"></i>
                        <span className="ms-1">Run</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Timer;