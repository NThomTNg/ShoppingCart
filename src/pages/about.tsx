import React from 'react';

type Partner = {
    name: string;
    logo: string;
  };

const About: React.FC = () => {

    const partners: Partner[] = [
        { name: "Partner 1", logo: "./images/nvideo.png" },
        { name: "Partner 2", logo: "./images/letni.png" },
      ];

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-5">About Us</h1>
      
      <section className="mb-5">
        <h2 className="h2 mb-3">Our Story</h2>
        <p className="lead">
          Founded in 2024, ComStarCenter has been at the forefront of the pc building industry.
          Our journey began with a simple idea:<br></br> How do we make it as convinent for gamers and enthusiast to build a perfect pc? We then
          landed on creating a online store for just that purpose. <br></br>
          Since then, we've grown into a team of passionate individuals dedicated to serve gamers all over the world, and to make
          builing a pc easier than ever. 
        </p>
      </section>
      
      <section className="mb-5">
        <h2 className="h2 mb-3">Our Mission</h2>
        <p className="lead">
          At ComStarCenter, together with our wonderful partners, our mission is to provide only the best and
          highest quality pc components <br></br> for our customers.
          We believe in efficincy, good prices, and excellent customer service,
          and these principles guide everything we do.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="h2 mb-3">Our Partners</h2>
        <div className="row row-cols-2 row-cols-md-4 g-4">
          {partners.map((partner, index) => (
            <div key={index} className="col">
              <div className="card h-100 border-0">
                <img src={partner.logo} alt={`${partner.name} logo`} className="card-img-top p-3" style={{objectFit: 'contain', height: '200px'}} />
                <div className="card-body text-center">
                  <h5 className="card-title">{partner.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      
      <section>
        <h2 className="h2 mb-3">Contact Us</h2>
        <p className="lead">
          We'd love to hear from you! Reach out to us at:
        </p>
        <ul className="list-unstyled">
          <li><strong>Email:</strong> PictureComic@comstarcenter.com</li>
          <li><strong>Phone:</strong> +(00) 456-7890</li>
          <li><strong>Address:</strong> 123 Not This Street, Existville, PC 12345</li>
        </ul>
      </section>
    </div>
  );
};

export default About;