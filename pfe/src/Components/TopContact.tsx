export interface Contact {
  phone: number;
  email: string;
  address: string;
}

function TopContact({ phone, email, address }: Readonly<Contact>) {
  return (
    <div className="container-fluid text-center bg-primary p-2">
      <span style={{ color: 'white' }}> <i className="fas fa-phone m-2"></i> +216 {phone}</span>
      <span style={{ color: 'white' }}> <i className="fas fa-envelope m-2"></i>{email}</span>
      <span style={{ color: 'white' }}> <i className="fas fa-home m-2"></i>{address}</span>
    </div>
  )
}

export default TopContact;
