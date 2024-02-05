interface Button{
  text:string
  bclass:string
  icon?:string
}

function Button({text,bclass,icon}:Readonly<Button>) {
  return (
    <button type="button" className={bclass}> {icon && <span className="icon">{icon}</span>} {text}</button>
  )
}

export default Button