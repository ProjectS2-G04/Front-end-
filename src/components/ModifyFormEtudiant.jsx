
import { useEffect, useRef, useState } from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import './CreateForm.css';
import SideBareDocs from './SideBareDocs';

function ModifyFormPatient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('infos');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    adresse: '',
    numero_telephone: '',
    email: '',
    situation_familiale: '',
    admission_etablissement: 'Oui',
    Filiere: 'Informatique',
    Niveau: '',
    numero_securite_sociale: '',
    groupe_sanguin: '',
    sexe: '',
    taille: '',
    poids: '',
    frequence_cardiaque: '',
    pression_arterielle: '',
    imc: '',
    categorie_imc: '',
    fumeur: 'Non',
    nombre_cigarettes: '',
    chiqueur: 'Non',
    nombre_boites_chique: '',
    prise_autre: 'Non',
    nombre_boites_autre: '',
    ancien_fumeur: 'Non',
    nombre_boites_fumeur: '',
    age_premiere_prise: '',
    affections_congenitales: '',
    maladies_generales: '',
    interventions_chirurgicales: '',
    reactions_allergiques: '',
  });

  const [depistage, setDepistage] = useState({
    intevaluation_auditive: '',
    utilisation_audiometre: false,
    test_reponse_son: '',
    remarque_audition: '',
    vision_lointaine: '',
    vision_proche: '',
    besoin_lunettes: false,
    test_snellen_effectue: false,
    remarque_vision: '',
    pression_oculaire: '',
    examen_fond_oeil: '',
    tests_ophtalmo_suppl: '',
    maladies_oculaires_detectees: '',
    examen_nez: '',
    examen_larynx: '',
    remarque_orl: '',
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [erreurEmail, setErreurEmail] = useState('');
  const [erreurTelephone, setErreurTelephone] = useState('');
  const [erreurNss, setErreurNss] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const fileInputRef = useRef(null);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        const res = await fetch(`http://127.0.0.1:8000/api/dossier-medicale/dossiers/etudiants/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();

        const updatedFormData = {
          ...formData,
          ...Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, value ?? ''])
          ),
          fumeur: data.fumeur ? 'Oui' : 'Non',
          chiqueur: data.chiqueur ? 'Oui' : 'Non',
          prise_autre: data.prise_autre ? 'Oui' : 'Non',
          ancien_fumeur: data.ancien_fumeur ? 'Oui' : 'Non',
        };

        setFormData(updatedFormData);
        setPhotoPreview(data.photo || null);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        alert('Erreur lors du chargement des données: ' + err.message);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumericInput = (e, name, allowDecimal = false) => {
    const value = e.target.value;
    const regex = allowDecimal ? /^[0-9]*[.,]?[0-9]*$/ : /^[0-9]*$/;
    if (regex.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePressionArterielle = (e) => {
    const value = e.target.value;
    if (/^[0-9]*\/?[0-9]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, pression_arterielle: value }));
    }
  };

  const handleChangeDepistage = (field, value) => {
    setDepistage((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const verifierNss = (value) => {
    const regex = /^[12]\d{17}$/;
    setFormData((prev) => ({ ...prev, numero_securite_sociale: value }));
    if (!regex.test(value)) {
      setErreurNss('Numéro de sécurité sociale invalide (18 chiffres, ex: 198010112345678901)');
    } else {
      setErreurNss('');
    }
  };

  const verifierEmail = (value) => {
    const regex = /^[a-zA-Z]+(?:\.[a-zA-Z]+)?@esi-sba\.dz$/;
    setFormData((prev) => ({ ...prev, email: value }));
    if (!value.trim()) {
      setErreurEmail("L'email est requis.");
    } else if (!regex.test(value)) {
      setErreurEmail('Format email invalide. Exemple : abc.prenom@esi-sba.dz');
    } else {
      setErreurEmail('');
    }
  };

  const verifierTelephone = (value) => {
    const regex = /^(05|06|07)[0-9]{8}$/;
    setFormData((prev) => ({ ...prev, numero_telephone: value }));
    if (!value.trim()) {
      setErreurTelephone('Le numéro de téléphone est requis.');
    } else if (!regex.test(value)) {
      setErreurTelephone('Numéro invalide. Exemple : 05xxxxxxxx');
    } else {
      setErreurTelephone('');
    }
  };

  const handleReponseChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(value === 'Non' && {
        [name === 'fumeur' ? 'nombre_cigarettes' : '']: '',
        [name === 'chiqueur' ? 'nombre_boites_chique' : '']: '',
        [name === 'prise_autre' ? 'nombre_boites_autre' : '']: '',
        [name === 'ancien_fumeur' ? 'nombre_boites_fumeur' : '']: '',
      }),
      ...(value === 'Non' &&
      prev.fumeur === 'Non' &&
      prev.chiqueur === 'Non' &&
      prev.prise_autre === 'Non' &&
      prev.ancien_fumeur === 'Non' &&
      name !== 'ancien_fumeur'
        ? { age_premiere_prise: '' }
        : {}),
    }));
  };

  const handlePaquetsChange = (name, value) => {
    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const t = parseFloat(formData.taille);
    const p = parseFloat(formData.poids);
    if (t > 0 && p > 0) {
      const tailleM = t / 100;
      const imcCalc = p / (tailleM * tailleM);
      let categorie_imc = '';
      if (formData.sexe === 'Homme') {
        if (imcCalc < 18.5) categorie_imc = 'Insuffisance pondérale';
        else if (imcCalc < 25) categorie_imc = 'Corpulence normale';
        else if (imcCalc < 30) categorie_imc = 'Surpoids';
        else if (imcCalc < 35) categorie_imc = 'Obésité modérée';
        else if (imcCalc < 40) categorie_imc = 'Obésité sévère';
        else categorie_imc = 'Obésité morbide';
      } else if (formData.sexe === 'Femme') {
        if (imcCalc < 18.5) categorie_imc = 'Insuffisance pondérale';
        else if (imcCalc < 24) categorie_imc = 'Corpulence normale';
        else if (imcCalc < 29) categorie_imc = 'Surpoids';
        else if (imcCalc < 34) categorie_imc = 'Obésité modérée';
        else if (imcCalc < 39) categorie_imc = 'Obésité sévère';
        else categorie_imc = 'Obésité morbide';
      }
      setFormData((prev) => ({
        ...prev,
        imc: imcCalc.toFixed(2),
        categorie_imc,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        imc: '',
        categorie_imc: '',
      }));
    }
  }, [formData.taille, formData.poids, formData.sexe]);

  const getImcColor = () => {
    const imc = parseFloat(formData.imc);
    if (!imc) return '';
    if (formData.sexe === 'Femme') {
      if (imc >= 18.5 && imc <= 24) return 'text-green-600 font-bold';
    } else if (formData.sexe === 'Homme') {
      if (imc >= 18.5 && imc <= 25) return 'text-green-600 font-bold';
    }
    return 'text-red-600 font-bold';
  };

  const wilayas = [
    { number: '01', name: 'Adrar' },
    { number: '02', name: 'Chlef' },
    { number: '03', name: 'Laghouat' },
    { number: '04', name: 'Oum El Bouaghi' },
    { number: '05', name: 'Batna' },
    { number: '06', name: 'Béjaïa' },
    { number: '07', name: 'Biskra' },
    { number: '08', name: 'Béchar' },
    { number: '09', name: 'Blida' },
    { number: '10', name: 'Bouira' },
    { number: '11', name: 'Tamanrasset' },
    { number: '12', name: 'Tébessa' },
    { number: '13', name: 'Tlemcen' },
    { number: '14', name: 'Tiaret' },
    { number: '15', name: 'Tizi Ouzou' },
    { number: '16', name: 'Alger' },
    { number: '17', name: 'Djelfa' },
    { number: '18', name: 'Jijel' },
    { number: '19', name: 'Sétif' },
    { number: '20', name: 'Saïda' },
    { number: '21', name: 'Skikda' },
    { number: '22', name: 'Sidi Bel Abbès' },
    { number: '23', name: 'Annaba' },
    { number: '24', name: 'Guelma' },
    { number: '25', name: 'Constantine' },
    { number: '26', name: 'Médéa' },
    { number: '27', name: 'Mostaganem' },
    { number: '28', name: 'MSila' },
    { number: '29', name: 'Mascara' },
    { number: '30', name: 'Ouargla' },
    { number: '31', name: 'Oran' },
    { number: '32', name: 'El Bayadh' },
    { number: '33', name: 'Illizi' },
    { number: '34', name: 'Bordj Bou Arréridj' },
    { number: '35', name: 'Boumerdès' },
    { number: '36', name: 'El Tarf' },
    { number: '37', name: 'Tindouf' },
    { number: '38', name: 'Tissemsilt' },
    { number: '39', name: 'El Oued' },
    { number: '40', name: 'Khenchela' },
    { number: '41', name: 'Souk Ahras' },
    { number: '42', name: 'Tipaza' },
    { number: '43', name: 'Mila' },
    { number: '44', name: 'Aïn Defla' },
    { number: '45', name: 'Naâma' },
    { number: '46', name: 'Aïn Témouchent' },
    { number: '47', name: 'Ghardaïa' },
    { number: '48', name: 'Relizane' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'nom',
      'prenom',
      'date_naissance',
      'lieu_naissance',
      'adresse',
      'numero_telephone',
      'email',
      'situation_familiale',
      'Niveau',
      'numero_securite_sociale',
      'groupe_sanguin',
      'sexe',
      'taille',
      'poids',
      'frequence_cardiaque',
      'pression_arterielle',
    ];

    const tabacFields = ['fumeur', 'chiqueur', 'prise_autre', 'ancien_fumeur'];
    const missingFields = requiredFields.filter(
      (key) => !formData[key] || formData[key].toString().trim() === ''
    );
    const unsetTabac = tabacFields.filter((key) => !formData[key]);

    if (missingFields.length > 0 || unsetTabac.length > 0 || erreurTelephone || erreurEmail || erreurNss) {
      const errors = {};
      missingFields.forEach((field) => (errors[field] = true));
      setFieldErrors(errors);
      alert('Veuillez remplir tous les champs obligatoires et corriger les erreurs.');
      return;
    }

    setFieldErrors({});

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });
    Object.entries(depistage).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    if (photo) {
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (!validTypes.includes(photo.type)) {
        alert('Le fichier doit être une image (JPEG ou PNG).');
        return;
      }
      if (photo.size > maxSize) {
        alert("La taille de l'image ne doit pas dépasser 2 Mo.");
        return;
      }
      submissionData.append('photo', photo);
    } else if (photoPreview && !photo) {
      try {
        const response = await fetch(photoPreview);
        const blob = await response.blob();
        const existingFile = new File([blob], 'existing_photo.jpg', { type: blob.type });
        submissionData.append('photo', existingFile);
      } catch (error) {
        console.error('Error fetching existing photo:', error);
        alert('Erreur lors de la récupération de la photo existante.');
        return;
      }
    }

    submissionData.set('taille', formData.taille ? parseFloat(formData.taille) : '');
    submissionData.set('poids', formData.poids ? parseFloat(formData.poids) : '');
    submissionData.set('imc', formData.imc ? parseFloat(formData.imc) : '');
    submissionData.set('categorie_imc', formData.categorie_imc || '');
    submissionData.set('frequence_cardiaque', formData.frequence_cardiaque ? parseFloat(formData.frequence_cardiaque) : '');
    submissionData.set('pression_arterielle', formData.pression_arterielle || '');
    submissionData.set(
      'nombre_cigarettes',
      formData.fumeur === 'Oui' && formData.nombre_cigarettes ? parseInt(formData.nombre_cigarettes) : ''
    );
    submissionData.set(
      'nombre_boites_chique',
      formData.chiqueur === 'Oui' && formData.nombre_boites_chique ? parseInt(formData.nombre_boites_chique) : ''
    );
    submissionData.set(
      'nombre_boites_autre',
      formData.prise_autre === 'Oui' && formData.nombre_boites_autre ? parseInt(formData.nombre_boites_autre) : ''
    );
    submissionData.set(
      'nombre_boites_fumeur',
      formData.ancien_fumeur === 'Oui' && formData.nombre_boites_fumeur ? parseInt(formData.nombre_boites_fumeur) : ''
    );
    submissionData.set('age_premiere_prise', formData.age_premiere_prise ? parseInt(formData.age_premiere_prise) : '');
    submissionData.set('fumeur', formData.fumeur === 'Oui' ? 'true' : 'false');
    submissionData.set('chiqueur', formData.chiqueur === 'Oui' ? 'true' : 'false');
    submissionData.set('prise_autre', formData.prise_autre === 'Oui' ? 'true' : 'false');
    submissionData.set('ancien_fumeur', formData.ancien_fumeur === 'Oui' ? 'true' : 'false');
    submissionData.set('admission_etablissement', formData.admission_etablissement || 'Oui');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const res = await fetch(`http://127.0.0.1:8000/api/dossier-medicale/dossiers/etudiants/${id}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submissionData,
      });

      const responseData = await res.json();

      if (!res.ok) {
        console.error('Backend responded with errors:', responseData);
        if (responseData.photo) {
          alert('Erreur avec la photo: ' + responseData.photo.join(', '));
        } else if (responseData.email) {
          setErreurEmail('Cet email est déjà utilisé.');
        } else if (responseData.numero_telephone) {
          setErreurTelephone('Ce numéro de téléphone est déjà utilisé.');
        } else if (responseData.numero_securite_sociale) {
          setErreurNss('Ce numéro de sécurité sociale est déjà utilisé.');
        } else {
          alert('Erreur lors de la modification: ' + JSON.stringify(responseData));
        }
        return;
      }

      alert('Modifications enregistrées !');
      navigate('/DoctorList');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erreur lors de la modification: ' + error.message);
    }
  };

  const tabs = [
    { id: 'infos', label: 'Informations personnelles' },
    { id: 'antecedentsPerso', label: 'Antécédents personnels' },
    { id: 'antecedentsChir', label: 'Antécédents chirurgicaux' },
    { id: 'depistage', label: 'Dépistage' },
  ];

  return (
    <div className="min-h-screen bg-white-100">
      <div className="w-[250px]">
        <SideBareDocs />
      </div>

      <div className="ml-[250px] p-6">
        <div className="flex justify-between items-center mb-8 px-6 py-4 bg-white shadow-md rounded-md">
          <h1 className="text-3xl font-bold text-teal-700">Dossier Médical Étudiant</h1>
          <div
            className="relative w-32 h-32 rounded-full bg-white border-4 border-transparent bg-clip-padding p-1 shadow-lg"
            style={{
              background: 'linear-gradient(to right, #4BA0A8, #70C9B0, #4BA0A8)',
            }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview} alt="Photo" className="w-full h-full object-cover rounded-full" />
              ) : (
                <label className="flex flex-col items-center justify-center text-center cursor-pointer text-sm text-[#186a6b] font-semibold w-full h-full">
                  Choisir
                  <br />
                  une photo
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-4 gap-80 border-b pb-2 ml-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-semibold rounded-t ${
                activeTab === tab.id ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'infos' && (
          <div className="border rounded-lg shadow bg-white p-6 w-full h-full">
            <h2 className="text-lg font-bold mb-6 text-teal-700">Informations personnelles</h2>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block mb-1 font-medium">Nom</label>
                <input
                  type="text"
                  name="nom"
                  className={`input-style ${fieldErrors.nom ? 'input-error' : ''}`}
                  value={formData.nom}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  className={`input-style ${fieldErrors.prenom ? 'input-error' : ''}`}
                  value={formData.prenom}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block mb-1 font-medium">Date de naissance</label>
                <input
                  type="date"
                  name="date_naissance"
                  className={`input-style ${fieldErrors.date_naissance ? 'input-error' : ''}`}
                  value={formData.date_naissance}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Lieu de naissance</label>
                <select
                  name="lieu_naissance"
                  className={`input-style ${fieldErrors.lieu_naissance ? 'input-error' : ''}`}
                  value={formData.lieu_naissance}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionner la wilaya --</option>
                  {wilayas.map(({ number, name }) => (
                    <option key={number} value={name}>
                      {number} - {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block mb-1 font-medium">Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  className={`input-style ${fieldErrors.adresse ? 'input-error' : ''}`}
                  value={formData.adresse}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`input-style ${erreurEmail || fieldErrors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => verifierEmail(e.target.value)}
                />
                {erreurEmail && <p className="text-red-500 text-sm mt-1">{erreurEmail}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block mb-1 font-medium">Numéro de téléphone</label>
                <input
                  type="tel"
                  name="numero_telephone"
                  className={`input-style ${erreurTelephone || fieldErrors.numero_telephone ? 'input-error' : ''}`}
                  value={formData.numero_telephone}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => verifierTelephone(e.target.value)}
                />
                {erreurTelephone && <p className="text-red-500 text-sm mt-1">{erreurTelephone}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Numéro de sécurité sociale</label>
                <input
                  type="text"
                  name="numero_securite_sociale"
                  className={`input-style ${erreurNss || fieldErrors.numero_securite_sociale ? 'input-error' : ''}`}
                  value={formData.numero_securite_sociale}
                  onChange={(e) => verifierNss(e.target.value)}
                />
                {erreurNss && <p className="text-red-500 text-sm mt-1">{erreurNss}</p>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-4">
              <div>
                <label className="block mb-1 font-medium">Situation familiale</label>
                <select
                  name="situation_familiale"
                  className={`input-style ${fieldErrors.situation_familiale ? 'input-error' : ''}`}
                  value={formData.situation_familiale}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="célibataire">Célibataire</option>
                  <option value="marié">Marié(e)</option>
                  <option value="divorcé">Divorcé(e)</option>
                  <option value="veuf">Veuf</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Filière</label>
                <input
                  type="text"
                  name="Filiere"
                  className={`input-style ${fieldErrors.Filiere ? 'input-error' : ''}`}
                  value={formData.Filiere}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Niveau</label>
                <select
                  name="Niveau"
                  className={`input-style ${fieldErrors.Niveau ? 'input-error' : ''}`}
                  value={formData.Niveau}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="1CP">1CP</option>
                  <option value="2CP">2CP</option>
                  <option value="1CS">1CS</option>
                  <option value="2CS">2CS</option>
                  <option value="3CS">3CS</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Groupe sanguin</label>
                <select
                  name="groupe_sanguin"
                  className={`input-style ${fieldErrors.groupe_sanguin ? 'input-error' : ''}`}
                  value={formData.groupe_sanguin}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Sexe</label>
                <select
                  name="sexe"
                  className={`input-style ${fieldErrors.sexe ? 'input-error' : ''}`}
                  value={formData.sexe}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'antecedentsPerso' && (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4 text-teal-700">Antécédents personnels</h2>
            <div className="space-y-4">
              {[
                { label: 'Fumeur', name: 'fumeur', quantity: 'nombre_cigarettes' },
                { label: 'A chiquer', name: 'chiqueur', quantity: 'nombre_boites_chique' },
                { label: 'A prise', name: 'prise_autre', quantity: 'nombre_boites_autre' },
                { label: 'Ancien fumeur', name: 'ancien_fumeur', quantity: 'nombre_boites_fumeur' },
              ].map(({ label, name, quantity }) => (
                <div key={name} className="grid grid-cols-3 items-center gap-4 border-2 rounded-md p-3" style={{ borderColor: '#4BA0A8' }}>
                  <label className="font-semibold text-teal-700">{label}</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={name}
                        value="Oui"
                        checked={formData[name] === 'Oui'}
                        onChange={() => handleReponseChange(name, 'Oui')}
                      />
                      Oui
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={name}
                        value="Non"
                        checked={formData[name] === 'Non'}
                        onChange={() => handleReponseChange(name, 'Non')}
                      />
                      Non
                    </label>
                  </div>
                  <input
                    type="number"
                    name={quantity}
                    placeholder="Paquets / jour"
                    className={`input-style w-full ${fieldErrors[quantity] ? 'input-error' : ''}`}
                    value={formData[quantity]}
                    onChange={(e) => handlePaquetsChange(quantity, e.target.value)}
                    disabled={formData[name] !== 'Oui'}
                    min={0}
                  />
                </div>
              ))}
              <div className="grid grid-cols-3 items-center gap-4 border-2 rounded-md p-3" style={{ borderColor: '#4BA0A8' }}>
                <label className="font-semibold text-teal-700">Âge à la première prise</label>
                <input
                  type="number"
                  name="age_premiere_prise"
                  placeholder="Âge"
                  className={`input-style w-full ${fieldErrors.age_premiere_prise ? 'input-error' : ''}`}
                  value={formData.age_premiere_prise}
                  onChange={(e) => handlePaquetsChange('age_premiere_prise', e.target.value)}
                  disabled={
                    formData.fumeur === 'Non' &&
                    formData.chiqueur === 'Non' &&
                    formData.prise_autre === 'Non' &&
                    formData.ancien_fumeur === 'Non'
                  }
                  min={0}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'antecedentsChir' && (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4 text-teal-700">Antécédents chirurgicaux</h2>
            <div className="space-y-6">
              {[
                { label: 'Affections congénitales', name: 'affections_congenitales' },
                { label: 'Maladies générales', name: 'maladies_generales' },
                { label: 'Interventions chirurgicales (reporter les dates)', name: 'interventions_chirurgicales' },
                { label: 'Réactions allergiques aux médicaments', name: 'reactions_allergiques' },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-teal-700 font-semibold mb-1">{label}</label>
                  <TextareaAutosize
                    name={name}
                    value={formData[name] || ''}
                    onChange={handleChange}
                    className={`w-full p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none ${
                      fieldErrors[name] ? 'input-error' : ''
                    }`}
                    minRows={3}
                    placeholder={`Entrez les informations concernant ${label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'depistage' && (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold text-teal-700">Formulaire Médical</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block font-semibold text-teal-700">Taille (cm) *</label>
                <input
                  type="text"
                  name="taille"
                  className={`input-style w-full ${fieldErrors.taille ? 'input-error' : ''}`}
                  value={formData.taille}
                  onChange={(e) => handleNumericInput(e, 'taille')}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-teal-700">Poids (kg) *</label>
                <input
                  type="text"
                  name="poids"
                  className={`input-style w-full ${fieldErrors.poids ? 'input-error' : ''}`}
                  value={formData.poids}
                  onChange={(e) => handleNumericInput(e, 'poids')}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-teal-700">Fréquence cardiaque (bpm) *</label>
                <input
                  type="text"
                  name="frequence_cardiaque"
                  className={`input-style w-full ${fieldErrors.frequence_cardiaque ? 'input-error' : ''}`}
                  value={formData.frequence_cardiaque}
                  onChange={(e) => handleNumericInput(e, 'frequence_cardiaque')}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-teal-700">Pression artérielle *</label>
                <input
                  type="text"
                  name="pression_arterielle"
                  className={`input-style w-full ${fieldErrors.pression_arterielle ? 'input-error' : ''}`}
                  value={formData.pression_arterielle}
                  onChange={handlePressionArterielle}
                  placeholder="ex: 120/80"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-teal-700">Indice de Masse Corporelle (IMC)</label>
              <div className={`p-2 border rounded ${getImcColor()}`}>
                {formData.imc || 'Veuillez entrer taille et poids'}
              </div>
            </div>
            <div>
              <label className="block font-semibold text-teal-700">Interprétation IMC</label>
              <div className={`p-2 border rounded ${getImcColor()}`}>
                {formData.categorie_imc || 'Veuillez entrer taille, poids et sexe'}
              </div>
            </div>
            <div>
              <label className="inline-flex items-center gap-2 font-semibold text-teal-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={depistage.intevaluation_auditive || false}
                  onChange={() => setDepistage((prev) => ({ ...prev, intevaluation_auditive: prev.intevaluation_auditive ? '' : 'Normal' }))}
                />
                Ajouter un dépistage
              </label>
            </div>
            {depistage.intevaluation_auditive && (
              <div className="space-y-6 border-t pt-4">
                <h3 className="text-lg font-bold text-teal-600">Dépistage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Intévaluation auditive</label>
                    <select
                      value={depistage.intevaluation_auditive}
                      onChange={(e) => handleChangeDepistage('intevaluation_auditive', e.target.value)}
                      className="input-style w-full"
                    >
                      <option value="">-- Choisir --</option>
                      <option value="Normal">Normal</option>
                      <option value="Perte auditive">Perte auditive</option>
                      <option value="Surdité partielle/complète">Surdité partielle/complète</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="font-semibold cursor-pointer">Audiomètre utilisé</label>
                    <input
                      type="checkbox"
                      checked={depistage.utilisation_audiometre}
                      onChange={(e) => handleChangeDepistage('utilisation_audiometre', e.target.checked)}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Test réponse au son</label>
                    <select
                      value={depistage.test_reponse_son}
                      onChange={(e) => handleChangeDepistage('test_reponse_son', e.target.value)}
                      className="input-style w-full"
                    >
                      <option value="">-- Choisir --</option>
                      <option value="Normal">Normal</option>
                      <option value="Anormal">Anormal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold">Remarque audition</label>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={10}
                      className="input-style w-full resize-none"
                      value={depistage.remarque_audition}
                      onChange={(e) => handleChangeDepistage('remarque_audition', e.target.value)}
                      placeholder="Tapez votre remarque ici..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Vision lointaine</label>
                    <select
                      value={depistage.vision_lointaine}
                      onChange={(e) => handleChangeDepistage('vision_lointaine', e.target.value)}
                      className="input-style w-full"
                    >
                      <option value="">-- Choisir --</option>
                      <option value="Normal">Normal</option>
                      <option value="Anormal">Anormal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold">Vision proche</label>
                    <select
                      value={depistage.vision_proche}
                      onChange={(e) => handleChangeDepistage('vision_proche', e.target.value)}
                      className="input-style w-full"
                    >
                      <option value="">-- Choisir --</option>
                      <option value="Normal">Normal</option>
                      <option value="Anormal">Anormal</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="font-semibold cursor-pointer">Besoin de lunettes</label>
                    <input
                      type="checkbox"
                      checked={depistage.besoin_lunettes}
                      onChange={(e) => handleChangeDepistage('besoin_lunettes', e.target.checked)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="font-semibold cursor-pointer">Test Snellen effectué</label>
                    <input
                      type="checkbox"
                      checked={depistage.test_snellen_effectue}
                      onChange={(e) => handleChangeDepistage('test_snellen_effectue', e.target.checked)}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Remarque vision</label>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={10}
                      className="input-style w-full resize-none"
                      value={depistage.remarque_vision}
                      onChange={(e) => handleChangeDepistage('remarque_vision', e.target.value)}
                      placeholder="Tapez votre remarque ici..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Pression oculaire</label>
                    <input
                      type="text"
                      className="input-style w-full"
                      value={depistage.pression_oculaire}
                      onChange={(e) =>
                        handleNumericInput(e, (val) => handleChangeDepistage('pression_oculaire', val), true)
                      }
                      placeholder="ex: 15.5"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Examen fond d'œil</label>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={10}
                      className="input-style w-full resize-none"
                      value={depistage.examen_fond_oeil}
                      onChange={(e) => handleChangeDepistage('examen_fond_oeil', e.target.value)}
                      placeholder="Description de l'examen..."
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Tests ophtalmo supplémentaires</label>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={10}
                      className="input-style w-full resize-none"
                      value={depistage.tests_ophtalmo_suppl}
                      onChange={(e) => handleChangeDepistage('tests_ophtalmo_suppl', e.target.value)}
                      placeholder="Détails supplémentaires..."
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Maladies oculaires détectées</label>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={10}
                      className="input-style w-full resize-none"
                      value={depistage.maladies_oculaires_detectees}
                      onChange={(e) => handleChangeDepistage('maladies_oculaires_detectees', e.target.value)}
                      placeholder="Indiquez les maladies détectées..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold">Examen nez</label>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={10}
                      className="input-style w-full resize-none"
                      value={depistage.examen_nez}
                      onChange={(e) => handleChangeDepistage('examen_nez', e.target.value)}
                      placeholder="Description examen nez..."
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Examen larynx</label>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={10}
                      className="input-style w-full resize-none"
                      value={depistage.examen_larynx}
                      onChange={(e) => handleChangeDepistage('examen_larynx', e.target.value)}
                      placeholder="Description examen larynx..."
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Remarque ORL</label>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={10}
                      className="input-style w-full resize-none"
                      value={depistage.remarque_orl}
                      onChange={(e) => handleChangeDepistage('remarque_orl', e.target.value)}
                      placeholder="Remarques complémentaires..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="addreturn pt-6 px-4 flex justify-between">
          <div className="back-container" onClick={() => navigate('/DoctorList')}>
            <IoArrowBackCircle className="IoArrowBackCircle" />
            <span className="back-text">Retour</span>
          </div>
          <button
            type="submit"
            style={{ backgroundColor: '#79D7BE' }}
            className="w-1/2 py-4 px-6 text-lg font-semibold text-white rounded-xl hover:brightness-90 transition shadow-md"
            onClick={handleSubmit}
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModifyFormPatient;
