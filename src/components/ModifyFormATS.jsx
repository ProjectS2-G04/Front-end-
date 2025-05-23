import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateForm.css';
import SideBareDocs from './SideBareDocs';
import TextareaAutosize from 'react-textarea-autosize';

function ModifyFormAts() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

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
    service: '',
    grade: '',
    numero_securite_sociale: '',
    groupe_sanguin: '',
    sexe: '',
    taille: '',
    poids: '',
    frequence_cardiaque: '',
    pression_arterielle: '',
    imc: '',
    categorie_imc: '',
    fumeur: 'non',
    nombre_cigarettes: '',
    chiqueur: 'non',
    nombre_boites_chique: '',
    prise_autre: 'non',
    nombre_boites_autre: '',
    ancien_fumeur: 'non',
    nombre_boites_fumeur: '',
    age_premiere_prise: '',
    affections_congenitales: '',
    maladies_generales: '',
    interventions_chirurgicales: '',
    reactions_allergiques: '',
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
    photo: '',
  });

  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [secuError, setSecuError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching dossier with ID:', id);
        console.log('Token:', token ? 'Present' : 'Missing');
        const res = await fetch(`http://127.0.0.1:8000/api/dossier-medicale/dossiers/ats/${id}/`, {
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
          fumeur: data.fumeur ? 'oui' : 'non',
          chiqueur: data.chiqueur ? 'oui' : 'non',
          prise_autre: data.prise_autre ? 'oui' : 'non',
          ancien_fumeur: data.ancien_fumeur ? 'oui' : 'non',
          utilisation_audiometre: data.utilisation_audiometre || false,
          besoin_lunettes: data.besoin_lunettes || false,
          test_snellen_effectue: data.test_snellen_effectue || false,
          photo: data.photo ?? '',
        };

        const t = parseFloat(updatedFormData.taille);
        const p = parseFloat(updatedFormData.poids);

        if (t > 0 && p > 0) {
          const imcCalc = p / Math.pow(t / 100, 2);
          updatedFormData.imc = imcCalc.toFixed(1);

          let interpretation = '';
          if (updatedFormData.sexe === 'M') {
            if (imcCalc < 19) interpretation = 'Insuffisance pondérale';
            else if (imcCalc < 25) interpretation = 'Corpulence normale';
            else if (imcCalc < 30) interpretation = 'Surpoids';
            else if (imcCalc < 35) interpretation = 'Obésité modérée';
            else if (imcCalc < 40) interpretation = 'Obésité sévère';
            else interpretation = 'Obésité morbide';
          } else if (updatedFormData.sexe === 'F') {
            if (imcCalc < 18.5) interpretation = 'Insuffisance pondérale';
            else if (imcCalc < 24.4) interpretation = 'Corpulence normale';
            else if (imcCalc < 29) interpretation = 'Surpoids';
            else if (imcCalc < 34) interpretation = 'Obésité modérée';
            else if (imcCalc < 39) interpretation = 'Obésité sévère';
            else interpretation = 'Obésité morbide';
          }
          updatedFormData.categorie_imc = interpretation;
        } else {
          updatedFormData.imc = '';
          updatedFormData.categorie_imc = '';
        }

        setFormData(updatedFormData);
        setPhotoPreview(data.photo || null);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        alert('Erreur lors du chargement des données: ' + err.message);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const t = parseFloat(formData.taille);
    const p = parseFloat(formData.poids);
    if (t > 0 && p > 0) {
      const imcCalc = p / Math.pow(t / 100, 2);
      let interpretation = '';
      if (formData.sexe === 'M') {
        if (imcCalc < 19) interpretation = 'Insuffisance pondérale';
        else if (imcCalc < 25) interpretation = 'Corpulence normale';
        else if (imcCalc < 30) interpretation = 'Surpoids';
        else if (imcCalc < 35) interpretation = 'Obésité modérée';
        else if (imcCalc < 40) interpretation = 'Obésité sévère';
        else interpretation = 'Obésité morbide';
      } else if (formData.sexe === 'F') {
        if (imcCalc < 18.5) interpretation = 'Insuffisance pondérale';
        else if (imcCalc < 24.4) interpretation = 'Corpulence normale';
        else if (imcCalc < 29) interpretation = 'Surpoids';
        else if (imcCalc < 34) interpretation = 'Obésité modérée';
        else if (imcCalc < 39) interpretation = 'Obésité sévère';
        else interpretation = 'Obésité morbide';
      }
      setFormData((prev) => ({
        ...prev,
        imc: imcCalc.toFixed(1),
        categorie_imc: interpretation,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        imc: '',
        categorie_imc: '',
      }));
    }
  }, [formData.taille, formData.poids, formData.sexe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumericInput = (e, field) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handlePressionArterielle = (e) => {
    const value = e.target.value;
    if (/^[0-9]*\/?[0-9]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, pression_arterielle: value }));
    }
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validatePhone = (value) => {
    const phoneRegex = /^(05|06|07)[0-9]{8}$/;
    setFormData((prev) => ({ ...prev, numero_telephone: value }));
    setPhoneError(phoneRegex.test(value) ? '' : 'Numéro invalide (ex: 05xxxxxxxx)');
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z]+(?:\.[a-zA-Z]+)?@esi-sba\.dz$/;
    setFormData((prev) => ({ ...prev, email: value }));
    setEmailError(emailRegex.test(value) ? '' : 'Email invalide (ex: abc.prenom@esi-sba.dz)');
  };

  const validateNumeroSecurite = (value) => {
    const regex = /^[12]\d{17}$/;
    setFormData((prev) => ({ ...prev, numero_securite_sociale: value }));
    setSecuError(regex.test(value) ? '' : 'Numéro invalide (18 chiffres, commence par 1 ou 2)');
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(value === 'non' && {
        [name === 'fumeur' ? 'nombre_cigarettes' : '' ||
         name === 'chiqueur' ? 'nombre_boites_chique' : '' ||
         name === 'prise_autre' ? 'nombre_boites_autre' : '' ||
         name === 'ancien_fumeur' ? 'nombre_boites_fumeur' : '']: '',
      }),
      ...(value === 'non' &&
        prev.fumeur === 'non' &&
        prev.chiqueur === 'non' &&
        prev.prise_autre === 'non' &&
        prev.ancien_fumeur === 'non' &&
        name !== 'ancien_fumeur' ? { age_premiere_prise: '' } : {}),
    }));
  };

  const textareasRef = useRef([]);
  const handleTextareaInput = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const textarea = textareasRef.current[index];
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'nom', 'prenom', 'date_naissance', 'lieu_naissance', 'adresse',
      'numero_telephone', 'email', 'situation_familiale', 'service',
      'grade', 'numero_securite_sociale', 'groupe_sanguin', 'sexe',
      'taille', 'poids', 'frequence_cardiaque', 'pression_arterielle',
    ];

    const tabacFields = ['fumeur', 'chiqueur', 'prise_autre', 'ancien_fumeur'];
    const missingFields = requiredFields.filter(
      (key) => !formData[key] || formData[key].toString().trim() === ''
    );
    const unsetTabac = tabacFields.filter((key) => !formData[key]);

    if (missingFields.length > 0 || unsetTabac.length > 0 || phoneError || emailError || secuError) {
      console.log('Submission blocked:', { missingFields, unsetTabac, phoneError, emailError, secuError });
      const errors = {};
      missingFields.forEach((field) => (errors[field] = true));
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    const submissionData = new FormData();
    const dataToSend = {
      ...formData,
      taille: formData.taille ? parseFloat(formData.taille) : null,
      poids: formData.poids ? parseFloat(formData.poids) : null,
      frequence_cardiaque: formData.frequence_cardiaque ? parseFloat(formData.frequence_cardiaque) : null,
      pression_arterielle: formData.pression_arterielle || null,
      nombre_cigarettes: formData.fumeur === 'oui' && formData.nombre_cigarettes ? parseInt(formData.nombre_cigarettes) : null,
      nombre_boites_chique: formData.chiqueur === 'oui' && formData.nombre_boites_chique ? parseInt(formData.nombre_boites_chique) : null,
      nombre_boites_autre: formData.prise_autre === 'oui' && formData.nombre_boites_autre ? parseInt(formData.nombre_boites_autre) : null,
      nombre_boites_fumeur: formData.ancien_fumeur === 'oui' && formData.nombre_boites_fumeur ? parseInt(formData.nombre_boites_fumeur) : null,
      age_premiere_prise: formData.age_premiere_prise ? parseInt(formData.age_premiere_prise) : null,
      fumeur: formData.fumeur === 'oui',
      chiqueur: formData.chiqueur === 'oui',
      prise_autre: formData.prise_autre === 'oui',
      ancien_fumeur: formData.ancien_fumeur === 'oui',
      utilisation_audiometre: formData.utilisation_audiometre,
      besoin_lunettes: formData.besoin_lunettes,
      test_snellen_effectue: formData.test_snellen_effectue,
    };

    for (const key in dataToSend) {
      if (dataToSend[key] !== null && dataToSend[key] !== undefined) {
        submissionData.append(key, dataToSend[key]);
      }
    }

    const file = fileInputRef.current?.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (!validTypes.includes(file.type)) {
        alert('Le fichier doit être une image (JPEG ou PNG).');
        return;
      }
      if (file.size > maxSize) {
        alert('La taille de l’image ne doit pas dépasser 2 Mo.');
        return;
      }
      submissionData.append('photo', file);
    } else if (formData.photo) {
      try {
        const response = await fetch(formData.photo);
        const blob = await response.blob();
        const existingFile = new File([blob], 'existing_photo.jpg', { type: blob.type });
        submissionData.append('photo', existingFile);
      } catch (error) {
        console.error('Error fetching existing photo:', error);
        alert('Erreur lors de la récupération de la photo existante.');
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const res = await fetch(`http://127.0.0.1:8000/api/dossier-medicale/dossiers/ats/${id}/`, {
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
    { number: '28', name: 'M’Sila' },
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
    { number: '49', name: 'Timimoun' },
    { number: '50', name: 'Bordj Badji Mokhtar' },
    { number: '51', name: 'Ouled Djellal' },
    { number: '52', name: 'Béni Abbès' },
    { number: '53', name: 'In Salah' },
    { number: '54', name: 'In Guezzam' },
    { number: '55', name: 'Touggourt' },
    { number: '56', name: 'Djanet' },
    { number: '57', name: 'El M’Ghair' },
    { number: '58', name: 'El Menia' },
  ];

  const tabs = [
    { id: 'infos', label: 'Informations personnelles' },
    { id: 'antecedentsPerso', label: 'Antécédents personnels' },
    { id: 'antecedentsChir', label: 'Antécédents chirurgicaux' },
    { id: 'depistage', label: 'Dépistage' },
  ];

  const getImcColor = () => {
    if (!formData.imc) return '';
    const val = parseFloat(formData.imc);
    if (formData.sexe === 'F') {
      if (val >= 18.5 && val <= 24.4) return 'text-green-600 font-bold';
    } else if (formData.sexe === 'M') {
      if (val >= 19 && val <= 25) return 'text-green-600 font-bold';
    }
    return 'text-red-600 font-bold';
  };

  const isAgeDisabled =
    formData.fumeur === 'non' &&
    formData.chiqueur === 'non' &&
    formData.prise_autre === 'non' &&
    formData.ancien_fumeur === 'non';

  return (
    <div className="min-h-screen bg-white-100">
      <div className="w-[250px]">
        <SideBareDocs />
      </div>

      <div className="ml-[250px] p-6">
        <div className="flex justify-between items-center mb-8 px-6 py-4 bg-white shadow-md rounded-md">
          <h1 className="text-3xl font-bold text-teal-700">Dossier Médical ATS</h1>
          <div
            className="relative w-32 h-32 rounded-full bg-white border-4 border-transparent bg-clip-padding p-1 shadow-lg"
            style={{ background: 'linear-gradient(to right, #4BA0A8, #70C9B0, #4BA0A8)' }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview} alt="Photo" className="w-full h-full object-cover rounded-full" />
              ) : (
                <label className="flex flex-col items-center justify-center text-center cursor-pointer text-sm text-[#186a6b] font-semibold w-full h-full">
                  Choisir<br />une photo
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
                  className={`input-style ${emailError || fieldErrors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={(e) => {
                    handleChange(e);
                    validateEmail(e.target.value);
                  }}
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block mb-1 font-medium">Numéro de téléphone</label>
                <input
                  type="tel"
                  name="numero_telephone"
                  className={`input-style ${phoneError || fieldErrors.numero_telephone ? 'input-error' : ''}`}
                  value={formData.numero_telephone}
                  onChange={(e) => {
                    handleChange(e);
                    validatePhone(e.target.value);
                  }}
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Numéro de sécurité sociale</label>
                <input
                  type="text"
                  name="numero_securite_sociale"
                  className={`input-style ${secuError || fieldErrors.numero_securite_sociale ? 'input-error' : ''}`}
                  value={formData.numero_securite_sociale}
                  onChange={(e) => {
                    handleChange(e);
                    validateNumeroSecurite(e.target.value);
                  }}
                />
                {secuError && <p className="text-red-500 text-sm mt-1">{secuError}</p>}
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
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Service</label>
                <input
                  type="text"
                  name="service"
                  className={`input-style ${fieldErrors.service ? 'input-error' : ''}`}
                  value={formData.service}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Grade</label>
                <input
                  type="text"
                  name="grade"
                  className={`input-style ${fieldErrors.grade ? 'input-error' : ''}`}
                  value={formData.grade}
                  onChange={handleChange}
                />
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
                  <option value="F">Féminin</option>
                  <option value="M">Masculin</option>
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
                { label: 'A fumer', name: 'fumeur', quantity: 'nombre_cigarettes' },
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
                        value="oui"
                        checked={formData[name] === 'oui'}
                        onChange={() => handleRadioChange(name, 'oui')}
                      />
                      Oui
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={name}
                        value="non"
                        checked={formData[name] === 'non'}
                        onChange={() => handleRadioChange(name, 'non')}
                      />
                      Non
                    </label>
                  </div>
                  <input
                    type="number"
                    placeholder="Paquets / jour"
                    name={quantity}
                    className={`input-style w-full ${fieldErrors[quantity] ? 'input-error' : ''}`}
                    value={formData[quantity]}
                    onChange={(e) => handleNumericInput(e, quantity)}
                    disabled={formData[name] !== 'oui'}
                    min="0"
                  />
                </div>
              ))}
              <div className="grid grid-cols-3 items-center gap-4 border-2 rounded-md p-3" style={{ borderColor: '#4BA0A8' }}>
                <label className="font-semibold text-teal-700">Âge à la première prise</label>
                <input
                  type="number"
                  name="age_premiere_prise"
                  className={`input-style w-full ${fieldErrors.age_premiere_prise ? 'input-error' : ''}`}
                  value={formData.age_premiere_prise}
                  onChange={(e) => handleNumericInput(e, 'age_premiere_prise')}
                  disabled={isAgeDisabled}
                  min="0"
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
              ].map(({ label, name }, index) => (
                <div key={name}>
                  <label className="block text-teal-700 font-semibold mb-1">{label}</label>
                  <TextareaAutosize
                    name={name}
                    value={formData[name] || ''}
                    onChange={(e) => handleTextareaInput(e, index)}
                    className={`w-full p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none ${
                      fieldErrors[name] ? 'input-error' : ''
                    }`}
                    minRows={3}
                    placeholder={`Entrez les informations concernant ${label.toLowerCase()}`}
                    ref={(el) => (textareasRef.current[index] = el)}
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
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-teal-700">Indice de Masse Corporelle (IMC)</label>
              <div className={`p-2 border rounded ${getImcColor()}`}>
                {formData.imc || 'Veuillez entrer taille et poids'}
              </div>
            </div>
            <div className="space-y-6 border-t pt-4">
              <h3 className="text-lg font-bold text-teal-600">Dépistage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Intévaluation auditive</label>
                  <select
                    name="intevaluation_auditive"
                    className="input-style w-full"
                    value={formData.intevaluation_auditive}
                    onChange={handleChange}
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
                    name="utilisation_audiometre"
                    checked={formData.utilisation_audiometre}
                    onChange={(e) => handleCheckboxChange('utilisation_audiometre', e.target.checked)}
                  />
                </div>
                <div>
                  <label className="block font-semibold">Test réponse au son</label>
                  <select
                    name="test_reponse_son"
                    className="input-style w-full"
                    value={formData.test_reponse_son}
                    onChange={handleChange}
                  >
                    <option value="">-- Choisir --</option>
                    <option value="Normal">Normal</option>
                    <option value="Anormal">Anormal</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold">Remarque audition</label>
                  <TextareaAutosize
                    name="remarque_audition"
                    minRows={3}
                    className="input-style w-full resize-none"
                    value={formData.remarque_audition}
                    onChange={(e) => handleChange(e)}
                    placeholder="Tapez votre remarque ici..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Vision lointaine</label>
                  <select
                    name="vision_lointaine"
                    className="input-style w-full"
                    value={formData.vision_lointaine}
                    onChange={handleChange}
                  >
                    <option value="">-- Choisir --</option>
                    <option value="Normal">Normal</option>
                    <option value="Anormal">Anormal</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold">Vision proche</label>
                  <select
                    name="vision_proche"
                    className="input-style w-full"
                    value={formData.vision_proche}
                    onChange={handleChange}
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
                    name="besoin_lunettes"
                    checked={formData.besoin_lunettes}
                    onChange={(e) => handleCheckboxChange('besoin_lunettes', e.target.checked)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="font-semibold cursor-pointer">Test Snellen effectué</label>
                  <input
                    type="checkbox"
                    name="test_snellen_effectue"
                    checked={formData.test_snellen_effectue}
                    onChange={(e) => handleCheckboxChange('test_snellen_effectue', e.target.checked)}
                  />
                </div>
                <div>
                  <label className="block font-semibold">Remarque vision</label>
                  <TextareaAutosize
                    name="remarque_vision"
                    minRows={3}
                    className="input-style w-full resize-none"
                    value={formData.remarque_vision}
                    onChange={(e) => handleChange(e)}
                    placeholder="Tapez votre remarque ici..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Pression oculaire</label>
                  <input
                    type="text"
                    name="pression_oculaire"
                    className="input-style w-full"
                    value={formData.pression_oculaire}
                    onChange={(e) => handleChange(e)}
                    placeholder="ex: 15.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Examen fond d’œil</label>
                  <TextareaAutosize
                    name="examen_fond_oeil"
                    minRows={3}
                    className="input-style w-full resize-none"
                    value={formData.examen_fond_oeil}
                    onChange={(e) => handleChange(e)}
                    placeholder="Description de l’examen..."
                  />
                </div>
                <div>
                  <label className="block font-semibold">Tests ophtalmo supplémentaires</label>
                  <TextareaAutosize
                    name="tests_ophtalmo_suppl"
                    minRows={3}
                    className="input-style w-full resize-none"
                    value={formData.tests_ophtalmo_suppl}
                    onChange={(e) => handleChange(e)}
                    placeholder="Détails supplémentaires..."
                  />
                </div>
                <div>
                  <label className="block font-semibold">Maladies oculaires détectées</label>
                  <TextareaAutosize
                    name="maladies_oculaires_detectees"
                    minRows={3}
                    className="input-style w-full resize-none"
                    value={formData.maladies_oculaires_detectees}
                    onChange={(e) => handleChange(e)}
                    placeholder="Indiquez les maladies détectées..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold">Examen nez</label>
                  <TextareaAutosize
                    name="examen_nez"
                    minRows={3}
                    className="input-style w-full resize-none"
                    value={formData.examen_nez}
                    onChange={(e) => handleChange(e)}
                    placeholder="Description examen nez..."
                  />
                </div>
                <div>
                  <label className="block font-semibold">Examen larynx</label>
                  <TextareaAutosize
                    name="examen_larynx"
                    minRows={3}
                    className="input-style w-full resize-none"
                    value={formData.examen_larynx}
                    onChange={(e) => handleChange(e)}
                    placeholder="Description examen larynx..."
                  />
                </div>
                <div>
                  <label className="block font-semibold">Remarque ORL</label>
                  <TextareaAutosize
                    name="remarque_orl"
                    minRows={3}
                    className="input-style w-full resize-none"
                    value={formData.remarque_orl}
                    onChange={(e) => handleChange(e)}
                    placeholder="Remarques complémentaires..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 px-4">
          <button
            type="submit"
            style={{ backgroundColor: '#79D7BE' }}
            className="w-1/2 mx-auto py-4 px-6 text-lg font-semibold text-white rounded-xl hover:brightness-90 transition shadow-md block"
            onClick={handleSubmit}
          >
            Sauvgarder
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModifyFormAts;