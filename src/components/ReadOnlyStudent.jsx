import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";
import PatientSideBare from "./PatientSideBare";
import "./CreateForm.css";

function ReadOnlyStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTabFromState = location.state?.activeTab || "infos";
  const [activeTab, setActiveTab] = useState(activeTabFromState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    numero_dossier: "",
    nom: "",
    prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    adresse: "",
    numero_telephone: "",
    email: "",
    situation_familiale: "",
    admission_etablissement: "Oui",
    Filiere: "",
    Niveau: "",
    numero_securite_sociale: "",
    groupe_sanguin: "",
    sexe: "",
    taille: "",
    poids: "",
    frequence_cardiaque: "",
    pression_arterielle: "",
    imc: "",
    categorie_imc: "",
    fumeur: "Non",
    nombre_cigarettes: "",
    chiqueur: "Non",
    nombre_boites_chique: "",
    prise_autre: "Non",
    nombre_boites_autre: "",
    ancien_fumeur: "Non",
    nombre_boites_fumeur: "",
    age_premiere_prise: "",
    affections_congenitales: "",
    maladies_generales: "",
    interventions_chirurgicales: "",
    reactions_allergiques: "",
  });

  const [depistage, setDepistage] = useState({
    evaluation_auditive: "",
    utilisation_audiometre: false,
    test_reponse_son: "",
    remarque_audition: "",
    vision_lointaine: "",
    vision_proche: "",
    besoin_lunettes: false,
    test_snellen_effectue: false,
    remarque_vision: "",
    pression_oculaire: "",
    examen_fond_oeil: "",
    tests_ophtalmo_suppl: "",
    maladies_oculaires_detectees: "",
    examen_nez: "",
    examen_oreille: "",
    examen_larynx: "",
    remarque_orl: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [afficherDepistage, setAfficherDepistage] = useState(true);

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
    { number: "48", name: "Relizane" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const res = await fetch(`http://127.0.0.1:8000/api/dossier-medicale/dossiers/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 404) throw new Error("Dossier not found.");
          if (res.status === 403) throw new Error("Access forbidden.");
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched dossier:", data);

        const updatedFormData = {
          ...formData,
          ...Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, value ?? ""])
          ),
          fumeur: data.fumeur ? "Oui" : "Non",
          chiqueur: data.chiqueur ? "Oui" : "Non",
          prise_autre: data.prise_autre ? "Oui" : "Non",
          ancien_fumeur: data.ancien_fumeur ? "Oui" : "Non",
        };

        const t = parseFloat(updatedFormData.taille);
        const p = parseFloat(updatedFormData.poids);

        if (t > 0 && p > 0 && !isNaN(t) && !isNaN(p)) {
          const imcCalc = p / Math.pow(t / 100, 2);
          updatedFormData.imc = imcCalc.toFixed(1);

          let interpretation = "";
          if (updatedFormData.sexe === "Homme") {
            if (imcCalc < 18.5) interpretation = "Insuffisance pondérale";
            else if (imcCalc < 25) interpretation = "Corpulence normale";
            else if (imcCalc < 30) interpretation = "Surpoids";
            else if (imcCalc < 35) interpretation = "Obésité modérée";
            else if (imcCalc < 40) interpretation = "Obésité sévère";
            else interpretation = "Obésité morbide";
          } else if (updatedFormData.sexe === "Femme") {
            if (imcCalc < 18.5) interpretation = "Insuffisance pondérale";
            else if (imcCalc < 24) interpretation = "Corpulence normale";
            else if (imcCalc < 29) interpretation = "Surpoids";
            else if (imcCalc < 34) interpretation = "Obésité modérée";
            else if (imcCalc < 39) interpretation = "Obésité sévère";
            else interpretation = "Obésité morbide";
          }
          updatedFormData.categorie_imc = interpretation;
        } else {
          updatedFormData.imc = "";
          updatedFormData.categorie_imc = "";
        }

        setFormData(updatedFormData);

        if (data.depistage) {
          setDepistage({
            ...depistage,
            ...Object.fromEntries(
              Object.entries(data.depistage).map(([key, value]) => [
                key,
                value ?? (typeof value === "boolean" ? false : ""),
              ])
            ),
          });
        } else {
          setDepistage({
            evaluation_auditive: "",
            utilisation_audiometre: false,
            test_reponse_son: "",
            remarque_audition: "",
            vision_lointaine: "",
            vision_proche: "",
            besoin_lunettes: false,
            test_snellen_effectue: false,
            remarque_vision: "",
            pression_oculaire: "",
            examen_fond_oeil: "",
            tests_ophtalmo_suppl: "",
            maladies_oculaires_detectees: "",
            examen_nez: "",
            examen_oreille: "",
            examen_larynx: "",
            remarque_orl: "",
          });
        }

        let photoUrl = data.photo ?? null;
        if (photoUrl && !photoUrl.startsWith("http")) {
          photoUrl = `http://127.0.0.1:8000${photoUrl}`;
        }
        setPhotoPreview(photoUrl);
        setLoading(false);
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError(err.message || "Failed to load dossier.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    console.log("Navigating back with activeTab:", activeTabFromState);
    navigate("/PatientListeDemandes", { state: { activeTab: activeTabFromState } });
  };

  const getImcColor = () => {
    if (!formData.imc) return "bg-gray-100";
    const val = parseFloat(formData.imc);
    if (formData.sexe === "Femme") {
      if (val >= 18.5 && val <= 24.4) return "bg-green-100";
      else if (val < 18.5) return "bg-yellow-100";
      else return "bg-red-100";
    } else if (formData.sexe === "Homme") {
      if (val >= 19 && val <= 25) return "bg-green-100";
      else if (val < 19) return "bg-yellow-100";
      else return "bg-red-100";
    }
    return "bg-gray-100";
  };

  const tabs = [
    { id: "infos", label: "Informations personnelles" },
    { id: "antecedentsPerso", label: "Antécédents personnels" },
    { id: "antecedentsChir", label: "Antécédents chirurgicaux" },
    { id: "depistage", label: "Dépistage" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="ml-[250px] p-6">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="ml-[250px] p-6">
          <button className="btn-back flex items-center gap-2" onClick={handleBack}>
            <IoArrowBackCircle className="text-2xl" /> Retour
          </button>
          <p className="text-red-600 mt-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-[250px] fixed">
        <PatientSideBare />
      </div>

      <div className="ml-[250px] p-6">
        <button className="btn-back flex items-center gap-2 mb-4" onClick={handleBack}>
          <IoArrowBackCircle className="text-2xl" /> Retour
        </button>

        <div className="flex justify-between items-center mb-8 px-6 py-4 bg-white shadow-md rounded-md">
          <h1 className="text-3xl font-bold text-teal-700">Dossier Médical Étudiant</h1>
          <div
            className="relative w-32 h-32 rounded-full bg-white border-4 border-transparent bg-clip-padding p-1 shadow-lg"
            style={{
              background: "linear-gradient(to right, #4BA0A8, #70C9B0, #4BA0A8)",
            }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Photo"
                  className="w-full h-full object-cover rounded-full"
                  onError={() => setPhotoPreview(null)}
                />
              ) : (
                <span className="text-sm text-teal-700 font-semibold">
                  Pas de photo
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-4 border-b pb-2">
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

        {activeTab === "infos" && (
          <div className="border rounded-lg shadow bg-white p-6 w-full">
            <h2 className="text-lg font-bold mb-6 text-teal-700">Informations personnelles</h2>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block mb-1 font-medium text-teal-700">Numéro de dossier</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.numero_dossier || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Nom</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.nom || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Prénom</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.prenom || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Date de naissance</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.date_naissance || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Lieu de naissance</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={wilayas.find((w) => w.number === formData.lieu_naissance)?.name || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Adresse</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.adresse || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Numéro de téléphone</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.numero_telephone || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Email</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.email || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Situation familiale</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.situation_familiale || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Admis à l'établissement</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.admission_etablissement || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Filière</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.Filiere || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Niveau</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.Niveau || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Numéro de sécurité sociale</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.numero_securite_sociale || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Groupe sanguin</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.groupe_sanguin || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-teal-700">Sexe</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.sexe === "Femme" ? "Féminin" : formData.sexe === "Homme" ? "Masculin" : ""}
                  disabled
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "antecedentsPerso" && (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4 text-teal-700">Antécédents personnels</h2>
            <div className="space-y-4">
              {[
                { label: "Fumeur", name: "fumeur", quantity: "nombre_cigarettes" },
                { label: "Chiqueur", name: "chiqueur", quantity: "nombre_boites_chique" },
                { label: "Prise autre", name: "prise_autre", quantity: "nombre_boites_autre" },
                { label: "Ancien fumeur", name: "ancien_fumeur", quantity: "nombre_boites_fumeur" },
              ].map(({ label, name, quantity }) => (
                <div key={label} className="grid grid-cols-3 items-center gap-4 border-2 rounded-md p-3" style={{ borderColor: "#4BA0A8" }}>
                  <label className="font-semibold text-teal-700">{label}</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={name}
                        value="Oui"
                        checked={formData[name] === "Oui"}
                        disabled
                      />
                      Oui
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={name}
                        value="Non"
                        checked={formData[name] === "Non"}
                        disabled
                      />
                      Non
                    </label>
                  </div>
                  <input
                    type="number"
                    placeholder="Paquets / jour"
                    className="input-style w-full bg-gray-100 cursor-not-allowed"
                    value={formData[quantity] || ""}
                    disabled
                  />
                </div>
              ))}
              <div className="grid grid-cols-3 items-center gap-4 border-2 rounded-md p-3" style={{ borderColor: "#4BA0A8" }}>
                <label className="font-semibold text-teal-700">Âge à la première prise</label>
                <input
                  type="number"
                  placeholder="Âge"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.age_premiere_prise || ""}
                  disabled
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "antecedentsChir" && (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4 text-teal-700">Antécédents chirurgicaux</h2>
            <div className="space-y-6">
              {[
                { label: "Affections congénitales", name: "affections_congenitales" },
                { label: "Maladies générales", name: "maladies_generales" },
                { label: "Interventions chirurgicales", name: "interventions_chirurgicales" },
                { label: "Réactions allergiques", name: "reactions_allergiques" },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-teal-700 font-semibold mb-1">{label}</label>
                  <TextareaAutosize
                    name={name}
                    value={formData[name] || ""}
                    className="input-style w-full resize-none bg-gray-100 cursor-not-allowed"
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block font-semibold text-teal-700">Taille (cm)</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.taille || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block font-semibold text-teal-700">Poids (kg)</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.poids || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block font-semibold text-teal-700">Fréquence cardiaque (bpm)</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.frequence_cardiaque || ""}
                  disabled
                />
              </div>
              <div>
                <label className="block font-semibold text-teal-700">Pression artérielle</label>
                <input
                  type="text"
                  className="input-style w-full bg-gray-100 cursor-not-allowed"
                  value={formData.pression_arterielle || ""}
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-teal-700">Indice de Masse Corporelle (IMC)</label>
              <div className={`p-2 border rounded ${getImcColor()}`}>
                {formData.imc || "Veuillez entrer taille et poids"}
              </div>
            </div>
            <div>
              <label className="inline-flex items-center gap-2 font-semibold text-teal-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={afficherDepistage}
                  onChange={() => setAfficherDepistage(!afficherDepistage)}
                  disabled
                />
                Afficher le dépistage
              </label>
            </div>
            {afficherDepistage && (
              <div className="space-y-6 border-t pt-4">
                <h3 className="text-lg font-bold text-teal-600">Dépistage</h3>
                {Object.keys(depistage).length === 0 ? (
                  <p className="text-gray-600">Aucune donnée de dépistage disponible.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-teal-700">Intévaluation auditive</label>
                        <select
                          value={depistage.evaluation_auditive || ""}
                          className="input-style w-full bg-gray-100 cursor-not-allowed"
                          disabled
                        >
                          <option value="">-- Choisir --</option>
                          <option value="Normal">Normal</option>
                          <option value="Perte auditive">Perte auditive</option>
                          <option value="Surdité partielle/complète">Surdité partielle/complète</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="font-semibold text-teal-700 cursor-pointer">Audiomètre utilisé</label>
                        <input
                          type="checkbox"
                          checked={depistage.utilisation_audiometre || false}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Test réponse au son</label>
                        <select
                          value={depistage.test_reponse_son || ""}
                          className="input-style w-full bg-gray-100 cursor-not-allowed"
                          disabled
                        >
                          <option value="">-- Choisir --</option>
                          <option value="Normal">Normal</option>
                          <option value="Anormal">Anormal</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Remarque audition</label>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={10}
                          className="input-style w-full resize-none bg-gray-100 cursor-not-allowed"
                          value={depistage.remarque_audition || ""}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Vision lointaine</label>
                        <select
                          value={depistage.vision_lointaine || ""}
                          className="input-style w-full bg-gray-100 cursor-not-allowed"
                          disabled
                        >
                          <option value="">-- Choisir --</option>
                          <option value="Normale">Normale</option>
                          <option value="Anormale">Anormale</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Vision proche</label>
                        <select
                          value={depistage.vision_proche || ""}
                          className="input-style w-full bg-gray-100 cursor-not-allowed"
                          disabled
                        >
                          <option value="">-- Choisir --</option>
                          <option value="Normale">Normale</option>
                          <option value="Anormale">Anormale</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="font-semibold text-teal-700 cursor-pointer">Besoin de lunettes</label>
                        <input
                          type="checkbox"
                          checked={depistage.besoin_lunettes || false}
                          disabled
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="font-semibold text-teal-700 cursor-pointer">Test Snellen effectué</label>
                        <input
                          type="checkbox"
                          checked={depistage.test_snellen_effectue || false}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Remarque vision</label>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={10}
                          className="input-style w-full resize-none bg-gray-100 cursor-not-allowed"
                          value={depistage.remarque_vision || ""}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Pression oculaire</label>
                        <input
                          type="text"
                          className="input-style w-full bg-gray-100 cursor-not-allowed"
                          value={depistage.pression_oculaire || ""}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Examen fond d'œil</label>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={10}
                          className="input-style w-full resize-none bg-gray-100 cursor-not-allowed"
                          value={depistage.examen_fond_oeil || ""}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Tests ophtalmo supplémentaires</label>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={10}
                          className="input-style w-full resize-none bg-gray-100 cursor-not-allowed"
                          value={depistage.tests_ophtalmo_suppl || ""}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Maladies oculaires détectées</label>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={10}
                          className="input-style w-full resize-none bg-gray-100 cursor-not-allowed"
                          value={depistage.maladies_oculaires_detectees || ""}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Examen nez</label>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={10}
                          className="input-style w-full resize-none bg-gray-100 cursor-not-allowed"
                          value={depistage.examen_nez || ""}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Examen oreille</label>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={10}
                          className="input-style w-full resize-none bg-gray-100 cursor-not-allowed"
                          value={depistage.examen_oreille || ""}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Examen larynx</label>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={10}
                          className="input-style w-full resize-none bg-gray-100 cursor-not-allowed"
                          value={depistage.examen_larynx || ""}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-teal-700">Remarque ORL</label>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={10}
                          className="input-style w-full resize-none bg-gray-100 cursor-not-allowed"
                          value={depistage.remarque_orl || ""}
                          disabled
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadOnlyStudent;