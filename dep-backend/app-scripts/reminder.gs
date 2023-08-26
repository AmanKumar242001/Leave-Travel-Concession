function doPost(request) {
  const e = request.parameter;
  let json = {
    firstName: e.firstName,
    lastName: e.lastName,
    delay: e.delay,
    stageCurrent: e.stageCurrent,
    id: e.id
    }
    let email = e.email
  emailBody = `
  <body>
    <div style=" font-size: 1.125rem; /* 18px */
    line-height: 1.75rem; /* 28px */">
        LTC file No.
    </div>
    <div style="font-weight:700; font-size: 2.25rem; line-height: 2.5rem; color: dimgray;">${json.id}</div>
     <div style="font-size: 1.125rem; line-height: 1.75rem; /* 28px */">
       has been kept pending for the last ${json.delay} days. 
    </div>
     <div style="font-size: 1.125rem; line-height: 1.75rem; /* 28px */">
        Please review it as soon as possible
     </div>
     <div style="font-size: 1.125rem; line-height: 1.75rem; /* 28px */">
       Applicant Name: ${json.firstName + " " + json.lastName}
     </div>
    </body>
`
  GmailApp.sendEmail(email, 'Reminder for forwarding LTC Form', '', {
    htmlBody: emailBody
  })
  return ContentService.createTextOutput(JSON.stringify(json))
}
