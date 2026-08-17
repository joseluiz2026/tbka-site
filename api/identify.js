module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  try {
    const upstream = await fetch('https://tbka-api.vercel.app/v1/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TBKA_API_KEY}`,
      },
      body: JSON.stringify(req.body || {}),
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(502).json({ error: 'proxy_error', message: err.message });
  }
};
