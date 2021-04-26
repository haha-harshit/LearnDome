
const nodemailer = require('../config/nodemailer');
// const Student = require('../models/student');

// another way of exporting a method
exports.newEnrollment = (enrolling_student) => {

    let htmlString = nodemailer.renderTemplate({enrolling_student: enrolling_student}, '/courses/new_course_enrollment.ejs');

    console.log('Inside newEnrollment mailer');
    console.log('sending E-mail to : ', enrolling_student.email);
    
    nodemailer.transporter.sendMail({
    
        from: 'domelearn@gmail.com',
        to: enrolling_student.email,
        subject: 'Enrollment Successful!',
        html: htmlString,
    
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail!', err);
            return;
        }
        console.log('Mail sent', info);
        return;
    })
}
