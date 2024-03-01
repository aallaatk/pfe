import Button from "./Button";

function BrowseTours() {
  return (
    <section className="bt mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="d-flex flex-column">
              <h2 className="h1">Ready for your next holiday?</h2>
              <Button text={"Browse Tours"} bclass={" mt-5 btn btn-grad  "} icon='fa-solid fa-magnifying-glass' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrowseTours;
