import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const supportSection = `
  <div style="margin-top:32px; padding:20px; background:#fafafa; border-radius:10px;">
    <p style="margin:0; font-size:14px; color:#555;">
      Have questions or need help getting set up?
    </p>

    <p style="margin:8px 0 0; font-size:14px;">
      Just reply to this email or contact us at 
      <a href="mailto:support@yourtimer.io" style="color:#111; font-weight:600; text-decoration:none;">
        support@yourtimer.io
      </a>
    </p>
  </div>
`;

export async function sendEmailVerification({
  to,
  token,
}: {
  to: string;
  token: string;
}) {
  const verifyUrl =
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}&callbackURL=/dashboard`;

  const { data, error } = await resend.emails.send({
    from: "YourTimer <noreply@yourtimer.io>",
    to,
    subject: "Verify your email – YourTimer.io",
    text: `Welcome to YourTimer!

Please verify your email address:

${verifyUrl}

This link expires in 24 hours.`,
    html: `
      <div style="font-family: Inter, system-ui, -apple-system, sans-serif; background:#f5f5f5; padding:40px;">
        <div style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:12px; padding:32px;">
          
          <h1 style="margin-top:0;">Welcome to YourTimer 🚀</h1>

          <p style="font-size:15px; color:#555;">
            Thanks for signing up. Before you start creating high-converting countdown timers,
            please verify your email address.
          </p>

          <a
            href="${verifyUrl}"
            style="
              display:inline-block;
              background:#111;
              color:#fff;
              text-decoration:none;
              padding:14px 22px;
              border-radius:8px;
              font-weight:600;
              font-size:15px;
              margin:20px 0;
            "
          >
            Verify Email
          </a>

          <p style="font-size:13px; color:#888; margin-top:16px;">
            This link expires in 24 hours.
          </p>

          ${supportSection}


          <hr style="margin:32px 0;" />



          <p style="font-size:14px;">
            Build urgency. Increase conversions.<br/>
            <strong>YourTimer.io</strong>
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send verification email", error);
    throw new Error("Verification email failed");
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("Verification email sent", { id: data?.id });
  }
}

export async function sendWelcomeEmail({
    to,
  }: {
    to: string;
  }) {
    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;
  
    await resend.emails.send({
      from: "YourTimer <noreply@yourtimer.io>",
      to,
      subject: "You're in 🎉 Let’s build your first timer",
      html: `
        <div style="font-family: Inter, system-ui, -apple-system, sans-serif; background:#f5f5f5; padding:40px;">
          <div style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:12px; padding:32px;">
            
            <h1 style="margin-top:0;">You're all set 🎉</h1>
  
            <p style="font-size:15px; color:#555;">
              Your email is verified and your account is ready.
            </p>
  
            <a
              href="${dashboardUrl}"
              style="
                display:inline-block;
                background:#111;
                color:#fff;
                text-decoration:none;
                padding:14px 22px;
                border-radius:8px;
                font-weight:600;
                font-size:15px;
                margin:20px 0;
              "
            >
              Create Your First Timer
            </a>
  
            <p style="font-size:14px; margin-top:24px;">
              Pro tip: Pin your timer to your homepage for maximum urgency.
            </p>

            ${supportSection}

  
            <hr style="margin:32px 0;" />
  
            <p style="font-size:14px;">
              Let’s increase your conversions,<br/>
              <strong>YourTimer.io</strong>
            </p>
          </div>
        </div>
      `,
    });
  }