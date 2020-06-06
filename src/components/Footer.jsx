import React from 'react';

const date = new Date().getFullYear();

function Footer(){
    return(<footer class="page-footer font-small blue"><hr></hr>
    <div>Join the fight to STOP child trafficking for good!!!
      <small class="form-text text-muted">© {date} COGNITO </small>  
      </div>
  </footer>)
    
}


export default Footer;