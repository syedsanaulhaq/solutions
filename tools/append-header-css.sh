#!/bin/bash
cat >> /home/hostingoceanuk/public_html/whmcs/templates/twenty-one/css/custom.css << 'ENDOFCSS'

/* ===== Twenty-One actual selectors (corrected from DOM inspection) ===== */

/* Header area */
header.headermain,
.headermain {
  background: linear-gradient(135deg, #071a0b 0%, #0d2b14 100%) !important;
  border-bottom: 1px solid #15803D33 !important;
}

/* Logo text */
a.headermain-logo-text,
.headermain-logo-text,
.headermain-logo a {
  color: #ffffff !important;
  font-weight: 700 !important;
  font-size: 1.3rem !important;
  text-decoration: none !important;
}

a.headermain-logo-text:hover,
.headermain-logo-text:hover {
  color: #86efac !important;
}

/* Navbar / nav */
.navmain-container {
  background: #0d2b14 !important;
  border-bottom: 1px solid #15803D44 !important;
}

nav.navmain a,
.navmain a {
  color: #d1fae5 !important;
  font-weight: 500 !important;
}

nav.navmain a:hover,
.navmain a:hover {
  color: #ffffff !important;
  background: #15803D33 !important;
}

/* Mobile nav icon */
.navmain-mobile-icon {
  color: #86efac !important;
}

/* Footer */
footer.footermain,
.footermain,
.footermain-background {
  background: linear-gradient(135deg, #071a0b 0%, #0d2b14 100%) !important;
  color: #86efac !important;
  border-top: 1px solid #15803D33 !important;
}

footer.footermain a,
.footermain a,
.footermain-background a {
  color: #86efac !important;
}

footer.footermain a:hover,
.footermain a:hover {
  color: #ffffff !important;
}

footer.footermain p,
.footermain p,
footer.footermain span,
.footermain span {
  color: #86efac !important;
}
ENDOFCSS
echo "Done appending CSS"
