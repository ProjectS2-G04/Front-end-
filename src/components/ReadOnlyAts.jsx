import React ,{useState , useEffect} from 'react'
import './CreateForm.css'
import './PatientSideBare'

import TextareaAutosize from 'react-textarea-autosize';
import PatientSideBare from './PatientSideBare';
function ReadOnlyAts() {
   const [activeTab, setActiveTab] = useState("infos");
  const [nom] = useState("Benali");
  const [prenom] = useState("Sofia");
  const [dateNaissance] = useState("1995-08-15");
  const [lieuNaissance] = useState("16"); // numéro wilaya Alger
  const [adresse] = useState("12 rue des Fleurs, Alger");
  const [email] = useState("sofia.benali@example.com");
  const [telephone] = useState("+213 551 234 567");
  const [nss] = useState("1234567890123");
  const [situationFamiliale] = useState("célibataire");
  const [service] = useState("Cardiologie");
  const [grade] = useState("Médecin spécialiste");
  const [groupeSanguin] = useState("A+");
  const [sexe] = useState("F");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [taille, setTaille] = React.useState("175"); // Taille en cm
  const [poids, setPoids] = React.useState("70");   // Poids en kg
  const [frequenceCardiaque, setFrequenceCardiaque] = React.useState("72"); // bpm
  const [pressionArterielle, setPressionArterielle] = React.useState("120/80");
  const [imc, setImc] = React.useState("22.9"); // Exemple IMC
  const [afficherDepistage, setAfficherDepistage] = React.useState(true);
  

 const [depistage, setDepistage] = React.useState({
  intevaluation_auditive: "Normal",
  utilisation_audiometre: true,
  test_reponse_son: "Normal",
  remarque_audition: "Aucune anomalie détectée.",
  vision_lointaine: "Normal",
  vision_proche: "Normal",
  besoin_lunettes: false,
  test_snellen_effectue: true,
  remarque_vision: "Vision normale.",
  pression_oculaire: "15.5",
  examen_fond_oeil: "Fond d’œil normal.",
  tests_ophtalmo_suppl: "Pas de tests supplémentaires nécessaires.",
  maladies_oculaires_detectees: "Aucune.",
  examen_nez: "Nez sans anomalie.",
  examen_larynx: "Larynx normal.",
  remarque_orl: "Pas de remarque particulière.",
});
    const handleChangeDepistage = (field, value) => {
    setDepistage(prev => ({
      ...prev,
      [field]: value,
    }));
  }
  const handleNumericInput = (e, setter, allowDecimal = false) => {
  const value = e.target.value;
  const regex = allowDecimal ? /^[0-9]*[.,]?[0-9]*$/ : /^[0-9]*$/;

  if (regex.test(value)) {
    setter(value);
  }
};

// Spécifique pour la pression artérielle (ex: 120/80)
const handlePressionArterielle = (e) => {
  const value = e.target.value;
  if (/^[0-9]*\/?[0-9]*$/.test(value)) {
    setPressionArterielle(value);
  }
};
  const verifierNss = () => {
  const regex = /^[12]\d{17}$/; // Commence par 1 ou 2, suivi de 17 chiffres
  if (!regex.test(nss)) {
    setErreurNss("Numéro de sécurité sociale invalide (18 chiffres, ex: 198010112345678901)");
  } else {
    setErreurNss("");
  }
};
    useEffect(() => {
  const t = parseFloat(taille);
  const p = parseFloat(poids);
  if (t > 0 && p > 0) {
    const tailleM = t / 100;
    const imcCalc = p / (tailleM * tailleM);
    setImc(imcCalc.toFixed(1));
  } else {
    setImc(null);
  }
}, [taille, poids, sexe]); // 🔁 Ajouter sexe


  // Couleur IMC : vert si 18.5 <= IMC <= 24.9, rouge sinon
  const getImcColor = () => {
  if (!imc) return "";

  const val = parseFloat(imc);

  if (sexe === "F") {
    if (val >= 18.5 && val <= 24.4) return "text-green-600 font-bold";
  } else if (sexe === "M") {
    if (val >= 19 && val <= 25) return "text-green-600 font-bold";
  }

  return "text-red-600 font-bold";
};

  const handleChange = (field, value) => {
    setDepistage(prev => ({ ...prev, [field]: value }));
  };
   const antecedentsInit = {
    Fumeur: { reponse: "non", paquets: "" },
    "A fumer": { reponse: "non", paquets: "" },
    "A choqué": { reponse: "non", paquets: "" },
    "A prise": { reponse: "non", paquets: "" },
    "Ancien fumeur": { reponse: "non", paquets: "" },
  };
const antecedentsChir = {
  affectionsCongenitales: "Malformation cardiaque détectée à la naissance",
  maladiesGenerales: "Hypertension artérielle",
  interventionsChirurgicales: "Appendicectomie en 2015",
  reactionsAllergiques: "Allergie à la pénicilline",
};
  const handleChirChange = (field, value) => {
  setAntecedentsChir((prev) => ({
    ...prev,
    [field]: value,
  }));
};
 const wilayas = [
  { number: "01", name: "Adrar" },
  { number: "02", name: "Chlef" },
  { number: "03", name: "Laghouat" },
  { number: "04", name: "Oum El Bouaghi" },
  { number: "05", name: "Batna" },
  { number: "06", name: "Béjaïa" },
  { number: "07", name: "Biskra" },
  { number: "08", name: "Béchar" },
  { number: "09", name: "Blida" },
  { number: "10", name: "Bouira" },
  { number: "11", name: "Tamanrasset" },
  { number: "12", name: "Tébessa" },
  { number: "13", name: "Tlemcen" },
  { number: "14", name: "Tiaret" },
  { number: "15", name: "Tizi Ouzou" },
  { number: "16", name: "Alger" },
  { number: "17", name: "Djelfa" },
  { number: "18", name: "Jijel" },
  { number: "19", name: "Sétif" },
  { number: "20", name: "Saïda" },
  { number: "21", name: "Skikda" },
  { number: "22", name: "Sidi Bel Abbès" },
  { number: "23", name: "Annaba" },
  { number: "24", name: "Guelma" },
  { number: "25", name: "Constantine" },
  { number: "26", name: "Médéa" },
  { number: "27", name: "Mostaganem" },
  { number: "28", name: "MSila" },
  { number: "29", name: "Mascara" },
  { number: "30", name: "Ouargla" },
  { number: "31", name: "Oran" },
  { number: "32", name: "El Bayadh" },
  { number: "33", name: "Illizi" },
  { number: "34", name: "Bordj Bou Arréridj" },
  { number: "35", name: "Boumerdès" },
  { number: "36", name: "El Tarf" },
  { number: "37", name: "Tindouf" },
  { number: "38", name: "Tissemsilt" },
  { number: "39", name: "El Oued" },
  { number: "40", name: "Khenchela" },
  { number: "41", name: "Souk Ahras" },
  { number: "42", name: "Tipaza" },
  { number: "43", name: "Mila" },
  { number: "44", name: "Aïn Defla" },
  { number: "45", name: "Naâma" },
  { number: "46", name: "Aïn Témouchent" },
  { number: "47", name: "Ghardaïa" },
  { number: "48", name: "Relizane" }
];


  const [antecedentsPerso, setAntecedentsPerso] = useState(antecedentsInit);
 const handleReponseChange = (item, value) => {
  setAntecedentsPerso(prev => ({
    ...prev,
    [item]: {
      ...prev[item],
      reponse: value,
      // tu peux aussi mettre paquets à "" ici si tu veux le vider quand c'est "non"
      // paquets: value === "non" ? "" : prev[item].paquets
    }
  }));
};

const handlePaquetsChange = (item, value) => {
  if (/^\d*$/.test(value)) {
    setAntecedentsPerso(prev => ({
      ...prev,
      [item]: {
        ...prev[item],
        paquets: value,
      }
    }));
  }
};


   const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }
};
   const verifierEmail = () => {
  const regex = /^[a-zA-Z]+(?:\.[a-zA-Z]+)?@esi-sba\.dz$/;
  if (!email.trim()) {
    setErreurEmail("L'email est requis.");
  } else if (!regex.test(email)) {
    setErreurEmail("Format email invalide. Exemple : abc.prenom@esi-sba.dz");
  } else {
    setErreurEmail("");
  }
};
 const verifierTelephone = () => {
  const regex = /^(05|06|07)[0-9]{8}$/;
  if (!telephone.trim()) {
    setErreurTelephone("Le numéro de téléphone est requis.");
  } else if (!regex.test(telephone)) {
    setErreurTelephone("Numéro invalide. Exemple : 05xxxxxxxx");
  } else {
    setErreurTelephone("");
  }
};


  const tabs = [
    { id: "infos", label: "Informations personnelles" },
    { id: "antecedentsPerso", label: "Antécédents personnels" },
    { id: "antecedentsChir", label: "Antécédents chirurgicaux" },
    { id: "depistage", label: "Dépistage" },
  ];
  
  return (
    <div className="min-h-screen bg-white-100">
      <div className="w-[250px]">
       <PatientSideBare />
     </div>

    <div className="ml-[250px] p-6">
 <div className="flex justify-between items-center mb-8 px-6 py-4 bg-white shadow-md rounded-md">
  {/* Titre à gauche */}
  <h1 className="text-3xl font-bold text-teal-700">Dossier Médical Ats</h1>

  {/* Cercle upload photo stylé à droite */}
<div className="relative w-32 h-32 rounded-full bg-white border-4 border-transparent bg-clip-padding p-1 shadow-lg"
     style={{
       background: "linear-gradient(to right, #4BA0A8, #70C9B0, #4BA0A8)"
     }}>
  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
    {photoPreview ? (
      <img
        src={photoPreview}
        alt="Photo"
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <label className="flex flex-col items-center justify-center text-center cursor-pointer text-sm text-[#186a6b] font-semibold w-full h-full">
        Choisir<br />une photo
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />
      </label>
    )}
  </div>
</div>
</div>


      {/* Onglets en haut */}
      <div className="flex space-x-4 gap-80 border-b pb-2 ml-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-semibold rounded-t ${
              activeTab === tab.id
                ? "border-b-2 border-teal-500 text-teal-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu dynamique */}
 {activeTab === "infos" && (
  <div className="border rounded-lg shadow bg-white p-6 w-full h-full">
      <h2 className="text-lg font-bold mb-6 text-teal-700">Informations personnelles</h2>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block mb-1 font-medium">Nom</label>
          <p className="readonly-style">{nom}</p>
        </div>
        <div>
          <label className="block mb-1 font-medium">Prénom</label>
          <p className="readonly-style">{prenom}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block mb-1 font-medium">Date de naissance</label>
          <p className="readonly-style">{dateNaissance}</p>
        </div>
        <div>
          <label className="block mb-1 font-medium">Lieu de naissance</label>
          <p className="readonly-style">
            {lieuNaissance ? wilayas.find(w => w.number === lieuNaissance)?.name : "--"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block mb-1 font-medium">Adresse</label>
          <p className="readonly-style">{adresse}</p>
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <p className="readonly-style">{email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block mb-1 font-medium">Numéro de téléphone</label>
          <p className="readonly-style">{telephone}</p>
        </div>
        <div>
          <label className="block mb-1 font-medium">Numéro de sécurité sociale</label>
          <p className="readonly-style">{nss}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-4">
        <div>
          <label className="block mb-1 font-medium">Situation familiale</label>
          <p className="readonly-style">{situationFamiliale}</p>
        </div>
        <div>
          <label className="block mb-1 font-medium">Service</label>
          <p className="readonly-style">{service}</p>
        </div>
        <div>
          <label className="block mb-1 font-medium">Grade</label>
          <p className="readonly-style">{grade}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Groupe sanguin</label>
          <p className="readonly-style">{groupeSanguin}</p>
        </div>
        <div>
          <label className="block mb-1 font-medium">Sexe</label>
          <p className="readonly-style">{sexe === "F" ? "Féminin" : "Masculin"}</p>
        </div>
      </div>
    </div>
)}




    {activeTab === "antecedentsPerso" && (
  <div className="p-4">
    <h2 className="text-lg font-bold mb-4 text-teal-700">Antécédents personnels</h2>
    <div className="space-y-4">
      {Object.keys(antecedentsPerso).map((label) => (
        <div
          key={label}
          className="grid grid-cols-3 items-center gap-4 border-2 rounded-md p-3"
          style={{ borderColor: "#4BA0A8" }}
        >
          <label className="font-semibold text-teal-700">{label}</label>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name={label}
                value="oui"
                checked={antecedentsPerso[label].reponse === "oui"}
                disabled
              />
              Oui
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name={label}
                value="non"
                checked={antecedentsPerso[label].reponse === "non"}
                disabled
              />
              Non
            </label>
          </div>

          <input
            type="number"
            placeholder="Paquets / jour"
            className="input-style w-full bg-gray-100 cursor-not-allowed"
            value={antecedentsPerso[label].paquets}
            disabled
          />
        </div>
      ))}
    </div>
  </div>
)}


    {activeTab === "antecedentsChir" && (
  <div className="p-4">
    <h2 className="text-lg font-bold mb-4 text-teal-700">Antécédents chirurgicaux</h2>

    <div className="space-y-6">
      {[
        {
          label: "Affections congénitales",
          name: "affectionsCongenitales",
        },
        {
          label: "Maladies générales",
          name: "maladiesGenerales",
        },
        {
          label: "Interventions chirurgicales (reporter les dates)",
          name: "interventionsChirurgicales",
        },
        {
          label: "Réactions allergiques aux médicaments",
          name: "reactionsAllergiques",
        },
      ].map(({ label, name }) => (
        <div key={name}>
          <label className="block text-teal-700 font-semibold mb-1">{label}</label>
          <TextareaAutosize
            name={name}
            value={antecedentsChir[name] || ""}
            className="w-full p-2 border-2 rounded-md bg-gray-100 text-gray-800 resize-none"
            minRows={3}
            disabled
          />
        </div>
      ))}
    </div>
  </div>
)}


      {activeTab === "depistage" && (
       <div className="p-6 space-y-6">
  <h2 className="text-xl font-bold text-teal-700">Formulaire Médical</h2>

  {/* Taille, Poids, Fréquence cardiaque, Pression artérielle */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div>
      <label className="block font-semibold text-teal-700">Taille (cm) *</label>
      <input
        type="text"
        className="input-style w-full"
        value={"175"}
        onChange={(e) => handleNumericInput(e, setTaille)}
        required
      />
    </div>
    <div>
      <label className="block font-semibold text-teal-700">Poids (kg) *</label>
      <input
        type="text"
        className="input-style w-full"
        value={"68"}
        onChange={(e) => handleNumericInput(e, setPoids)}
        required
      />
    </div>
    <div>
      <label className="block font-semibold text-teal-700">Fréquence cardiaque (bpm) *</label>
      <input
        type="text"
        className="input-style w-full"
        value={"72"}
        onChange={(e) => handleNumericInput(e, setFrequenceCardiaque)}
        required
      />
    </div>
    <div>
      <label className="block font-semibold text-teal-700">Pression artérielle *</label>
      <input
        type="text"
        className="input-style w-full"
        value={"120/80"}
        onChange={handlePressionArterielle}
        placeholder="ex: 120/80"
        required
      />
    </div>
  </div>

  {/* IMC calculé avec couleur */}
  <div>
    <label className="block font-semibold text-teal-700">Indice de Masse Corporelle (IMC)</label>
    <div className={`p-2 border rounded ${getImcColor()}`}>
      {"22.2" ?? "Veuillez entrer taille et poids"}
    </div>
  </div>

  {/* Bouton pour afficher/cacher la section Dépistage */}
  <div>
    <label className="inline-flex items-center gap-2 font-semibold text-teal-700 cursor-pointer">
      <input
        type="checkbox"
        checked={true}
        onChange={() => setAfficherDepistage(!afficherDepistage)}
      />
      Ajouter un dépistage
    </label>
  </div>

  {/* Section Dépistage (optionnelle) */}
  {true && (
    <div className="space-y-6 border-t pt-4">
      <h3 className="text-lg font-bold text-teal-600">Dépistage</h3>

      {/* Audition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Intévaluation auditive</label>
          <select
            value={"Normal"}
            onChange={(e) => handleChange("intevaluation_auditive", e.target.value)}
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
            checked={true}
            onChange={(e) => handleChange("utilisation_audiometre", e.target.checked)}
          />
        </div>

        <div>
          <label className="block font-semibold">Test réponse au son</label>
          <select
            value={"Anormal"}
            onChange={(e) => handleChange("test_reponse_son", e.target.value)}
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
            value={"Pas d'anomalies notées"}
            onChange={(e) => handleChangeDepistage("remarque_audition", e.target.value)}
            placeholder="Tapez votre remarque ici..."
          />
        </div>
      </div>

      {/* Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Vision lointaine</label>
          <select
            value={"Anormal"}
            onChange={(e) => handleChange("vision_lointaine", e.target.value)}
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
            value={"Normal"}
            onChange={(e) => handleChange("vision_proche", e.target.value)}
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
            checked={true}
            onChange={(e) => handleChange("besoin_lunettes", e.target.checked)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold cursor-pointer">Test Snellen effectué</label>
          <input
            type="checkbox"
            checked={false}
            onChange={(e) => handleChange("test_snellen_effectue", e.target.checked)}
          />
        </div>

        <div>
          <label className="block font-semibold">Remarque vision</label>
          <TextareaAutosize
            minRows={3}
            maxRows={10}
            className="input-style w-full resize-none"
            value={"Légère fatigue visuelle"}
            onChange={(e) => handleChangeDepistage("remarque_vision", e.target.value)}
            placeholder="Tapez votre remarque ici..."
          />
        </div>
      </div>

      {/* Ophtalmologie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Pression oculaire</label>
          <input
            type="text"
            className="input-style w-full"
            value={"16"}
            onChange={(e) => handleNumericInput(e, (val) => handleChange("pression_oculaire", val), true)}
            placeholder="ex: 15.5"
          />
        </div>

        <div>
          <label className="block font-semibold">Examen fond d'œil</label>
          <TextareaAutosize
            minRows={3}
            maxRows={10}
            className="input-style w-full resize-none"
            value={"Rien à signaler"}
            onChange={(e) => handleChangeDepistage("examen_fond_oeil", e.target.value)}
            placeholder="Description de l'examen..."
          />
        </div>

        <div>
          <label className="block font-semibold">Tests ophtalmo supplémentaires</label>
          <TextareaAutosize
            minRows={3}
            maxRows={10}
            className="input-style w-full resize-none"
            value={"Test couleur normal"}
            onChange={(e) => handleChangeDepistage("tests_ophtalmo_suppl", e.target.value)}
            placeholder="Détails supplémentaires..."
          />
        </div>

        <div>
          <label className="block font-semibold">Maladies oculaires détectées</label>
          <TextareaAutosize
            minRows={3}
            maxRows={10}
            className="input-style w-full resize-none"
            value={"Aucune"}
            onChange={(e) => handleChangeDepistage("maladies_oculaires_detectees", e.target.value)}
            placeholder="Indiquez les maladies détectées..."
          />
        </div>
      </div>

      {/* ORL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold">Examen nez</label>
          <TextareaAutosize
            minRows={3}
            maxRows={10}
            className="input-style w-full resize-none"
            value={"Nez sain"}
            onChange={(e) => handleChangeDepistage("examen_nez", e.target.value)}
            placeholder="Description examen nez..."
          />
        </div>

        <div>
          <label className="block font-semibold">Examen larynx</label>
          <TextareaAutosize
            minRows={3}
            maxRows={10}
            className="input-style w-full resize-none"
            value={"Pas d'inflammation"}
            onChange={(e) => handleChangeDepistage("examen_larynx", e.target.value)}
            placeholder="Description examen larynx..."
          />
        </div>

        <div>
          <label className="block font-semibold">Remarque ORL</label>
          <TextareaAutosize
            minRows={3}
            maxRows={10}
            className="input-style w-full resize-none"
            value={"Aucune remarque"}
            onChange={(e) => handleChangeDepistage("remarque_orl", e.target.value)}
            placeholder="Remarques générales..."
          />
        </div>
      </div>
    </div>
  )}
</div>

      )}
    </div>
  </div>
  )
}

export default ReadOnlyAts