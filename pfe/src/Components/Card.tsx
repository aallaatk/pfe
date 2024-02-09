interface TourInfo{
    local:string,
    creator:string,
    description?:string,
    guider:string,
    groupNumber :number
    date:string
    price:number
}
function Card({local,creator,description,guider,groupNumber,date,price}:Readonly<TourInfo>) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title"> <span>Localization  :</span> {local} </h5>
        <p className="card-text"><span> Creator: </span> {creator}</p>
        <p className="card-text"><span> Description: </span> {description}</p>
        <p className="card-text"><span> Guider: </span> {guider}</p>
        <p className="card-text"><span> Group Number: </span> {groupNumber}</p>
        <p className="card-text"><span> Date: </span> {date}</p>
        <p className="card-text"><span> Price: </span> {price} D</p>
        <a href="#" className="btn btn-primary text-center">Book!</a>
      </div>
    </div>
  )
}

export default Card