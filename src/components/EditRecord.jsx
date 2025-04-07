import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateForm.css';

const EditRecord = () => {
    const { tab, recordId } = useParams();
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found.');
                }

                const response = await fetch(`http://127.0.0.1:8000/api/dossier-medicale/dossiers/${tab}/${recordId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setFormData(data);
            } catch (error) {
                setError(error.message || 'Failed to load record.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecord();
    }, [tab, recordId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:8000/api/dossier-medicale/dossiers/${tab}/${recordId}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            alert('Dossier mis à jour avec succès !');
            navigate('/DoctorList');
        } catch (error) {
            console.error('Update error:', error);
            alert('Erreur lors de la mise à jour: ' + error.message);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="doc-container">
            <h1 className="my-header1">Modifier le Dossier Médical</h1>
            <h2 className="my-header2">École Nationale Supérieure d'Informatique</h2>
            <form onSubmit={handleSubmit} className="personal-info-container">
                <div className="header-section">
                    <div className="title-box">
                        <h1 className="title">Fiche Médicale</h1>
                        <p className="subtitle">{formData.nom} {formData.prenom}</p>
                    </div>
                    <div className="profile-photo">
                        <div className="photo-placeholder">
                            {formData.photo ? (
                                <img src={formData.photo} alt="Profile" className="photo-preview" />
                            ) : (
                                "Photo"
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-fields">
                    <div className="input-group">
                        <label>Nom</label>
                        <input type="text" name="nom" value={formData.nom || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Prénom</label>
                        <input type="text" name="prenom" value={formData.prenom || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Date de naissance</label>
                        <input type="date" name="date_naissance" value={formData.date_naissance || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Lieu de naissance</label>
                        <input type="text" name="lieu_naissance" value={formData.lieu_naissance || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Adresse</label>
                        <input type="text" name="adresse" value={formData.adresse || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Numéro de téléphone</label>
                        <input type="text" name="numero_telephone" value={formData.numero_telephone || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Situation familiale</label>
                        <input type="text" name="situation_familiale" value={formData.situation_familiale || ''} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Admis(e)</label>
                        <input type="text" name="admission_etablissement" value={formData.admission_etablissement || ''} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Filière</label>
                        <input type="text" name="Filiere" value={formData.Filiere || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Niveau</label>
                        <input type="text" name="Niveau" value={formData.Niveau || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Numéro de dossier</label>
                        <input type="text" name="numero_dossier" value={formData.numero_dossier || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Groupe sanguin</label>
                        <select name="groupe_sanguin" value={formData.groupe_sanguin || ''} onChange={handleChange} required>
                            <option value="">Sélectionner</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Numéro sécurité sociale</label>
                        <input type="text" name="numero_securite_sociale" value={formData.numero_securite_sociale || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="biometric-data-container">
                    <h2 className="section-title"><h2>Données Biométriques</h2></h2>
                    <div className="biometric-form">
                        <div className="form-row">
                            <span className="form-label">Taille (cm)</span>
                            <input type="number" name="taille" value={formData.taille || ''} onChange={handleChange} className="form-input" />
                            <span className="form-label">Poids (kg)</span>
                            <input type="number" name="poids" value={formData.poids || ''} onChange={handleChange} className="form-input" />
                        </div>
                        <div className="form-row">
                            <span className="form-label">Fréquence cardiaque (bpm)</span>
                            <input type="number" name="frequence_cardiaque" value={formData.frequence_cardiaque || ''} onChange={handleChange} className="form-input" />
                            <span className="form-label">Pression artérielle</span>
                            <input type="text" name="pression_arterielle" value={formData.pression_arterielle || ''} onChange={handleChange} className="form-input" />
                        </div>
                    </div>
                </div>

                <div className="save-button-container">
                    <button type="submit" className="save-button">Sauvegarder</button>
                </div>
            </form>
        </div>
    );
};

export default EditRecord;