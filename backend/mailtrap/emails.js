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
