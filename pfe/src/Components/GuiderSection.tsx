import Guider from "./Guider"
function GuiderSection() {
  return (
    <section>
    <div className="container">
        <div className="row"> 
        <h2 className="text-center">Our Guiders</h2>
        </div>
        <div className="row mt-5">
            <div className="col-sm-4">
                <Guider name={"Ala"} rating={0} about={"nice man"} age={22} languages={["arabe", "french"]} email={"sleidf"} gsm={655}/>
            </div>
        </div>
    </div>
    </section>
  )
}

export default GuiderSection