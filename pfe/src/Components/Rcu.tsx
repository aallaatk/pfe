import { Contact } from "./TopContact";

function Rcu({phone, email, address}: Readonly<Contact>) {
  return (
    <div style={{ textAlign: 'center', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h5 className='mt-4' style={{ fontSize: '1.2em'}}>
        <span style={{fontWeight: 'bold',color: '#040073'}}>GSM:</span> +216 {phone}
      </h5>
      <h5 className='mt-4' style={{ fontSize: '1.2em'}}>
        <span style={{fontWeight: 'bold' ,color: '#040073'}}>Email:</span> {email}
      </h5>
      <h5 className='mt-4' style={{ fontSize: '1.2em'}}>
        <span style={{fontWeight: 'bold',color: '#040073'}}>Address:</span> {address}
      </h5>
    </div>
  );
}

export default Rcu;
