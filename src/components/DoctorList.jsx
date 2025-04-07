import React, { useEffect, useState } from 'react';
import { BsFillSave2Fill } from "react-icons/bs";
import { RiDossierFill } from "react-icons/ri";
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

    const handleDownload = (pdfUrl, recordName) => {
        if (!pdfUrl) {
            alert("Aucun PDF disponible pour ce dossier.");
            return;
        }

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `${recordName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleEdit = (recordId) => {
        navigate(`/edit-record/${activeTab}/${recordId}`);
    };

    const handlePrint = (recordId) => {
        const printWindow = window.open("", "Print Window", "width=600,height=600");
        printWindow.document.write(`
            <html>
            <head>
                <title>Record Print</title>
            </head>
            <body>
                <h1>Printing Record ${recordId}</h1>
                <p>Record details go here. Customize this section.</p>
            </body>
            </html>
        `);
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
                                            onClick={() => handleDownload(record.dossier_pdf_url, `${record.nom} ${record.prenom}`)}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No records available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorList;
