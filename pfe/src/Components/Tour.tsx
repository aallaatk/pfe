import { TourInfo } from '../functions';
import Button from './Button';

function Tour({ tourname, creator, date, price, image }: Readonly<TourInfo>) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={image instanceof File ? URL.createObjectURL(image) : '/placeholder.jpg'} className="card-img-top" alt="Tour" />
      <div className="card-body">
        <h5 className="card-title">{tourname}</h5>
        <h5 className="card-title">{creator}</h5>
        <p className="card-title">{date}</p>
        <p className="card-title">
          <span style={{ color: '#040073', fontWeight: 'bold', fontSize: '22px' }}>{price}dt</span> per person
        </p>
        <Button text={'more info'} bclass={'btn btn-grad text-center'} />
      </div>
    </div>
  );
}

export default Tour;
