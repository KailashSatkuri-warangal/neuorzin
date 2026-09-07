import React from 'react';

export function WorkProcessSection() {
  return (
    <div className="work-process-area overflow-hidden default-padding bottom-less">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4>Process</h4>
              <h2 className="title">How we works</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="work-pro-items">
          <div className="row">
            <div className="single-item col-lg-3 col-md-6">
              <div className="item">
                <div className="item-inner">
                  <div className="icon">
                    <i className="flaticon-select"></i>
                    <span>01</span>
                  </div>
                  <h5>Choose a Service</h5>
                  <p>Select from our specialized engineering domains or define a custom technical scope.</p>
                </div>
              </div>
            </div>
            <div className="single-item col-lg-3 col-md-6">
              <div className="item">
                <div className="item-inner">
                  <div className="icon">
                    <i className="flaticon-video-call"></i>
                    <span>02</span>
                  </div>
                  <h5>Request a Meeting</h5>
                  <p>Book a direct calendar session with our Principal Architects to align on requirements.</p>
                </div>
              </div>
            </div>
            <div className="single-item col-lg-3 col-md-6">
              <div className="item">
                <div className="item-inner">
                  <div className="icon">
                    <i className="flaticon-strategy"></i>
                    <span>03</span>
                  </div>
                  <h5>Receive Custom Plan</h5>
                  <p>Get an in-depth architectural blueprint and transparent milestone sprint schedule.</p>
                </div>
              </div>
            </div>
            <div className="single-item col-lg-3 col-md-6">
              <div className="item">
                <div className="item-inner">
                  <div className="icon">
                    <i className="flaticon-help"></i>
                    <span>04</span>
                  </div>
                  <h5>Let’s Make it Happen</h5>
                  <p>Our dedicated pods initiate rapid development sprints with continuous CI/CD staging.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WorkProcessSection;
