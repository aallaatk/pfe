function Steps() {
    return (
      <div className="container mt-5">
        <div className="row">
          <h2 className="h1 text-center"> Book Tours with <span style={{ fontWeight: 'bold', color: '#040073' }}>2</span> clicks !</h2>
        </div>
        <div className="row g-2 mt-5" id="steps"> 
          <div className="col-sm-6 col-md-4 text-center" style={{ backgroundColor: '#3acadf' }}>
            <h2 className="h1 mb-4">Browse Tour</h2>
            <span><i className="fa-solid fa-hand-pointer fa-2x" style={{ color: '#ffffff' }}></i></span>
            <p className="mt-4"> Select the tour that align  <br />with ur interests the best</p>
          </div>
          <div className="col-sm-6 col-md-4 text-center" style={{ backgroundColor: '#729efd' }}>
            <h2 className="h1 mb-4">Book Tour</h2>
            <span> <i className="fa-solid fa-check-double fa-2x" style={{ color: '#ffffff' }}></i></span>
            <p className="mt-4">Make the payment process <br /> and receive ur receipt</p>
          </div>
          <div className="col-sm-6 col-md-4 text-center" style={{ backgroundColor: '#8a64d6' }}>
            <h2 className="h1 mb-4"> Attend Tour</h2>
            <span><i className="fa-solid fa-person-circle-check fa-2x" style={{ color: '#ffffff' }}></i></span>
            <p className="mt-4">Be present on tour day  <br />and enjoy yourself!</p>
          </div>
        </div>
      </div>
    )
  }
  
  export default Steps;
  