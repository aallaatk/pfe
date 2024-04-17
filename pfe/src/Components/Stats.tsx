
interface StatsInfo {
  tours: number;
  users: number;
  sites: number;
  guiders: number;
}

function Stats({ tours, users, sites, guiders }: Readonly<StatsInfo>) {
  return (
    <div className="container mt-5">
      <div className="row gx-3">
        {/* Adjust column classes to control spacing */}
        <div className="col-sm-6 col-md-3 text-center p-4" style={{ backgroundColor: '#3acadf' }}>
          <h2 className="h1 mb-4">{tours}</h2>
          <p className="mt-4">Tours created</p>
        </div>
        <div className="col-sm-6 col-md-3 text-center p-4" style={{ backgroundColor: '#729efd' }}>
          <h2 className="h1 mb-4">{users}</h2>
          <p className="mt-4">Active users</p>
        </div>
        <div className="col-sm-6 col-md-3 text-center p-4" style={{ backgroundColor: '#8a64d6' }}>
          <h2 className="h1 mb-4">{sites}</h2>
          <p className="mt-4">Sites to discover</p>
        </div>
        <div className="col-sm-6 col-md-3 text-center p-4" style={{ backgroundColor: 'rgb(12, 234, 217)' }}>
          <h2 className="h1 mb-4">{guiders}</h2>
          <p className="mt-4">Guiders available</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
