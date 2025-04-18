
import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import "./CreateForm.css";

function ReadOnlyStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.state?.activeTab || "etudiants";

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

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          updatedFormData.imc = imcCalc.toFixed(2);

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

        console.log("Updated formData:", updatedFormData);
        setFormData(updatedFormData);
        let photoUrl = data.photo ?? null;
        if (photoUrl && !photoUrl.startsWith("http")) {
          photoUrl = `http://127.0.0.1:8000${photoUrl}`;
        }
        setImagePreview(photoUrl);
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError(err.message || "Failed to load dossier.");
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    console.log("Navigating back with activeTab:", activeTab);
    navigate("/PatientList", { state: { activeTab } });
  };

  if (error) {
    return (
      <div className="patient-container full-page">
        <div className="container-infosdocs">
          <button className="btn-back" onClick={handleBack}>
            <IoArrowBackCircle className="IoArrowBackCircle" /> Retour
          </button>
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-container full-page">
      <div className="container-infosdocs">
        <button className="btn-back" onClick={handleBack}>
          <IoArrowBackCircle className="IoArrowBackCircle" /> Retour
        </button>
        <div className="header">
          <div className="republic">
            <h3>République Algérienne Démocratique & Populaire</h3>
            <p>Ministère de la santé et de la population</p>
          </div>
          <div className="photo">
            <h3>Dossier médical - Étudiant</h3>
            <div className="photo-upload-rectangle">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profil"
                  className="uploaded-img"
                  onError={() => setImagePreview(null)}
                />
              ) : (
                <span className="upload-placeholder">
                  <p>Photo</p>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="form-sections">
          <section className="form-column">
            <h4>Informations personnelles</h4>
            <label>Numéro de dossier</label>
            <input type="text" value={formData.numero_dossier || ""} readOnly />
            <div className="nom-prenom">
              <label>Nom</label>
              <input type="text" value={formData.nom || ""} readOnly />
              <label>Prénom</label>
              <input type="text" value={formData.prenom || ""} readOnly />
            </div>
            <label>Date de naissance</label>
            <input type="date" value={formData.date_naissance || ""} readOnly />
            <label>Lieu de naissance</label>
            <select disabled value={formData.lieu_naissance || ""}>
              <option value={formData.lieu_naissance || ""}>
                {formData.lieu_naissance || "N/A"}
              </option>
            </select>
            <label>Adresse</label>
            <input type="text" value={formData.adresse || ""} readOnly />
            <label>Numéro de téléphone</label>
            <input type="tel" value={formData.numero_telephone || ""} readOnly />
            <label>Email</label>
            <input type="email" value={formData.email || ""} readOnly />
            <label>Situation familiale</label>
            <select disabled value={formData.situation_familiale || ""}>
              <option value={formData.situation_familiale || ""}>
                {formData.situation_familiale || "N/A"}
              </option>
            </select>
            <label>Admis à l'établissement</label>
            <input
              type="text"
              value={formData.admission_etablissement || ""}
              readOnly
            />
            <label>Filière</label>
            <input type="text" value={formData.Filiere || ""} readOnly />
            <label>Niveau</label>
            <select disabled value={formData.Niveau || ""}>
              <option value={formData.Niveau || ""}>
                {formData.Niveau || "N/A"}
              </option>
            </select>
            <label>Numéro de sécurité sociale</label>
            <input
              type="text"
              value={formData.numero_securite_sociale || ""}
              readOnly
            />
            <label>Groupe sanguin</label>
            <select disabled value={formData.groupe_sanguin || ""}>
              <option value={formData.groupe_sanguin || ""}>
                {formData.groupe_sanguin || "N/A"}
              </option>
            </select>
            <label>Sexe</label>
            <select disabled value={formData.sexe || ""}>
              <option value={formData.sexe || ""}>
                {formData.sexe || "N/A"}
              </option>
            </select>
          </section>

          <section className="form-column">
            <h4>Données biométriques</h4>
            <div className="nom-prenom">
              <label>Taille (cm)</label>
              <input type="number" value={formData.taille || ""} readOnly />
              <label>Poids (kg)</label>
              <input type="number" value={formData.poids || ""} readOnly />
            </div>
            <label>Fréquence cardiaque</label>
            <input
              type="number"
              value={formData.frequence_cardiaque || ""}
              readOnly
            />
            <label>Pression artérielle</label>
            <input
              type="text"
              value={formData.pression_arterielle || ""}
              readOnly
            />
            <label>IMC (Indice de Masse Corporelle)</label>
            <input type="text" value={formData.imc || ""} readOnly />
            <label>Interprétation IMC</label>
            <input type="text" value={formData.categorie_imc || ""} readOnly />

            <h4>Antécédents personnels - Tabacs</h4>
            {[
              {
                label: "Fumeur",
                name: "fumeur",
                quantity: "nombre_cigarettes",
              },
              {
                label: "Chiqueur",
                name: "chiqueur",
                quantity: "nombre_boites_chique",
              },
              {
                label: "Prise autre",
                name: "prise_autre",
                quantity: "nombre_boites_autre",
              },
              {
                label: "Ancien fumeur",
                name: "ancien_fumeur",
                quantity: "nombre_boites_fumeur",
              },
            ].map(({ label, name, quantity }, i) => (
              <div key={i} className="toggle-group">
                <label>{label}</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={name}
                      value="Oui"
                      checked={formData[name] === "Oui"}
                      disabled
                    />
                    Oui
                  </label>
                  <label>
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
                  type="text"
                  placeholder="Quantité/j"
                  value={formData[quantity] || ""}
                  readOnly
                />
              </div>
            ))}
            <div className="toggle-group">
              <label>Âge à la première prise</label>
              <input
                type="number"
                placeholder="Âge"
                value={formData.age_premiere_prise || ""}
                readOnly
              />
            </div>
          </section>

          <section className="form-column">
            <h4>Antécédents médico-chirurgicaux</h4>
            <div className="text-area">
              <div className="labeandtext">
                <label>Affections congénitales :</label>
                <textarea
                  value={formData.affections_congenitales || ""}
                  disabled
                  rows={1}
                  style={{ overflow: "hidden", resize: "none" }}
                />
              </div>
              <div className="labeandtext">
                <label>Maladies générales</label>
                <textarea
                  value={formData.maladies_generales || ""}
                  disabled
                  rows={1}
                  style={{ overflow: "hidden", resize: "none" }}
                />
              </div>
              <div className="labeandtext">
                <label>Interventions chirurgicales</label>
                <textarea
                  value={formData.interventions_chirurgicales || ""}
                  disabled
                  rows={1}
                  style={{ overflow: "hidden", resize: "none" }}
                />
              </div>
              <div className="labeandtext">
                <label>Réactions allergiques</label>
                <textarea
                  value={formData.reactions_allergiques || ""}
                  disabled
                  rows={1}
                  style={{ overflow: "hidden", resize: "none" }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ReadOnlyStudent;
