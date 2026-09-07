import React from 'react';

export function QuickContactBanner({ onOpenBooking }) {
  return (
    <div className="quick-contact-area half-bg default-padding-top">
      <div className="container">
        <div className="quick-contact-items bg-cover text-light" style={{ backgroundImage: 'url(/assets/img/banner/7.jpg)' }}>
          <div className="row align-center">
            <div className="col-lg-8">
              <h4 className="sub-title text-cyan-300 font-bold uppercase text-xs">Need help?</h4>
              <h2 className="title text-2xl sm:text-3xl font-bold">
                Easy solutions for all <strong>difficult IT problems</strong>, keep business safe.
              </h2>
            </div>
            <div className="col-lg-4 text-end">
              <button onClick={onOpenBooking} className="btn btn-light effect btn-md cursor-pointer">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuickContactBanner;
