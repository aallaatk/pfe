interface ButtonProps {
  text: string;
  bclass: string;
  icon?: string;
}

function Button({ text, bclass, icon }: Readonly<ButtonProps>) {
  return (
    <button style={{ color: 'white' }} type="button" className={bclass}>
       {text} {icon && <i className={icon} style={{marginLeft:'7px'}}></i>}
    </button>
  );
}

export default Button;
