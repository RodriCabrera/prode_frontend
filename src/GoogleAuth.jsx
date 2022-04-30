import React from 'react';

function GoogleAuth() {
  return <a href="http://localhost:8080/auth/google">GoogleAuth</a>;
}
// router.get('/google', passport.authenticate('google', {
//     scope: ['profile', 'email'],
//     prompt: 'select_account'
// }))
export default GoogleAuth;
