import { useState } from "react";
import { Navbar } from "../components/Navbar";

export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  //Handling the input values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  //Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact);
  };

  return (
    <>
    <Navbar/>
      <section>
        <main>
          <div className="section-contact">
            <div className="contact-content container">
              <h1 className="main-heading">Contact Us</h1>
            </div>
            {/* contact main page */}
              <div className="container grid grid-two-cols">
                <div className="contact-image">
                  <img
                    src="/images/support.png"
                    alt="We are always ready to help"
                    width="500"
                    height="500"
                  />
                </div>
                {/* Lets tackle registration form */}
                <section className="section-form">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="username">username</label>
                      <input
                                  className="crudtableinputs"

                        type="text"
                        name="username"
                        placeholder="Username"
                        id="username"
                        autoComplete="off"
                        value={contact.username}
                        onChange={handleInput}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email">email</label>
                      <input
                                  className="crudtableinputs"

                        type="email"
                        name="email"
                        placeholder="Email"
                        id="email"
                        autoComplete="off"
                        value={contact.email}
                        onChange={handleInput}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message">message</label>
                      <textarea
                                  className="crudtableinputs"

                        name="message"
                        placeholder="Message"
                        id="message"
                        autoComplete="off"
                        value={contact.message}
                        onChange={handleInput}
                        required
                        cols="30"
                        rows="5"
                      ></textarea>
                    </div>

                    <div>
                      <button className="redbutton" type="submit">submit</button>
                    </div>
                  </form>
                </section>
              </div>
          </div>
        </main>
      </section>
    </>
  );
};
