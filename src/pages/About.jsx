import { Analytics } from "../components/Analytics";
import { NavLink } from "react-router-dom";

export const About = ()=>{
    return (
        <>
        <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              {/* <p>We care to cure your Health</p> */}

              <h1>Why Choose Us? </h1>
              <p>
              Any brand like HP printer repair services, Canon printer repair services, Epson printer repair services, brother printer repair services, GPS device repair, System repair and any other device repair services etc.. Printers can be repaired or improved by us, learn more about us and see why we are the best choice for your device repairs and upgrades.
              </p>
              <p>
              We provides you varieties of services for all kinds of printers and IT devices.
              </p>
              <p>
              We printer repair services that promise to running your business fluently.
              </p>
              <p>
                Affordability: We offer competitive pricing without compromising
                on the quality of our services.
              </p>
              <p>
              We believe in delivering customized and distinguishing services at competitive price.
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn"> Connect Now</button>
                </NavLink>
                <button className="btn secondary-btn">learn more</button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/about.png"
                alt="coding buddies "
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <Analytics />

        </>
    );
}