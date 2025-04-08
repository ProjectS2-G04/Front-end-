import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateForm.css";

// ----- FormPersonalInfo -----
const FormPersonalInfo = ({ formData, setFormData }) => {
    const fieldLabels = {
        nom: "Nom",
        prenom: "Prénom",
        date_naissance: "Date de naissance",
        lieu_naissance: "Lieu de naissance",
        adresse: "Adresse",
        numero_telephone: "Numéro de téléphone",
        email: "Email",
        service: "Service",
        situation_familiale: "Situation de la famille",
        admission_etablissement: "Admis(e) à l’établissement",
        Filiere: "Filière",
        Niveau: "Niveau",
        numero_dossier: "N° dossier",
        groupe_sanguin: "Groupe sanguin",
        numero_securite_sociale: "N° sécurité social",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [photo, setPhoto] = useState(null);
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    };

    return (
        <div className="personal-info-container">
            <div className="header-section">
                <div className="title-box">
                    <h3 className="title">Dossier médical</h3>
                    <p className="subtitle">Étudiant</p>
                </div>
                <div className="profile-photo">
                    {photo ? (
                        <img src={photo} alt="Uploaded profile" className="photo-preview" />
                    ) : (
                        <label className="photo-placeholder">
                            Photo ici
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
                        </label>
                    )}
                </div>
            </div>
            <form className="form-fields">
                {Object.keys(fieldLabels).slice(0, -3).map((key) => (
                    <div key={key} className="input-group">
                        <label>{fieldLabels[key]}</label>
                        <input
                            type={key === "date_naissance" ? "date" : "text"}
                            name={key}
                            value={formData[key] || ""}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </form>

            <div className="additional-info-row">
                <div className="info-box">
                    <label>{fieldLabels.numero_dossier}</label>
                    <input
                        type="text"
                        name="numero_dossier"
                        value={formData.numero_dossier || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="info-box">
                    <label>{fieldLabels.groupe_sanguin}</label>
                    <select
                        name="groupe_sanguin"
                        value={formData.groupe_sanguin || ""}
                        onChange={handleChange}
                    >
                        <option value="">-- Choisir --</option>
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
                <div className="info-box">
                    <label>{fieldLabels.numero_securite_sociale}</label>
                    <input
                        type="text"
                        name="numero_securite_sociale"
                        value={formData.numero_securite_sociale || ""}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

// ----- FormBiometricData -----
const FormBiometricData = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="biometric-data-container">
            <div className="medical-card">
                <h3 className="card-title">Les données biométrique</h3>
            </div>
            <div className="biometric-form">
                {[
                    { label: "Taille (cm)", name: "taille", placeholder: "170" },
                    { label: "Poids (kg)", name: "poids", placeholder: "70" },
                    { label: "Fréquence cardiaque (bpm)", name: "frequence_cardiaque", placeholder: "72" },
                    { label: "Pression artérielle (mmHg)", name: "pression_arterielle", placeholder: "120/80" },
                ].map(({ label, name, placeholder }) => (
                    <div className="form-row" key={name}>
                        <label className="form-label">• {label}</label>
                        <input
                            type="text"
                            name={name}
                            value={formData[name] || ""}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="form-input"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// ----- FormPersonalBackground -----
const FormPersonalBackground = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            const isOuiCheckbox = ["fumeur", "chiqueur", "prise_autre"].includes(name);
            const oppositeKey =
                name === "fumeur" ? "ancien_fumeur" :
                    name === "chiqueur" ? "ancien_chiqueur" :
                        name === "prise_autre" ? "ancien_prise" :
                            name === "ancien_fumeur" ? "fumeur" :
                                null;

            setFormData(prev => ({
                ...prev,
                [name]: checked,
                ...(oppositeKey && { [oppositeKey]: !checked }),
                ...(isOuiCheckbox && !checked ? {
                    [name === "fumeur" ? "nombre_cigarettes" :
                        name === "chiqueur" ? "nombre_boites_chique" :
                            name === "prise_autre" ? "nombre_boites_autre" :
                                ""]: ""
                } : {})
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <div className="personal-background-container">
            <div className="medical-card">
                <h1 className="card-title">Antécédents personnels</h1>
            </div>
            <div className="section-title">
                <h2>Tabacs</h2>
            </div>

            <div className="habits-section">
                {[
                    {
                        label: "À fumer",
                        ouiKey: "fumeur",
                        nonKey: "ancien_fumeur",
                        inputKey: "nombre_cigarettes",
                        placeholder: "Nombre de cigarettes /j"
                    },
                    {
                        label: "À chiquer",
                        ouiKey: "chiqueur",
                        nonKey: "ancien_chiqueur",
                        inputKey: "nombre_boites_chique",
                        placeholder: "Nombre de boites /j"
                    },
                    {
                        label: "À prise",
                        ouiKey: "prise_autre",
                        nonKey: "ancien_prise",
                        inputKey: "nombre_boites_autre",
                        placeholder: "Nombre de boites /j"
                    }
                ].map(({ label, ouiKey, nonKey, inputKey, placeholder }, index) => (
                    <div className="smoking-section" key={index}>
                        <ul><li><strong>{label}</strong></li></ul>

                        <label className="custom-checkbox">
                            <span>Oui</span>
                            <input
                                type="checkbox"
                                name={ouiKey}
                                checked={formData[ouiKey] || false}
                                onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <label className="custom-checkbox">
                            <span>Non</span>
                            <input
                                type="checkbox"
                                name={nonKey}
                                checked={formData[nonKey] || false}
                                onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <label className="input-label">
                            <span>{placeholder}</span>
                            <input
                                type="number"
                                name={inputKey}
                                value={formData[inputKey] || ""}
                                onChange={handleChange}
                                disabled={!formData[ouiKey]}
                            />
                        </label>
                    </div>
                ))}

                <div className="age-section">
                    <p>Âge à la première prise</p>
                    <input
                        type="number"
                        name="age_premiere_prise"
                        value={formData.age_premiere_prise || ""}
                        onChange={handleChange}
                        className="age-input"
                    />
                </div>

                <div className="smoking-section">
                    <ul><li><strong>Ancien fumeur</strong></li></ul>

                    <label className="custom-checkbox">
                        <span>Oui</span>
                        <input
                            type="checkbox"
                            name="ancien_fumeur"
                            checked={formData.ancien_fumeur || false}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>

                    <label className="custom-checkbox">
                        <span>Non</span>
                        <input
                            type="checkbox"
                            name="fumeur"
                            checked={formData.fumeur || false}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>

                    <label className="input-label">
                        <span>Nombre de boites /j</span>
                        <input
                            type="number"
                            name="nombre_boites_fumeur"
                            value={formData.nombre_boites_fumeur || ""}
                            onChange={handleChange}
                            disabled={!formData.ancien_fumeur}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

// ----- FormMedicalHistory -----
const FormMedicalHistory = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="medical-history-container">
            <div className="medical-card">
                <h3 className="card-title">Antecedents medicaux - chirurgicaux</h3>
            </div>
            <div className="medical-history-form">
                {[
                    { label: "Affections congénitales", name: "affections_congenitales" },
                    { label: "Maladies générales", name: "maladies_generales" },
                    { label: "Interventions chirurgicales (reporter les dates)", name: "interventions_chirurgicales" },
                    { label: "Réactions allergiques aux médicaments (lesquels ?)", name: "reactions_allergiques" },
                ].map(({ label, name }) => (
                    <div className="history-item" key={name}>
                        <label>• {label} :</label>
                        <textarea
                            name={name}
                            value={formData[name] || ""}
                            onChange={handleChange}
                            className="auto-resize-textarea"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


const CreateFormPatient = () => {
    const navigate = useNavigate();

    const [personalInfo, setPersonalInfo] = useState({
        nom: "", prenom: "", date_naissance: "", lieu_naissance: "", adresse: "",
        numero_telephone: "", email: "", service: "", situation_familiale: "",
        admission_etablissement: "true", Filiere: "", Niveau: "", numero_dossier: "",
        groupe_sanguin: "", numero_securite_sociale: "",
    });

    const [biometricData, setBiometricData] = useState({
        taille: '', poids: '', frequence_cardiaque: '', pression_arterielle: ''
    });

    const [personalBackground, setPersonalBackground] = useState({
        fumeur: false, nombre_cigarettes: "",
        chiqueur: false, nombre_boites_chique: "",
        prise_autre: false, nombre_boites_autre: "",
        age_premiere_prise: "",
        ancien_fumeur: false, nombre_boites_fumeur: "",
    });

    const [medicalHistory, setMedicalHistory] = useState({
        affections_congenitales: '', maladies_generales: '',
        interventions_chirurgicales: '', reactions_allergiques: ''
    });

    const handleSubmit = async () => {
        const formData = {
            ...personalInfo,
            ...biometricData,
            ...personalBackground,
            ...medicalHistory,
            taille: biometricData.taille ? parseFloat(biometricData.taille) : null,
            poids: biometricData.poids ? parseFloat(biometricData.poids) : null,
            frequence_cardiaque: biometricData.frequence_cardiaque ? parseFloat(biometricData.frequence_cardiaque) : null,
            nombre_cigarettes: personalBackground.fumeur && personalBackground.nombre_cigarettes ? parseInt(personalBackground.nombre_cigarettes) : null,
            nombre_boites_chique: personalBackground.chiqueur && personalBackground.nombre_boites_chique ? parseInt(personalBackground.nombre_boites_chique) : null,
            nombre_boites_autre: personalBackground.prise_autre && personalBackground.nombre_boites_autre ? parseInt(personalBackground.nombre_boites_autre) : null,
            age_premiere_prise: personalBackground.age_premiere_prise ? parseInt(personalBackground.age_premiere_prise) : null,
            nombre_boites_fumeur: personalBackground.ancien_fumeur && personalBackground.nombre_boites_fumeur ? parseInt(personalBackground.nombre_boites_fumeur) : null,
        };

        const requiredFields = [
            "nom", "prenom", "date_naissance", "lieu_naissance", "adresse",
            "numero_telephone", "email", "situation_familiale", "Filiere", "Niveau",
            "numero_dossier", "groupe_sanguin", "numero_securite_sociale",
            "taille", "poids", "frequence_cardiaque", "pression_arterielle",
        ];

        const hasEmptyRequired = requiredFields.some(key => {
            const val = formData[key];
            return val === undefined || val === null || val.toString().trim() === "";
        });

        if (hasEmptyRequired) {
            alert("Veuillez remplir tous les champs obligatoires avant de soumettre.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/api/dossier-medicale/dossiers/etudiants/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error:", errorData);
                throw new Error(JSON.stringify(errorData));
            }

            const data = await response.json();
            console.log("Dossier créé:", data);
            alert("Dossier créé avec succès !");
            navigate("/DoctorList");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Erreur lors de la création du dossier: " + error.message);
        }
    };

    return (
        <div className="doc-container">
            <h2 className='my-header1'>République Algérienne Démocratique & Populaire</h2>
            <p className='my-header2'>Ministère de la santé et de la population</p>

            <FormPersonalInfo formData={personalInfo} setFormData={setPersonalInfo} />
            <FormBiometricData formData={biometricData} setFormData={setBiometricData} />
            <FormPersonalBackground formData={personalBackground} setFormData={setPersonalBackground} />
            <FormMedicalHistory formData={medicalHistory} setFormData={setMedicalHistory} />

            <div className="save-button-container">
                <button className="save-button" onClick={handleSubmit}>Sauvegarder</button>
            </div>
        </div>
    );
};

export default CreateFormPatient;