import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './profile.css'
import profileUser from "../assets/user.png"
import profileLogo from "../assets/logo.png"

const profile = () => {
    const navigate = useNavigate();
    const [currentPassword] = useState('xxxxx');
    const [newPassword, setNewPassword] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        const isPasswordChanged = newPassword !== '';
         if (!isPasswordChanged) {
          alert('Pas de changements.');
         return;
         }
         if (newPassword.length < 8 && isPasswordChanged) {
          alert("Le mot de passe doit contenir au moins 8 caractères.");
          return;
          }
         alert('Mot de passe sauvegardé.');

       
        // Reset the password field after saving
        setNewPassword('');
    }

    return (
        <div className='profile-container'>
            <header className='profile-header'>
                <img src={profileLogo} alt="" />
                <nav><a onClick={() => navigate('/home')}>Home</a>
                </nav>
            </header>
            <div className="profile-content">
                <h2>Paramètres du compte</h2>
                <div className="profile-image-text">
                    <img src={profileUser} alt='' />
                    <p>Télécharger votre image</p>
                </div>
                <form className="parametres-form" onSubmit={handleSave}>
                    <div className='contenue-input'>
                        <label>mot de passe actuel :</label>
                        <input
                            className='parametres-input-current-password'
                            type="text"
                            value={currentPassword}
                            disabled
                        />
                    </div>
                    <div className='contenue-input'>
                        <label>Nouveau mot de passe :</label>
                        <input
                            className='parametres-input-new-password'
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nouveau mot de passe"
                        />
                    </div>
                    <button type="submit" className='save-button'>Sauvegarder</button>
                </form>
            </div>
        </div>
    )
}

export default profile
