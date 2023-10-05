import nodemailer from 'nodemailer';
import { v4 as uuid } from 'uuid';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const emailConfig: EmailConfig = {
      host: process.env.SMTP_HOST || '',
      port: Number(process.env.SMTP_PORT) || 0,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASSWORD || ''
      }
    };

    this.transporter = nodemailer.createTransport(emailConfig);
  }

  async sendVerifyEmail(email: string, verificationToken = uuid()) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Confirm email from CGS-camp TodoApp',
        text: '',
        html: `
<table
  cellpadding="0"
  cellspacing="0"
  border="0"
  width="100%"
  style="
    background: #f5f5f5;
    min-width: 320px;
    font-size: 1px;
    line-height: normal;
  "
>
  <tr>
    <td align="center" valign="top">
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="650"
        class="table650"
        style="max-width: 650px; min-width: 320px; background: #ffffff"
      >
        <tr>
          <td width="30" style="width: 30px; max-width: 30px; min-width: 30px">
            &nbsp;
          </td>
          <td align="center" valign="top">
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p
              style="
                font-size: 24px;
                font-weight: 700;
                margin: 0;
                display: block;
                color: #2b2b2b;
              "
            >
              Hello, ${email}
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p
              style="
                font-size: 24px;
                font-weight: 700;
                margin: 0;
                display: block;
                color: #2B2B2B;
              "
            >
              Welcome to Todo app
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p style="font-size: 16px; margin: 0; display: block">
              Click the button to confirm your email address to get started on
              Todo app
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <a
              style="
                text-decoration: none;
                text-transform: uppercase;
                font-size: 16px;
                padding: 20px;
                width: 150px;
                display: block;
                color: #ffffff;
                background-color: #2b2b2b;
                border-radius: 5px;
              "
              href="${process.env.BASE_URL}/api/user/verify/${verificationToken}"
              target="_blank"
            >
              Click here
            </a>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
                        <p style="font-size: 12px; margin: 0; display: block">
              If you didn’t request this email, there’s nothing to worry about —
              you can safely ignore it.
            </p>
            <div style="height: 5px; line-height: 5px; font-size: 5px">
              &nbsp;
            </div>
            <p style="font-size: 12px; margin: 0; display: block">
              Note: This is an automated response, so please do not reply to
              this email.
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`
      });
      return verificationToken;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  async sendNewPassword(email: string, password: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'New password from TodoApp',
        text: '',
        html: `
<table
  cellpadding="0"
  cellspacing="0"
  border="0"
  width="100%"
  style="
    background: #f5f5f5;
    min-width: 320px;
    font-size: 1px;
    line-height: normal;
  "
>
  <tr>
    <td align="center" valign="top">
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="650"
        class="table650"
        style="max-width: 650px; min-width: 320px; background: #ffffff"
      >
        <tr>
          <td width="30" style="width: 30px; max-width: 30px; min-width: 30px">
            &nbsp;
          </td>
          <td align="center" valign="top">
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p
              style="
                font-size: 24px;
                font-weight: 700;
                margin: 0;
                display: block;
                color: ##2b2b2b;
              "
            >
              Hello, ${email}
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p
              style="
                font-size: 24px;
                font-weight: 700;
                margin: 0;
                display: block;
                color: #2b2b2b;
              "
            >
              The Todo app welcomes you
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p style="font-size: 16px; margin: 0; display: block">
              Your new password: <b>${password}</b>
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p style="font-size: 12px; margin: 0; display: block">
              If you didn’t request this email, there’s nothing to worry about —
              you can safely ignore it.
            </p>
            <div style="height: 5px; line-height: 5px; font-size: 5px">
              &nbsp;
            </div>
            <p style="font-size: 12px; margin: 0; display: block">
              Note: This is an automated response, so please do not reply to
              this email.
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

export default new EmailService();
