import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emilTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendverificationEmail = async (email, verificationtoken) => {
    const recipient = [{ email }];

    try {
  
        const htmlContent = VERIFICATION_EMAIL_TEMPLATE(verificationtoken);

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: htmlContent, 
            category: "Email Verification"
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error in sending email", error);
    }
};


export const sendWelcomeEmail = async(email,name)=>{
    const recipient = [{email}];

    try {
       

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "a0db4aed-d61a-43b0-bd47-3d6af8ec40f4",
            template_variables: {
              "company_info_name": "Tech Stack",
              "name":name
              
            }
          })

          console.log("Welcome Email Send succefully")
        
    } catch (error) {
        console.log(error)
    }
}


export const sendresetPasswordEmail= async(email,resetURL)=>{
    const recipient = [{email}];

    try {
        const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE(resetURL);

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Password",
            html: htmlContent, 
            category: "password Reset"
            
          })

          console.log("Welcome Email Send succefully")
        
    } catch (error) {
        console.log(error)
    }
}
export const sendSuccessResetpassword= async(email)=>{
    const recipient = [{email}];

    try {
        const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE;

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Succefully",
            html: htmlContent, 
            category: "Reset password"
            
          })

          console.log("Password reset succuflly")
        
    } catch (error) {
        console.log(error)
    }
}

