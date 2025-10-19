export default function Letter({value, clsxClass, handleClick}) {
    return (
        <button className={`letter ${clsxClass}`} onClick={() => handleClick(value)}>{value}</button>
    )
}