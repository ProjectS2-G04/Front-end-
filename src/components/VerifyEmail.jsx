// src/components/VerifyEmail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Vérification en cours...');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/verify-email/${uidb64}/${token}/`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Email verified successfully') {
          setMessage('Email vérifié avec succès ! Vous pouvez maintenant vous connecter.');
          setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
        } else {
          setMessage(data.error || 'Erreur lors de la vérification de l\'email.');
        }
      })
      .catch(error => {
        console.error('Verification error:', error);
        setMessage('Une erreur s’est produite. Veuillez réessayer.');
      });
  }, [uidb64, token, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Vérification de l'Email</h2>
      <p>{message}</p>
    </div>
  );
}

export default VerifyEmail;