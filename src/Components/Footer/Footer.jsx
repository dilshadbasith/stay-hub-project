import React from 'react'
import '../Footer/Footer.css'

function Footer() {
  return (
    <div className='footer-main'>
        <div className='footer-sub'>
           <h5 className='footer-heading'>Support</h5>
           <p>Help Centre</p>
           <p>AirCover</p>
           <p>Anti-discrimination</p>
           <p>Disability support</p>
           <p>Cancellation options</p>
           <p>Report neighbourhood concern</p>
        </div>
        <div className='footer-sub'>
            <h5 className='footer-heading'>Hosting</h5>
            <p>Airbnb your home</p>
            <p>AirCover for Hosts</p>
            <p>Hosting resources</p>
            <p>Community forum</p>
            <p>Hosting responsibly</p>
        </div>
        <div className='footer-sub'>
            <h5 className='footer-heading'>Airbnb</h5>
            <p>Newsroom</p>
            <p>New features</p>
            <p>Careers</p>
            <p>Investors</p>
            <p>Airbnb.org emergency stays</p>
        </div>
    </div>
  )
}

export default Footer