import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileLogo from "../assets/face-id.png";
import Logo from "../assets/logo.png";

import './profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found. Please log in.');
                }

                const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    if (response.status === 403) {
                        throw new Error('Access forbidden. Please check your credentials.');
                    } else if (response.status === 500) {
                        throw new Error('Server error. Please try again later or contact support.');
                    }
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setProfilePic(data.image);
            } catch (error) {
                console.error('Erreur de connexion au serveur', error);
                setError(error.message || 'Une erreur est survenue.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        if (newPassword && newPassword.length < 8) {
            alert("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/accounts/change-password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            alert('Erreur : ' + (data.detail || 'Une erreur s\'est produite.'));
        }

        setNewPassword('');
        setCurrentPassword('');
    };

    const handleBackNavigation = () => {
        const userRole = localStorage.getItem('role');
        switch (userRole) {
            case 'DOCTOR':
                navigate('/PatientList');
                break;
            case 'ASSISTANT':
                navigate('/Assitanthome');
                break;
            case 'PATIENT':
                navigate('/Notification');
                break;
            case 'ADMIN':
                navigate('/Admin_Page');
                break;
            case 'DIRECTOR':
                navigate('/dashboarddirector');
                break;
            default:
                navigate('/profile');
                break;
        }
    };
    
    // i changed it to navigte the user to loogin page psq it doesnt make sense to go back to home + we dont have deconnecion btton 😑
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
            // You can also handle actual upload to server here if needed.
        }
    };

    return (
        <div className='profile-container'>
            <header className='profile-header'>
                <img src={Logo} alt="Logo" />
                <nav className="nav-buttons">
                    <button className="nav-button" onClick={handleBackNavigation}>
                        ← Retour
                    </button>
                    <button className="nav-button logout" onClick={handleLogout}>
                        Déconnexion
                    </button>
                </nav>
            </header>
            <div className="profile-content">
                <h2>Paramètres du compte</h2>

                <div className="profile-image-text">
    <img src={profilePic || profileLogo} alt="profile" />
    <label htmlFor="image-upload" className="upload-label">Téléchargez votre image</label>
    <input
        id="image-upload"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
    />
</div>

                <form className="parametres-form" onSubmit={handleSave}>
                    <div className='contenue-input'>
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Nom"
                        />
                    </div>
                    <div className='contenue-input'>
                        <label>Prénom :</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Prénom"
                        />
                    </div>
                    <div className='contenue-input'>
                        <label>Mot de passe actuel :</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Mot de passe actuel"
                        />
                    </div>
                    <div className='contenue-input'>
                        <label>Nouveau mot de passe :</label>
                        <input
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
    );
};

export default Profile;
