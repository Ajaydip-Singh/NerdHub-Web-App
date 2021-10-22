export default function MessageBox(props) {
  return (
    <div
      className={`${props.validation ? `alerts-validation` : `alert`} alerts-${
        props.variant || 'info'
      }`}
    >
      {props.children}
    </div>
  );
}
