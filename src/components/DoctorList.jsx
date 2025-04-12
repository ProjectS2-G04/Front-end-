import React, { useEffect, useState } from 'react';
import { BsFillSave2Fill } from "react-icons/bs";
import { RiDossierFill } from "react-icons/ri";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import './DoctorList.css';
import SideBareDocs from './SideBareDocs';

function DoctorList() {
    const [activeTab, setActiveTab] = useState('etudiants');
    const [searchTerm, setSearchTerm] = useState('');
    const [records, setRecords] = useState({ enseignants: [], etudiants: [], ats: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            let url = "";
            if (activeTab === 'etudiants') {
                url = '/dossiers/etudiants/';
            } else if (activeTab === 'enseignants') {
                url = '/dossiers/enseignants/';
            } else if (activeTab === 'ats') {
                url = '/dossiers/ats/';
            }

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }

            const response = await fetch(`http://127.0.0.1:8000/api/dossier-medicale${url}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Access forbidden. Please check your credentials.');
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setRecords(prevRecords => ({ ...prevRecords, [activeTab]: data }));
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message || 'Failed to load records. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredRecords = records[activeTab].filter(record =>
        `${record.nom} ${record.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDownload = async (doc, recordName) => {
        if (!doc || !doc.id) {
            alert("Aucun PDF disponible pour ce dossier.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:8000/api/dossier-medicale/dossiers/download/${doc.id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch PDF');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${recordName}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            alert('Erreur lors du téléchargement du PDF.');
        }
    };

    const handleEdit = (recordId) => {
        if (activeTab === 'etudiants') {
            navigate(`/ModifyFormEtudiant/${recordId}`);
        } else if (activeTab === 'enseignants') {
            navigate(`/ModifyFormEnseignant/${recordId}`);
            } else if (activeTab === 'ats') {
                navigate(`/ModifyFormATS/${recordId}`);
        }
    };

    const handlePrint = (recordId) => {
        const record = filteredRecords.find(r => r.id === recordId);
        if (!record) {
            alert("Dossier non trouvé.");
            return;
        }

        const printWindow = window.open("", "Print Window", "width=600,height=800");
        const content = `
            <html>
            <head>
                <title>Dossier Médical - ${record.nom} ${record.prenom}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { text-align: center; }
                    h2 { margin-top: 20px; }
                    .section { margin-bottom: 20px; }
                    .field { margin: 5px 0; }
                    .label { font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>Dossier Médical - ${record.nom} ${record.prenom}</h1>
                <div class="section">
                    <h2>Informations Personnelles</h2>
                    <div class="field"><span class="label">Nom:</span> ${record.nom}</div>
                    <div class="field"><span class="label">Prénom:</span> ${record.prenom}</div>
                    <div class="field"><span class="label">Date de naissance:</span> ${record.date_naissance || 'N/A'}</div>
                    <div class="field"><span class="label">Lieu de naissance:</span> ${record.lieu_naissance || 'N/A'}</div>
                    <div class="field"><span class="label">Adresse:</span> ${record.adresse || 'N/A'}</div>
                    <div class="field"><span class="label">Numéro de téléphone:</span> ${record.numero_telephone || 'N/A'}</div>
                    <div class="field"><span class="label">Email:</span> ${record.email || 'N/A'}</div>
                    <div class="field"><span class="label">Situation familiale:</span> ${record.situation_familiale || 'N/A'}</div>
                    <div class="field"><span class="label">Admis(e):</span> ${record.admission_etablissement || 'N/A'}</div>
                    <div class="field"><span class="label">Filière:</span> ${record.Filiere || 'N/A'}</div>
                    <div class="field"><span class="label">Niveau:</span> ${record.Niveau || 'N/A'}</div>
                    <div class="field"><span class="label">Numéro de dossier:</span> ${record.numero_dossier || 'N/A'}</div>
                    <div class="field"><span class="label">Groupe sanguin:</span> ${record.groupe_sanguin || 'N/A'}</div>
                    <div class="field"><span class="label">Numéro sécurité sociale:</span> ${record.numero_securite_sociale || 'N/A'}</div>
                </div>
                <div class="section">
                    <h2>Données Biométriques</h2>
                    <div class="field"><span class="label">Taille:</span> ${record.taille || 'N/A'} cm</div>
                    <div class="field"><span class="label">Poids:</span> ${record.poids || 'N/A'} kg</div>
                    <div class="field"><span class="label">Fréquence cardiaque:</span> ${record.frequence_cardiaque || 'N/A'} bpm</div>
                    <div class="field"><span class="label">Pression artérielle:</span> ${record.pression_arterielle || 'N/A'}</div>
                </div>
                <div class="section">
                    <h2>Antécédents Personnels</h2>
                    <div class="field"><span class="label">Fumeur:</span> ${record.fumeur ? 'Oui' : 'Non'}</div>
                    ${record.fumeur ? `<div class="field"><span class="label">Nombre de cigarettes:</span> ${record.nombre_cigarettes || 'N/A'}</div>` : ''}
                    <div class="field"><span class="label">Chiqueur:</span> ${record.chiqueur ? 'Oui' : 'Non'}</div>
                    ${record.chiqueur ? `<div class="field"><span class="label">Nombre de boîtes chique:</span> ${record.nombre_boites_chique || 'N/A'}</div>` : ''}
                    <div class="field"><span class="label">Prise autre:</span> ${record.prise_autre ? 'Oui' : 'Non'}</div>
                    ${record.prise_autre ? `<div class="field"><span class="label">Nombre de boîtes autre:</span> ${record.nombre_boites_autre || 'N/A'}</div>` : ''}
                    <div class="field"><span class="label">Âge première prise:</span> ${record.age_premiere_prise || 'N/A'}</div>
                    <div class="field"><span class="label">Ancien fumeur:</span> ${record.ancien_fumeur ? 'Oui' : 'Non'}</div>
                    ${record.ancien_fumeur ? `<div class="field"><span class="label">Nombre de boîtes fumeur:</span> ${record.nombre_boites_fumeur || 'N/A'}</div>` : ''}
                </div>
                <div class="section">
                    <h2>Antécédents Médicaux</h2>
                    <div class="field"><span class="label">Affections congénitales:</span> ${record.affections_congenitales || 'N/A'}</div>
                    <div class="field"><span class="label">Maladies générales:</span> ${record.maladies_generales || 'N/A'}</div>
                    <div class="field"><span class="label">Interventions chirurgicales:</span> ${record.interventions_chirurgicales || 'N/A'}</div>
                    <div class="field"><span class="label">Réactions allergiques:</span> ${record.reactions_allergiques || 'N/A'}</div>
                </div>
            </body>
            </html>
        `;
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="app-container">
            <SideBareDocs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="listDoctor-main-content">
                <header className="content-header">
                    <h1>La liste des dossiers médicaux des {activeTab}</h1>
                </header>

                <div className="content-body">
                    <div className="search-bar">
                        <p>{activeTab}</p>
                        <input
                            type="text"
                            placeholder="Rechercher"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="records-list">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : filteredRecords.length > 0 ? (
                            filteredRecords.map(record => (
                                <div key={record.id} className="record-card">
                                    <div className="recordnamedocs">
                                        <RiDossierFill className='RiDossierFill' />
                                        <span className="record-name">{record.nom} {record.prenom}</span>
                                    </div>
                                    <div className="record-actions">
                                        <button className="modify-btn" onClick={() => handleEdit(record.id)}>
                                            Modifier
                                        </button>
                                        <button className="print-btn" onClick={() => handlePrint(record.id)}>
                                            Imprimer
                                        </button>
                                        <BsFillSave2Fill
                                            className='BsFillSave2Fill'
                                            onClick={() => handleDownload(
                                                record.dossier_documents?.length > 0 ? record.dossier_documents[0] : null,
                                                `${record.nom} ${record.prenom}`
                                            )}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No records available</p>
                        )}
                    </div>
                    <div className="addreturn">
                        <IoArrowBackCircle className='IoArrowBackCircle' onClick={() => navigate("/home")} />
                        <button
                            className="add-btn"
                            onClick={() => {
                                if (activeTab === 'etudiants') {
                                    navigate("/CreateFormPatient");
                                } else if (activeTab === 'enseignants') {
                                    navigate("/CreateFormEnseignant");
                                } else if (activeTab === 'ats') {
                                    navigate("/CreateFormATS");
                                }
                            }}
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorList;