import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import "./CreateForm.css";

function CreateFormPatient() {
  const navigate = useNavigate();

 
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    adresse: "",
    numero_telephone: "",
    email: "",
    situation_familiale: "",
    admission_etablissement: "Oui",
    Filiere: "Informatique", // Set default to "Informatique"
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

  // Validation states
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [secuError, setSecuError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Photo upload
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // IMC calculation
  useEffect(() => {
    const t = parseFloat(formData.taille);
    const p = parseFloat(formData.poids);

    if (t > 0 && p > 0) {
      const imcCalc = p / Math.pow(t / 100, 2);
      setFormData((prev) => ({
        ...prev,
        imc: imcCalc.toFixed(2),
      }));

      let interpretation = "";
      if (formData.sexe === "Homme") {
        if (imcCalc < 18.5) interpretation = "Insuffisance pondérale";
        else if (imcCalc < 25) interpretation = "Corpulence normale";
        else if (imcCalc < 30) interpretation = "Surpoids";
        else if (imcCalc < 35) interpretation = "Obésité modérée";
        else if (imcCalc < 40) interpretation = "Obésité sévère";
        else interpretation = "Obésité morbide";
      } else if (formData.sexe === "Femme") {
        if (imcCalc < 18.5) interpretation = "Insuffisance pondérale";
        else if (imcCalc < 24) interpretation = "Corpulence normale";
        else if (imcCalc < 29) interpretation = "Surpoids";
        else if (imcCalc < 34) interpretation = "Obésité modérée";
        else if (imcCalc < 39) interpretation = "Obésité sévère";
        else interpretation = "Obésité morbide";
      }

      setFormData((prev) => ({
        ...prev,
        categorie_imc: interpretation,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        imc: "",
        categorie_imc: "",
      }));
    }
  }, [formData.taille, formData.poids, formData.sexe]);

  // Input handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validatePhone = (value) => {
    const phoneRegex = /^0[5-7][0-9]{8}$/;
    setFormData((prev) => ({ ...prev, numero_telephone: value }));
    setPhoneError(phoneRegex.test(value) ? "" : "Numéro invalide (format : 05XXXXXXXX)");
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z]{1,3}\.[a-zA-Z]+@esi-sba\.dz$/;
    setFormData((prev) => ({ ...prev, email: value }));
    setEmailError(emailRegex.test(value) ? "" : "Email invalide (ex: abc.nom@esi-sba.dz)");
  };

  const validateNumeroSecurite = (value) => {
    const regex = /^\d{0,18}$/;
    if (regex.test(value)) {
      setFormData((prev) => ({ ...prev, numero_securite_sociale: value }));
      setSecuError(value.length === 18 ? "" : "Le numéro doit contenir exactement 18 chiffres.");
    }
  };

  // Tobacco radio buttons
  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(value === "Non" && {
        [name === "fumeur" ? "nombre_cigarettes" : "" ||
         name === "chiqueur" ? "nombre_boites_chique" : "" ||
         name === "prise_autre" ? "nombre_boites_autre" : "" ||
         name === "ancien_fumeur" ? "nombre_boites_fumeur" : ""]: "",
      }),
      // Clear age_premiere_prise if all tobacco options are "Non"
      ...(value === "Non" &&
      prev.fumeur === "Non" &&
      prev.chiqueur === "Non" &&
      prev.prise_autre === "Non" &&
      prev.ancien_fumeur === "Non" &&
      name !== "ancien_fumeur" ? { age_premiere_prise: "" } : {}),
    }));
  };

  // Textarea auto-resize
  const textareasRef = useRef([]);
  const handleInput = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const textarea = textareasRef.current[index];
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Wilayas
  const wilayas = [
    { numero: "01", nom: "Adrar" },
    { numero: "02", nom: "Chlef" },
    { numero: "03", nom: "Laghouat" },
    { numero: "04", nom: "Oum El Bouaghi" },
    { numero: "05", nom: "Batna" },
    { numero: "06", nom: "Béjaïa" },
    { numero: "07", nom: "Biskra" },
    { numero: "08", nom: "Béchar" },
    { numero: "09", nom: "Blida" },
    { numero: "10", nom: "Bouira" },
    { numero: "11", nom: "Tamanrasset" },
    { numero: "12", nom: "Tébessa" },
    { numero: "13", nom: "Tlemcen" },
    { numero: "14", nom: "Tiaret" },
    { numero: "15", nom: "Tizi Ouzou" },
    { numero: "16", nom: "Alger" },
    { numero: "17", nom: "Djelfa" },
    { numero: "18", nom: "Jijel" },
    { numero: "19", nom: "Sétif" },
    { numero: "20", nom: "Saïda" },
    { numero: "21", nom: "Skikda" },
    { numero: "22", nom: "Sidi Bel Abbès" },
    { numero: "23", nom: "Annaba" },
    { numero: "24", nom: "Guelma" },
    { numero: "25", nom: "Constantine" },
    { numero: "26", nom: "Médéa" },
    { numero: "27", nom: "Mostaganem" },
    { numero: "28", nom: "M’Sila" },
    { numero: "29", nom: "Mascara" },
    { numero: "30", nom: "Ouargla" },
    { numero: "31", nom: "Oran" },
    { numero: "32", nom: "El Bayadh" },
    { numero: "33", nom: "Illizi" },
    { numero: "34", nom: "Bordj Bou Arreridj" },
    { numero: "35", nom: "Boumerdès" },
    { numero: "36", nom: "El Tarf" },
    { numero: "37", nom: "Tindouf" },
    { numero: "38", nom: "Tissemsilt" },
    { numero: "39", nom: "El Oued" },
    { numero: "40", nom: "Khenchela" },
    { numero: "41", nom: "Souk Ahras" },
    { numero: "42", nom: "Tipaza" },
    { numero: "43", nom: "Mila" },
    { numero: "44", nom: "Aïn Defla" },
    { numero: "45", nom: "Naâma" },
    { numero: "46", nom: "Aïn Témouchent" },
    { numero: "47", nom: "Ghardaïa" },
    { numero: "48", nom: "Relizane" },
    { numero: "49", nom: "Timimoun" },
    { numero: "50", nom: "Bordj Badji Mokhtar" },
    { numero: "51", nom: "Ouled Djellal" },
    { numero: "52", nom: "Béni Abbès" },
    { numero: "53", nom: "In Salah" },
    { numero: "54", nom: "In Guezzam" },
    { numero: "55", nom: "Touggourt" },
    { numero: "56", nom: "Djanet" },
    { numero: "57", nom: "El M'Ghair" },
    { numero: "58", nom: "El Menia" },
  ];

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "nom",
      "prenom",
      "date_naissance",
      "lieu_naissance",
      "adresse",
      "numero_telephone",
      "email",
      "situation_familiale",
      "Niveau", // Removed Filiere
      "numero_securite_sociale",
      "groupe_sanguin",
      "sexe",
      "taille",
      "poids",
      "frequence_cardiaque",
      "pression_arterielle",
    ];

    const tabacFields = ["fumeur", "chiqueur", "prise_autre", "ancien_fumeur"];
    const missingFields = requiredFields.filter(
      (key) => !formData[key] || formData[key].toString().trim() === ""
    );
    const unsetTabac = tabacFields.filter((key) => !formData[key]);

    if (missingFields.length > 0 || unsetTabac.length > 0 || phoneError || emailError || secuError) {
      console.log("Submission blocked:", { missingFields, unsetTabac, phoneError, emailError, secuError });
      const errors = {};
      missingFields.forEach((field) => (errors[field] = true));
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    const submissionData = {
      ...formData,
      taille: formData.taille ? parseFloat(formData.taille) : null,
      poids: formData.poids ? parseFloat(formData.poids) : null,
      frequence_cardiaque: formData.frequence_cardiaque ? parseFloat(formData.frequence_cardiaque) : null,
      pression_arterielle: formData.pression_arterielle || null,
      nombre_cigarettes: formData.fumeur === "Oui" && formData.nombre_cigarettes ? parseInt(formData.nombre_cigarettes) : null,
      nombre_boites_chique: formData.chiqueur === "Oui" && formData.nombre_boites_chique ? parseInt(formData.nombre_boites_chique) : null,
      nombre_boites_autre: formData.prise_autre === "Oui" && formData.nombre_boites_autre ? parseInt(formData.nombre_boites_autre) : null,
      nombre_boites_fumeur: formData.ancien_fumeur === "Oui" && formData.nombre_boites_fumeur ? parseInt(formData.nombre_boites_fumeur) : null,
      age_premiere_prise: formData.age_premiere_prise ? parseInt(formData.age_premiere_prise) : null,
      fumeur: formData.fumeur === "Oui",
      chiqueur: formData.chiqueur === "Oui",
      prise_autre: formData.prise_autre === "Oui",
      ancien_fumeur: formData.ancien_fumeur === "Oui",
      admission_etablissement: formData.admission_etablissement || "Oui",
      Filiere: "Informatique", // Ensure backend receives "Informatique"
    };

    console.log("Submitting data:", submissionData);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://127.0.0.1:8000/api/dossier-medicale/dossiers/etudiants/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        if (errorData.email && errorData.email.includes("dossier medical with this email already exists.")) {
          setEmailError("Cet email est déjà utilisé.");
        }
        if (errorData.numero_telephone) {
          setPhoneError("Ce numéro de téléphone est déjà utilisé.");
        }
        if (errorData.numero_securite_sociale) {
          setSecuError("Ce numéro de sécurité sociale est déjà utilisé.");
        }
        if (errorData.email || errorData.numero_telephone || errorData.numero_securite_sociale) {
          return;
        }
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      console.log("Dossier créé:", data);
      alert(`Dossier créé avec succès ! Numéro dossier: ${data.numero_dossier}`);
      navigate("/DoctorList");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Erreur lors de la création du dossier: " + error.message);
    }
  };

  // Determine if age_premiere_prise should be disabled
  const isAgeDisabled =
    formData.fumeur === "Non" &&
    formData.chiqueur === "Non" &&
    formData.prise_autre === "Non" &&
    formData.ancien_fumeur === "Non";

  return (
    <div className="container-infosdocs">
      <div className="header">
        <div className="republic">
          <h3>République Algérienne Démocratique & Populaire</h3>
          <p>Ministère de la santé et de la population</p>
        </div>
        <div className="photo">
          <h3>Dossier médical - Etudiant</h3>
          <div className="photo-upload-rectangle" onClick={handleImageClick}>
            {imagePreview ? (
              <img src={imagePreview} alt="Profil" className="uploaded-img" />
            ) : (
              <span className="upload-placeholder">
                <p>ajouter une photo</p>
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div className="form-sections">
        {/* Informations personnelles */}
        <section className="form-column">
          <h4>Informations personnelles</h4>
          <div className="nom-prenom">
            <input
              type="text"
              placeholder="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={fieldErrors.nom ? "input-error" : ""}
            />
            <input
              type="text"
              placeholder="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className={fieldErrors.prenom ? "input-error" : ""}
            />
          </div>
          <input
            type="date"
            placeholder="Date de naissance"
            name="date_naissance"
            value={formData.date_naissance}
            onChange={handleChange}
            className={fieldErrors.date_naissance ? "input-error" : ""}
          />
          <select
            name="lieu_naissance"
            value={formData.lieu_naissance}
            onChange={handleChange}
            className={fieldErrors.lieu_naissance ? "input-error" : ""}
          >
            <option value="">Sélectionnez une wilaya</option>
            {wilayas.map((wilaya) => (
              <option key={wilaya.numero} value={wilaya.nom}>
                {wilaya.numero} - {wilaya.nom}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className={fieldErrors.adresse ? "input-error" : ""}
          />
          <div className="form-container">
            <div className="form-field">
              <input
                type="tel"
                placeholder="Numéro téléphone"
                value={formData.numero_telephone}
                onChange={handleChange}
                onInput={(e) => validatePhone(e.target.value)}
                className={phoneError || fieldErrors.numero_telephone ? "input-error" : ""}
              />
              {phoneError && <p className="error-message">{phoneError}</p>}
            </div>
            <div className="form-field">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onInput={(e) => validateEmail(e.target.value)}
                className={emailError || fieldErrors.email ? "input-error" : ""}
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
          </div>
          <select
            name="situation_familiale"
            value={formData.situation_familiale}
            onChange={handleChange}
            className={fieldErrors.situation_familiale ? "input-error" : ""}
          >
            <option value="">Situation familiale</option>
            <option value="célibataire">Célibataire</option>
            <option value="marié">Marié</option>
            <option value="divorcé">Divorcé</option>
            <option value="veuf">Veuf</option>
          </select>
          <select
            name="Niveau"
            value={formData.Niveau}
            onChange={handleChange}
            className={fieldErrors.Niveau ? "input-error" : ""}
          >
            <option value="">Sélectionner le niveau</option>
            <option value="1CP">1CP</option>
            <option value="2CP">2CP</option>
            <option value="1CS">1CS</option>
            <option value="2CS">2CS</option>
            <option value="3CS">3CS</option>
          </select>
          <div className="form-field">
            <input
              type="text"
              placeholder="N° sécurité sociale"
              value={formData.numero_securite_sociale}
              onChange={(e) => validateNumeroSecurite(e.target.value)}
              className={secuError || fieldErrors.numero_securite_sociale ? "input-error" : ""}
            />
            {secuError && <p className="error-message">{secuError}</p>}
          </div>
          <select
            name="groupe_sanguin"
            value={formData.groupe_sanguin}
            onChange={handleChange}
            className={fieldErrors.groupe_sanguin ? "input-error" : ""}
          >
            <option value="">Groupe sanguin</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <select
            name="sexe"
            value={formData.sexe}
            onChange={handleChange}
            className={fieldErrors.sexe ? "input-error" : ""}
          >
            <option value="">Sexe</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </section>

        {/* Données biométriques + Antécédents personnels */}
        <section className="form-column">
          <h4>Les Données biométriques</h4>
          <div className="nom-prenom">
            <input
              type="number"
              placeholder="Taille (cm)"
              min="50"
              max="250"
              name="taille"
              value={formData.taille}
              onChange={handleChange}
              className={fieldErrors.taille ? "input-error" : ""}
            />
            <input
              type="number"
              placeholder="Poids (kg)"
              min="1"
              max="300"
              name="poids"
              value={formData.poids}
              onChange={handleChange}
              className={fieldErrors.poids ? "input-error" : ""}
            />
          </div>
          <input
            type="number"
            placeholder="Fréquence cardiaque (bpm)"
            min="30"
            max="220"
            name="frequence_cardiaque"
            value={formData.frequence_cardiaque}
            onChange={handleChange}
            className={fieldErrors.frequence_cardiaque ? "input-error" : ""}
          />
          <input
            type="text"
            placeholder="Pression artérielle (mmHg)"
            name="pression_arterielle"
            value={formData.pression_arterielle}
            onChange={handleChange}
            className={fieldErrors.pression_arterielle ? "input-error" : ""}
          />
          <input
            type="text"
            placeholder="IMC (Indice de Masse Corporelle)"
            value={formData.imc}
            readOnly
            className={fieldErrors.imc ? "input-error" : ""}
          />
          <input
            type="text"
            placeholder="Interprétation IMC"
            value={formData.categorie_imc}
            readOnly
            className={`${
              formData.categorie_imc === "Insuffisance pondérale"
                ? "imc-underweight"
                : formData.categorie_imc === "Corpulence normale"
                ? "imc-normal"
                : formData.categorie_imc === "Surpoids"
                ? "imc-overweight"
                : formData.categorie_imc === "Obésité modérée"
                ? "imc-obese-moderate"
                : formData.categorie_imc === "Obésité sévère"
                ? "imc-obese-severe"
                : formData.categorie_imc === "Obésité morbide"
                ? "imc-obese-morbid"
                : ""
            } ${fieldErrors.categorie_imc ? "input-error" : ""}`}
          />

          <h4>Antécédents personnels - Tabacs</h4>
          <div>
            {[
              {
                label: "A fumer",
                name: "fumeur",
                quantity: "nombre_cigarettes",
              },
              {
                label: "A chiquer",
                name: "chiqueur",
                quantity: "nombre_boites_chique",
              },
              {
                label: "A prise",
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
                      onChange={() => handleRadioChange(name, "Oui")}
                    />
                    Oui
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={name}
                      value="Non"
                      checked={formData[name] === "Non"}
                      onChange={() => handleRadioChange(name, "Non")}
                    />
                    Non
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Quantité/j"
                  name={quantity}
                  value={formData[quantity]}
                  onChange={handleChange}
                  disabled={formData[name] !== "Oui"}
                  className={fieldErrors[quantity] ? "input-error" : ""}
                />
              </div>
            ))}
            <div className="toggle-group">
              <label>Âge à la première prise</label>
              <input
                type="number"
                placeholder="Âge"
                name="age_premiere_prise"
                value={formData.age_premiere_prise}
                onChange={handleChange}
                disabled={isAgeDisabled}
                className={fieldErrors.age_premiere_prise ? "input-error" : ""}
              />
            </div>
          </div>
        </section>

        {/* Antécédents médico-chirurgicaux */}
        <section className="form-column">
          <h4>Antécédents médico-chirurgicaux</h4>
          <div className="text-area">
            {[
              { label: "Affections congénitales :", name: "affections_congenitales" },
              { label: "Maladies générales", name: "maladies_generales" },
              { label: "Interventions chirurgicales (reporter les dates)", name: "interventions_chirurgicales" },
              { label: "Réactions allergiques aux médicaments (Lesquels ?)", name: "reactions_allergiques" },
            ].map(({ label, name }, index) => (
              <div key={index} className="labeandtext">
                <label htmlFor={`textarea-${index}`}>{label}</label>
                <textarea
                  id={`textarea-${index}`}
                  name={name}
                  value={formData[name]}
                  onChange={(e) => handleInput(e, index)}
                  ref={(el) => (textareasRef.current[index] = el)}
                  rows={1}
                  style={{ overflow: "hidden", resize: "none" }}
                  className={fieldErrors[name] ? "input-error" : ""}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="addreturn">
        <div className="back-container" onClick={() => navigate("/DoctorList")}>
          <IoArrowBackCircle className="IoArrowBackCircle" />
          <span className="back-text">Retour</span>
        </div>
      <button className="save-button" onClick={handleSubmit}>
          Sauvegarder
        </button>
     </div> 
    </div>
  );
}

export default CreateFormPatient;