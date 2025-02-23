export const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.token) {
      localStorage.setItem('token', response.token); 
    }
    return response.json();
  };
  
  export const register = async (email, password, role) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    if (response.token) {
      localStorage.setItem('token', response.token); 
    }
    return response.json();
  };