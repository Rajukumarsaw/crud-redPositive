const nodemailer = require('nodemailer');

const sendMail=async (req, res) => {
    const selectedRows = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rk8271740@gmail.com',
        pass: 'ooxviisaeyrpvvjx'
      }
    });
  
    // Construct email message
    const mailOptions = {
      from: 'rk8271740@gmail.com',
      to: 'info@redpositive.in',
      subject: 'Selected Row Data',
      text: JSON.stringify(selectedRows)
    };
  
    // Send email
    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  }
  module.exports=sendMail