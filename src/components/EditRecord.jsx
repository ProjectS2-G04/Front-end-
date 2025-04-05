import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecord = () => {
    const { tab, recordId } = useParams(); // Capture both 'tab' and 'recordId'
    const [record, setRecord] = useState(null);
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
                setRecord(data);
            } catch (error) {
                setError(error.message || 'Failed to load record.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecord();
    }, [tab, recordId]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Edit Record</h1>
            <p>Name: {record?.nom} {record?.prenom}</p>
            {/* Display other record details for editing */}
            {/* You can add input fields for modifying the record */}
        </div>
    );
};

export default EditRecord;
