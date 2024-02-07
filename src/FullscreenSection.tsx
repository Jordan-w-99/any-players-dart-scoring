import { CSSProperties, RefObject } from "react"

const fullSectionStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    maxHeight: '100%',
    color: 'white',
}

export interface FullscreenSectionProps {
    sectionRef: RefObject<HTMLElement>
    element: React.JSX.Element
}

export const FullscreenSection = ({ sectionRef, element }: FullscreenSectionProps) => {
    return (
        <section
            style={fullSectionStyle}
            ref={sectionRef}
        >
            {element}
        </section>
    )
}