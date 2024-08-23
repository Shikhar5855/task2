import { Analytics } from "../components/Analytics";

export const Home = ()=>{
    return (
        <>
        <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <h1>Welcome to ADROITKEY  </h1>
                        <p>
                        GET EXCELLENT SERVICES AT
                        ONE PLACE FROM YOUR DEVICE DOCTOR
                        </p>
                        <p>
                        We are experts in services, repair, product, idea creation and can match your ideology to fulfill your needs. We have specialists in our team who work inflexibly nonstop and repairs your any brand Printers in the marketplace at a reasonable cost.
                        </p>
                        <div className="btn btn-group">
                            <a href="/contact"><button className="btn redbutton">Connect Now</button></a>
                            <a href="/service"><button className="btn whitebutton secondary-btn">Learn More</button></a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="/images/home.png" 
                        alt="Coding together" 
                        width="400"
                        height="500"
                        />
                    </div>
                </div>
            </section>
        </main>

        {/* 2nd Section */}
        <Analytics/>

        {/* 3rd Section */}

        <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-image">
                        <img src="/images/design.png" 
                        alt="Coding together" 
                        width="400"
                        height="500"
                        />
                    </div>
                    <div className="hero-content">
                        <p>We are here to help you</p>
                        <h1>Get Started Today</h1>
                        <p>
                        Welcome to AdroitKey and well known IT company specialized and all in one platform for your multiple needs. We are experts in services, repair, product, idea creation and can match your ideology to fulfill your needs. We have specialists in our team who work inflexibly nonstop and repairs your any brand Printers in the marketplace at a reasonable cost.
                        </p>
                        <div className="btn btn-group">
                            <a href="/contact"><button className="btn redbutton">Connect Now</button></a>
                            <a href="/service"><button className="btn whitebutton secondary-btn">Learn More</button></a>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}