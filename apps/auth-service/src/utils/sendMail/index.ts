import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';

dotenv.config();

const transporter = nodeMailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 587,
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

console.log({
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_SERVICE: process.env.MAIL_SERVICE,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD ? '***' : undefined,
    
  });
  

//Render an EJS template to HTML
const renderEmailTemplate = async(templateName:string, data:Record<string, any>): Promise<string> => {
    const templatePath = path.join(
        process.cwd(),
        'apps',
        'auth-service',
        'src',
        'utils',
        "email-templates",
        `${templateName}.ejs`
    );

    return await ejs.renderFile(templatePath, data)
}

//Send email using nodemailer
export const sendEmail = async (to: string, subject: string, templateName: string, data: Record<string, any>) => {
    try {
        const html = await renderEmailTemplate(templateName, data);
        const mailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
        return false;
    }
}