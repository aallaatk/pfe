import Button from "./Button";

function BrowseTours() {
  return (
    <section className="bt">
      <div className="container d-flex flex-column justify-content-center ">
        <h2 className="h1">Ready for your next holiday?</h2>
        <Button text={"Discover Sites"} bclass={"btn-grad mt-3"} />
      </div>
    </section>
  );
}

export default BrowseTours;
