import { VERIFICATION_EMAIL_TEMPLATE } from "./emilTemplate.js";
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
            template_uuid: "441cb485-4463-46b9-9704-e7b6c0bc5068",
            template_variables: {
              "company_info_name": "Tech Stack",
              "name":"name"
              
            }
          })

          console.log("Welcome Email Send succefully")
        
    } catch (error) {
        console.log(error)
    }
}
