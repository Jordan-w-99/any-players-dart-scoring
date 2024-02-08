import { useState } from "react"
import styles from './NumberSpinner.module.css'

export interface NumberSpinnerProps {
    min: number
    max: number
    defaultNumber: number
    onChange?: (currentNumber: number) => void
}

export const NumberSpinner = ({ min, max, defaultNumber, onChange = () => { } }: NumberSpinnerProps) => {
    const [currentNumber, setCurrentNumber] = useState(defaultNumber)

    const increment = () => {
        const updatedNumber = currentNumber + 1

        if (updatedNumber > max) {
            return
        }

        setCurrentNumber(updatedNumber)
        onChange(updatedNumber)
    }

    const decrement = () => {
        const updatedNumber = currentNumber - 1

        if (updatedNumber < min) {
            return
        }

        setCurrentNumber(updatedNumber)
        onChange(updatedNumber)
    }

    return (
        <div
            className={styles.spinnerContainer}
        >
            <button
                onClick={decrement}
                className={`${styles.spinnerBase} ${styles.spinnerButtonL} ${styles.spinnerButton}`}
            >-</button>
            <input
                type="number"
                value={currentNumber}
                className={`${styles.spinnerBase} ${styles.spinnerInput}`}
            />
            <button
                onClick={increment}
                className={`${styles.spinnerBase} ${styles.spinnerButtonR} ${styles.spinnerButton}`}
            >+</button>
        </div>
    )
}