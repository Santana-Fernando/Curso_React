import './styles.css'
export const Button = (porps) => {
    const { text, onClick, disabled } = porps
    return (
        <button className='button' onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}