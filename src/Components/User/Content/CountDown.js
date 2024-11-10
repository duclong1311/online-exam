import { useRef, useEffect, useState } from "react";

const CountDown = ({ onTimesUp }) => {
    const onTimesUpRef = useRef(onTimesUp);
    const [count, setCount] = useState(5);

    useEffect(() => {
        onTimesUpRef.current = onTimesUp;
    }, [onTimesUp]);

    useEffect(() => {
        if (count === 0) {
            onTimesUpRef.current(); 
            return;
        }

        const timer = setTimeout(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [count]); 

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    return (
        <>
            <div className="countdown-container">
                {toHHMMSS(count)}
            </div>
        </>
    )
}

export default CountDown;