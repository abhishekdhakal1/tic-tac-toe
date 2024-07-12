import './index.css'
export default function Square({value,onHandleClick}){
    return <button className='button' onClick={onHandleClick}>{value}</button>
}