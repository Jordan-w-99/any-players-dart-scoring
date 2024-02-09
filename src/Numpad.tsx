import { FaCheck, FaXmark } from 'react-icons/fa6'
import styles from './Numpad.module.css'
import { useState } from 'react'

interface NumpadKeyProps {
    val?: number
    display?: React.JSX.Element
    getVal?: (val: number) => void
    performAction?: () => void
}

const NumpadKey = ({ val, display, getVal = () => { }, performAction = () => { } }: NumpadKeyProps) => {
    return (
        <button
            onClick={() => {
                getVal(val ?? 0)
                performAction()
            }}
            className={styles.numKey}
        >
            {display || val}
        </button>
    )
}

export interface NumpadProps {
    maxVal: number
    cofirmPressed: (val: number) => void
}

export const Numpad = ({ maxVal, cofirmPressed }: NumpadProps) => {
    const [value, setValue] = useState<number | null>(null)

    const numberPressed = (val: number) => {
        const updatedValue = ((value ?? 0) * 10) + val

        if (updatedValue > maxVal) {
            return
        }

        setValue(updatedValue)
    }

    const clearValue = () => {
        setValue(null)
    }

    const confirmValue = () => {
        if (value == null) {
            return
        }

        cofirmPressed(value)
        clearValue()
    }

    return (
        <div>
            <div className={styles.valueDisplayContainer}>
                <div className={styles.valueDisplay}>
                    {value || <div className={styles.valuePlaceholder}>-</div>}
                </div>
            </div>
            <div className={styles.numpadContainer}>
                <div className={styles.numRow}>
                    <NumpadKey val={1} getVal={numberPressed} />
                    <NumpadKey val={2} getVal={numberPressed} />
                    <NumpadKey val={3} getVal={numberPressed} />
                </div>
                <div className={styles.numRow}>
                    <NumpadKey val={4} getVal={numberPressed} />
                    <NumpadKey val={5} getVal={numberPressed} />
                    <NumpadKey val={6} getVal={numberPressed} />
                </div>
                <div className={styles.numRow}>
                    <NumpadKey val={7} getVal={numberPressed} />
                    <NumpadKey val={8} getVal={numberPressed} />
                    <NumpadKey val={9} getVal={numberPressed} />
                </div>
                <div className={styles.numRow}>
                    <NumpadKey display={<FaXmark />} performAction={clearValue} />
                    <NumpadKey val={0} getVal={numberPressed} />
                    <NumpadKey display={<FaCheck />} performAction={confirmValue} />
                </div>
            </div>
        </div>
    )
}   