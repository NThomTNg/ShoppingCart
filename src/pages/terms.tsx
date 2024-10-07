import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-dark">
              <h1>Terms and Conditions</h1>
            </div>
            <div className="card-body">
              <h5>Introduction</h5>
              <p>
                By using our website, you agree to comply
                with and be bound by the following terms and conditions of use,
                which together with our privacy policy govern our relationship
                with you in relation to this website.
              </p>

              <h5>Use of Website</h5>
              <p>
                Your use of this website is subject to the following terms of use:
                The content of the pages of this website is for your general
                information and use only. It is subject to change without notice.
                Also automatically you have to give us free money, cause why not.
              </p>

              <h5>Limitation of Liability</h5>
              <p>
                We are not responsible for any damages or losses related to your
                use of this website. This includes direct, indirect, incidental, or
                consequential damages.
              </p>

              <h5>Governing Law</h5>
              <p>
                These terms and conditions are governed by and construed in
                accordance with the laws of your country.
              </p>
            </div>
            <div className="card-footer text-muted">
              Last Updated: September 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
