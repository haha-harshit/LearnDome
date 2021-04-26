
const nodemailer = require('../config/nodemailer');
// const Student = require('../models/student');

// another way of exporting a method
exports.newEnrollment = (enrolling_student) => {
    console.log('Inside newEnrollment mailer');
    console.log(enrolling_student.email);
    nodemailer.transporter.sendMail({
        from: 'domelearn@gmail.com',
        to: enrolling_student.email,
        subject: 'Enrollment Successful!',
        html: '<h1>Welcome to the new Course!</h1>',
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail!', err);
            return;
        }
        console.log('Mail sent', info);
        return;
    })
}
