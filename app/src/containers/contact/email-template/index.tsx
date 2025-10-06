import { FC } from "react";

interface EmailTemplateProps {
  name: string;
  organization?: string;
  email: string;
  message: string;
}

const EmailTemplate: FC<EmailTemplateProps> = ({ name, organization, email, message }) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", lineHeight: 1.5 }}>
      <h1>New Contact Form Submission</h1>

      <h2>Sender Details</h2>
      <ul>
        <li>
          <strong>Name:</strong> {name}
        </li>
        {organization && (
          <li>
            <strong>Organization:</strong> {organization}
          </li>
        )}
        <li>
          <strong>Email:</strong> {email}
        </li>
      </ul>

      <h2>Message</h2>
      <p>{message}</p>

      <hr />
      <footer style={{ fontSize: "0.8em", color: "#888" }}>
        This message was sent from your website contact form.
      </footer>
    </div>
  );
};

export default EmailTemplate;
