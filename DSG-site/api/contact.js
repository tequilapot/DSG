// Example of a properly formatted serverless function
export default async function handler(req, res) {
  try {
    // Only allow POST method
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Parse the request body
    const { name, email, message } = req.body;
    
    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Process the contact form (e.g., send email, store in database)
    // Replace with your actual logic
    console.log('Contact form submission:', { name, email, message });

    // Return a properly stringified response
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}