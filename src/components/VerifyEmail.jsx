import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { uidb64, token } = useParams();
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!uidb64 || !token) {
        setStatus('error');
        setErrorMessage('Missing UID or token');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/accounts/verify-email/${uidb64}/${token}/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Verification failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('role', data.role.toUpperCase());
        localStorage.setItem('sub_role', data.sub_role);
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', `${data.first_name} ${data.last_name}`);

        switch (data.role.toUpperCase()) {
          case 'DOCTOR':
            navigate('/home');
            break;
          case 'ASSISTANT':
            navigate('/Assitanthome');
            break;
          case 'PATIENT':
            navigate('/Patienthome');
            break;
          case 'ADMIN':
            navigate('/Admin_Page');
            break;
          case 'DIRECTOR':
            navigate('/Patienthome');
            break;
          default:
            navigate('/profile');
            break;
        }

        localStorage.removeItem('pending_role');
        setStatus('success');
      } catch (error) {
        setStatus('error');
        setErrorMessage(error.message);
      }
    };

    verifyEmail();
  }, [navigate, uidb64, token]);

  if (status === 'loading') return <div>Vérification en cours...</div>;
  if (status === 'error') return (
    <div>
      Erreur: {errorMessage} 
      <button onClick={() => navigate('/')}>Retour</button>
    </div>
  );
  return <div>Succès, redirection...</div>;
};

export default VerifyEmail;