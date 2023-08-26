function doPost(e) {
  var email = e.parameters.email;
  var body = e.parameters.body;
  var subject = "OTP"
  emailBody = `<h1>Your OTP is ${body}</h1>`
  GmailApp.sendEmail(email,subject, '', {
    htmlBody: emailBody
  })
}

