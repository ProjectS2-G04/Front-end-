import React, { useRef, useState ,useEffect } from "react";
import "./CreateForm.css";

function CreateFormPatient() {
  {/* ..............Pour charger une photo du Pc du l'utilisateure....................  */}
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
   {/*................... Pour calculer le MC.........................   */}
   const [taille, setTaille] = useState("");
   const [poids, setPoids] = useState("");
   const [imc, setImc] = useState("");
   const [categorieImc, setCategorieImc] = useState("");
   const [sexe, setSexe] = useState(""); 
   useEffect(() => {
    const t = parseFloat(taille);
    const p = parseFloat(poids);
    
    if (t > 0 && p > 0) {
      const imcCalc = p / Math.pow(t / 100, 2); // cm -> m
      setImc(imcCalc.toFixed(2));

      // Interprétation de l'IMC selon le sexe
      let interpretation = "";
      if (sexe === "Homme") {
        if (imcCalc < 18.5) interpretation = "Insuffisance pondérale";
        else if (imcCalc < 25) interpretation = "Corpulence normale";
        else if (imcCalc < 30) interpretation = "Surpoids";
        else if (imcCalc < 35) interpretation = "Obésité modérée";
        else if (imcCalc < 40) interpretation = "Obésité sévère";
        else interpretation = "Obésité morbide";
      } else if (sexe === "Femme") {
        if (imcCalc < 18.5) interpretation = "Insuffisance pondérale";
        else if (imcCalc < 24) interpretation = "Corpulence normale";
        else if (imcCalc < 29) interpretation = "Surpoids";
        else if (imcCalc < 34) interpretation = "Obésité modérée";
        else if (imcCalc < 39) interpretation = "Obésité sévère";
        else interpretation = "Obésité morbide";
      }

      setCategorieImc(interpretation);
    } else {
      setImc("");
      setCategorieImc("");
    }
  }, [taille, poids, sexe ,categorieImc]);

 {/*................... Quand user cliquer sur non cela empecher l'ecriture dans la zone du text........................   */}
  const [reponses, setReponses] = useState({
    "A fumer": "",
    "A chiquer": "",
    "A prise": "",
    "Ancien fumeur": "",
  });

  // Fonction pour gérer les changements de réponses
  const handleRadioChange = (label, value) => {
    setReponses((prevReponses) => ({
      ...prevReponses,
      [label]: value, // Met à jour la réponse pour le label spécifique
    }));
  };
  {/*................... C'est pour optimiser react dans les text ares au lieu de faire 4 test are je met juste un seule text areas 
    ........................   */}
  const labels = [
    "Affections congénitales :",
    "Maladies générales",
    "Interventions chirurgicales (reporter les dates)",
    "Réactions allergiques aux médicaments (Lesquels ?)"
  ];

  {/*...................la pour l'aumentation de la zone du text  ........................   */}
    
  const textareasRef = useRef([]);
  const handleInput = (e, index) => {
    const textarea = textareasRef.current[index];
    if (textarea) {
      textarea.style.height = "auto"; // reset
      textarea.style.height = textarea.scrollHeight + "px"; // adjust
    }
  };
    {/*...................La pour chosire lieu du naissance  ........................   */}
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
      { numero: "58", nom: "El Menia" }
    ]; 
    {/* pour les restriction qui existe sur le numero de telephone et email  */}
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
  
    const validatePhone = (value) => {
      const phoneRegex = /^0[5-7][0-9]{8}$/;
      setPhone(value);
      setPhoneError(
        phoneRegex.test(value) ? "" : "Numéro invalide (format : 05XXXXXXXX)"
      );
    };
  
    const validateEmail = (value) => {
      const emailRegex = /^[a-zA-Z]{1,3}\.[a-zA-Z]+@esi-sba\.dz$/;
      setEmail(value);
      setEmailError(
        emailRegex.test(value)
          ? ""
          : "Email invalide (ex: abc.nom@esi-sba.dz)"
      );
    };
    {/* Indication des ereure si il existe des champs nn pa encore remplie ou cocher  */}
    const [formError, setFormError] = useState("");
    useEffect(() => {
      const inputs = document.querySelectorAll("input:not([type='file']):not([type='radio']), select, textarea");
    
      let valid = true;
    
      inputs.forEach((input) => {
        if (!input.disabled && input.value.trim() === "") {
          valid = false;
        }
      });
    
      const tabacLabels = ["A fumer", "A chiquer", "A prise", "Ancien fumeur"];
      for (let label of tabacLabels) {
        const radios = document.getElementsByName(label);
        const isChecked = Array.from(radios).some(radio => radio.checked);
        if (!isChecked) {
          valid = false;
          break;
        }
      }
    
      if (!valid) {
        setFormError("❗Veuillez remplir tous les champs et répondre à toutes les questions.");
      } else {
        setFormError("");
      }
    }, [taille, poids, sexe, phone, email, reponses]);
    

    const formErrorRef = useRef(null);
    useEffect(() => {
      if (formError && formErrorRef.current) {
        formErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, [formError]);
    const validerFormulaire = () => {
      const inputs = document.querySelectorAll("input:not([type='file']):not([type='radio']), select, textarea");
      let valid = true;
    
      inputs.forEach((input) => {
        if (!input.disabled && input.value.trim() === "") {
          valid = false;
        }
      });
    
      const tabacLabels = ["A fumer", "A chiquer", "A prise", "Ancien fumeur"];
      for (let label of tabacLabels) {
        const radios = document.getElementsByName(label);
        const isChecked = Array.from(radios).some(radio => radio.checked);
        if (!isChecked) {
          valid = false;
          break;
        }
      }
    
      if (!valid) {
        setFormError("❗Veuillez remplir tous les champs et répondre à toutes les questions.");
        setTimeout(() => {
          if (formErrorRef.current) {
            formErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
        return false;
      } else {
        setFormError("");
        return true;
      }
    };
    {/* le numro de dossier soit un nombre  */}
    const [numeroDossier, setNumeroDossier] = useState("");
    {/* le numro de securite   */}
    const [numeroSecurite, setNumeroSecurite] = useState("");
    const [secuError, setSecuError] = useState("");
    const validateNumeroSecurite = (value) => {
      const regex = /^\d{0,18}$/; // maximum 18 chiffres autorisés pendant la saisie
      if (regex.test(value)) {
        setNumeroSecurite(value);
        if (value.length === 18) {
          setSecuError(""); // valide
        } else {
          setSecuError("Le numéro doit contenir exactement 18 chiffres.");
        }
      }
    };
        
  return (
    <div className="container-infosdocs">
      <div className="header">
         <div className="republic">
           <h3>République Algérienne Démocratique & Populaire</h3>
           <p>Ministére de la santé et de la population</p>
          </div>
          <div className="photo">
             <h3>Dossier médical - Etudiant</h3>
             <div className="photo-upload-rectangle" onClick={handleImageClick}>
          {imagePreview ? (
            <img src={imagePreview} alt="Profil" className="uploaded-img" />
          ) : (
            <span className="upload-placeholder"><p>ajouter une photo</p></span>
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
      {formError && (
         <div className="global-error-message" ref={formErrorRef}>
         {formError}
          </div>
)}

      <div className="form-sections">
        <section className="form-column">
          <h4>Informations personnelles</h4>
          <input type="text" placeholder="N° dossier"
           value={numeroDossier}  onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setNumeroDossier(value);
             }
            }}
          />
          <div className="nom-prenom">
            <input type="text" placeholder="Nom" />
           <input type="text" placeholder="Prénom" />
          </div>
          <input type="date" placeholder="Date de naissance" />
          <select name="lieu-naissance" id="lieu-naissance">
          <option value="">Sélectionnez une wilaya</option>
           {wilayas.map((wilaya) => (
           <option key={wilaya.numero} value={wilaya.nom}>
          {wilaya.numero} - {wilaya.nom}
         </option>
  ))}
</select>
          <input type="text" placeholder="Adresse" />
          <div className="form-container">
         <div className="form-field">
          <input
          type="tel"
          placeholder="Numéro téléphone"
          value={phone}
          onChange={(e) => validatePhone(e.target.value)}
          className={phoneError ? "input-error" : ""}
         />
        {phoneError && <p className="error-message">{phoneError}</p>}
      </div>

      <div className="form-field">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => validateEmail(e.target.value)}
          className={emailError ? "input-error" : ""}
        />
        {emailError && <p className="error-message">{emailError}</p>}
      </div>
    </div>
          <input type="text" placeholder="Service" />
          <select> 
            <option>Situation familiale</option>
            <option>marié (M)</option>
            <option>pacsé (O)</option>
            <option>divorcé (D)</option>
            <option> séparé (D)</option>
            <option> célibataire (C) </option>
            <option> veuf (V)</option>
          </select>
          <input type="text" placeholder="Admis(e) à l'établissement" />
          <input type="text" placeholder="Filière" />
          <select>
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
              value={numeroSecurite}
              onChange={(e) => validateNumeroSecurite(e.target.value)}
              className={secuError ? "input-error" : ""}
          />
            {secuError && <p className="error-message">{secuError}</p>}
          </div>
          <select>
            <option>Groupe sanguin</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <select value={sexe} onChange={(e) => setSexe(e.target.value)}>
            <option value=''>Sexe</option>
            <option>Homme</option>
            <option>Femme</option>
          </select>
        </section>

        {/* Données biométriques + Antécédents personnels */}
        <section className="form-column">
          <h4>Les Données biométriques</h4>
          <div className="nom-prenom">
          <input type="number" placeholder="Taille (cm)" min="50" max="250"  value={taille}
          onChange={(e) => setTaille(e.target.value)} />
          <input type="number" placeholder="Poids (kg)" min="1" max="300"  onChange={(e) => setPoids(e.target.value)} />
          </div>
          <input type="number" placeholder="Fréquence cardiaque (bpm)" min="30" max="220" />
          <input type="number" placeholder="Pression artérielle (mmHg)" min="50" max="200" />

          <input
          type="text"
          placeholder="IMC (Indice de Masse Corporelle)"
          value={imc}
          readOnly
        />
        <input
          type="text"
          placeholder="Interprétation IMC"
          value={categorieImc}
          readOnly
        />

          <h4>Antécédents personnels - Tabacs</h4>
          <div>
      {["A fumer", "A chiquer", "A prise", "Ancien fumeur"].map((label, i) => (
        <div key={i} className="toggle-group">
          <label>{label}</label>
          <div>
            <label>
              <input
                type="radio"
                name={label}
                value="Oui"
                checked={reponses[label] === "Oui"}
                onChange={() => handleRadioChange(label, "Oui")}
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name={label}
                value="Non"
                checked={reponses[label] === "Non"}
                onChange={() => handleRadioChange(label, "Non")}
              />
              Non
            </label>
          </div>
          {/* Le champ de texte est désactivé si "Non" est sélectionné */}
          <input
            type="text"
            placeholder="Quantité/j"
            disabled={reponses[label] === "Non"} // Désactive si "Non" est sélectionné
          />
        </div>
      ))}
    </div>
        </section>

        {/* Antécédents médico-chirurgicaux */}
        <section className="form-column">
          <h4>Antécédents médico-chirurgicaux</h4>
          <div className="text-area">
      {labels.map((label, index) => (
        <div key={index} className="labeandtext">
          <label htmlFor={`textarea-${index}`}>{label}</label>
          <textarea
            id={`textarea-${index}`}
            ref={(el) => (textareasRef.current[index] = el)}
            rows={1}
            onInput={(e) => handleInput(e, index)}
            style={{
              overflow: 'hidden',
              resize: 'none'
            }}
          />
        </div>
      ))}
    </div>
        </section>
      </div>

      <button  className="save-button" onClick={(e) => {
        e.preventDefault();
        if (validerFormulaire()) {
          alert("Formulaire validé avec succès !");
        }
      }} >  Sauvegarder </button>
    </div>
  )
}

export default CreateFormPatient