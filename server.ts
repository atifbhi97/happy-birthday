import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending Feedback
  app.post('/api/send-feedback', async (req, res) => {
    const { message } = req.body;
    
    // Uses Google App Password system if configured
    const userEmail = process.env.GMAIL_USER || 'atifbhe1504@gmail.com'; // Defaulting to the requested email
    const appPassword = process.env.GMAIL_PASS; 

    if (!appPassword) {
      console.warn("Emails won't actually send until GMAIL_PASS is configured in Settings.");
      // We will still send a 200 OK so the frontend transitions securely
      return res.status(200).json({ success: true, fake: true });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: userEmail,
          pass: appPassword
        }
      });

      await transporter.sendMail({
        from: `"Birthday Website" <${userEmail}>`,
        to: 'atifbhe1504@gmail.com', // Always sending to Atif
        subject: 'New Answer from Shia (Birthday Website)! ✨',
        text: `You have received a new answer from your interactive website:\n\nQuestion: "내 습관 중에 어떤 점이 제일 마음에 안 들어?"\nAnswer: ${message}`
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Nodemailer error:", error);
      res.status(500).json({ success: false, error: 'Could not send email' });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running with Fullstack backend on port ${PORT}`);
  });
}

startServer();
