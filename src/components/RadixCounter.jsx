import { useState } from "react"
const RadixCounter = () => {
    //    getter and setter for value
    const [value, setValue] = useState(0)

    const minusClicked = () => {
        if (value <= 0) setValue(4095)
        else setValue((p) => p - 1)
    }
    
    const resetClicked = () => {
        setValue(0)
    }
    
    const plusClicked = () => {
        if (value >= 4095) setValue(0)
        else setValue((p) => p + 1)
    }

    return (
        // main container
        <div className="border border-2 border-black rounded-3 m-auto p-3" style={{width: '600px'}}>
            
            {/* title */}
            <h1 className="text-center fw-bold">RADIX COUNTER</h1>
            
            {/* body */}
            <div className="d-flex justify-content-between text-center gap-3 mt-3">
                <div>
                    <div className="fs-4 fw-bold">[HEX]</div>
                    <div className="fs-5 font-monospace">{value.toString(16).padStart(3, '0').toUpperCase()}</div>
                </div>
                <div>
                    <div className="fs-4 fw-bold">[DEC]</div>
                    <div className="fs-5 font-monospace text-primary fw-bold">{value.toString().padStart(4, '0')}</div>
                </div>
                <div>
                    <div className="fs-4 fw-bold">[OCT]</div>
                    <div className="fs-5 font-monospace">{value.toString(8).padStart(4, '0').toUpperCase()}</div>
                </div>
                <div>
                    <div className="fs-4 fw-bold">[BIN]</div>
                    <div className="fs-5 font-monospace">{value.toString(2).padStart(8, '0')}</div>
                </div>
            </div>
            
            {/* buttons */}
            <div className="d-flex justify-content-around mt-3">
                <button className="btn btn-danger px-4" onClick={() => {minusClicked()}}>&minus;</button>
                <button className="btn btn-secondary px-4" onClick={() => {resetClicked()}}>RESET</button>
                <button className="btn btn-success px-4" onClick={() => {plusClicked()}}>+</button>
            </div>
        </div>
    )
}

export default RadixCounter