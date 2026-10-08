async function update() {
  try {
    const loginRes = await fetch('http://127.0.0.1:5001/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    const loginData = await loginRes.json();
    console.log('Login result:', loginData);
    
    if (!loginData.token) {
      console.error('No token returned');
      return;
    }

    const settingsRes = await fetch('http://127.0.0.1:5001/api/admin/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify({
        phone: '+94 78 999 1624',
        whatsapp: '94789991624'
      })
    });
    const settingsData = await settingsRes.json();
    console.log('Updated settings response:', settingsData);

    const checkRes = await fetch('http://127.0.0.1:5001/api/settings');
    const checkData = await checkRes.json();
    console.log('Current public settings:', checkData);
  } catch (err) {
    console.error('Error:', err);
  }
}

update();
