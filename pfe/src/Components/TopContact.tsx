
interface Contact {
 phone:number,
 email: string,
 address:string   
}
function TopContact({phone,email,address}:Readonly<Contact>) {
  return (
    <div className="container">
<span>{phone}</span>
<span>{email}</span>
<span>{address}</span>
    </div>
  )
}
export default TopContact