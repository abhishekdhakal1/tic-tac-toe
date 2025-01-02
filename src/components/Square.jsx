import "./index.css";
export default function Square(props) {
  const { onHandleClick, value } = props;
  return (
    <button className="button" onClick={onHandleClick}>
      {value}
    </button>
  );
}
