const { Resend } = require('resend');

const resend = new Resend('re_c9nyGkKu_DkrZLHWD18fefm23mFagV5Up');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'hammadnawaz519@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
}).then(console.log).catch(console.error);