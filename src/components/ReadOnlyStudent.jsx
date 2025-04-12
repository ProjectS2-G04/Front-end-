import React, { useRef, useState, useEffect } from "react";
import "./CreateForm.css";

function ReadOnlyStudent() {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
  
    const [taille, setTaille] = useState("");
    const [poids, setPoids] = useState("");
    const [imc, setImc] = useState("");
    const [categorieImc, setCategorieImc] = useState("");
    const [sexe, setSexe] = useState("");
  
    const [reponses, setReponses] = useState({
      "A fumer": "",
      "A chiquer": "",
      "A prise": "",
      "Ancien fumeur": "",
    });
  
    const labels = [
      "Affections congénitales :",
      "Maladies générales",
      "Interventions chirurgicales (reporter les dates)",
      "Réactions allergiques aux médicaments (Lesquels ?)"
    ];
  
    const textareasRef = useRef([]);
    const [textareaValues] = useState([
      "Aucune",
      "Diabète",
      "Appendicectomie en 2019",
      "Aucune"
    ]);
  
    const wilayas = [
      { numero: "16", nom: "Alger" },
      { numero: "31", nom: "Oran" }
    ];
  
    const [phone] = useState("0551234567");
    const [email] = useState("abc.nom@esi-sba.dz");
    const [numeroDossier] = useState("123456");
    const [numeroSecurite] = useState("123456789012345678");
  
    useEffect(() => {
      const t = parseFloat(taille);
      const p = parseFloat(poids);
  
      if (t > 0 && p > 0) {
        const imcCalc = p / Math.pow(t / 100, 2);
        setImc(imcCalc.toFixed(2));
  
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
    }, [taille, poids, sexe]);
  
    useEffect(() => {
      setTaille("170");
      setPoids("65");
      setSexe("Homme");
      setReponses({
        "A fumer": "Non",
        "A chiquer": "Non",
        "A prise": "Non",
        "Ancien fumeur": "Oui"
      });
    }, []);
    return (
        <div className="container-infosdocs">
          <div className="header">
            <div className="republic">
              <h3>République Algérienne Démocratique & Populaire</h3>
              <p>Ministére de la santé et de la population</p>
            </div>
            <div className="photo">
              <h3>Dossier médical - Etudiant</h3>
              <div className="photo-upload-rectangle">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profil" className="uploaded-img" />
                ) : (
                  <span className="upload-placeholder"><p>Photo</p></span>
                )}
              </div>
            </div>
          </div>
    
          <div className="form-sections">
            <section className="form-column">
              <h4>Informations personnelles</h4>
              <label> Numero de dossier </label>
              <input type="text" value={numeroDossier} name readOnly />
              <div className="nom-prenom">
              <label> Nom </label>
                <input type="text" value="Doe" readOnly />
                <label> Prenom </label>
                <input type="text" value="John" readOnly />
              </div>
              <label> Date de naissance </label>
              <input type="date" value="2000-01-01" readOnly />
              <label> Lieu de naissance  </label>
              <select disabled value="Alger">
                <option value="Alger">16 - Alger</option>
              </select>
              <label> Adresse </label>
              <input type="text" value="Rue Principale, Alger" readOnly />
              <label> Numéro du télèphone </label>
              <input type="tel" value={phone} readOnly />
              <label> Email </label>
              <input type="email" value={email} readOnly />
              <label> Service </label>
              <input type="text" value="Service ABC" readOnly />
              <label> Situation familiale  </label>
              <select disabled value="célibataire (C)">
                <option value="célibataire (C)">célibataire (C)</option>
              </select>
              <label> Admis a l'etablissment </label>
              <input type="text" value="ESI-SBA" readOnly />
              <label> Filière </label>
              <input type="text" value="Informatique" readOnly />
              <label> Niveau </label>
              <select disabled value="2CP">
                <option value="2CP">2CP</option>
              </select>
              <label> Numéro de sécurité sociale  </label>
              <input type="text" value={numeroSecurite} readOnly />
              <label> Groupe sanguin</label>
              <select disabled value="A+">
                <option value="A+">A+</option>
              </select>
              <label> Sexe </label>
              <select disabled value={sexe}>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </section>
    
            <section className="form-column">
              <h4>Les Données biométriques</h4>
              <div className="nom-prenom">
              <label> Taille  </label>
                <input type="number" value={taille} readOnly />
                <label> Poids  </label>
                <input type="number" value={poids} readOnly />
              </div>
              <label> Fréquence cardiaque  </label>
              <input type="number" value="72" readOnly />
              <label> Pression atérielle </label>
              <input type="number" value="120" readOnly />
              <label> IMC (indice de masse Corporelle) </label>
              <input type="text" value={imc} readOnly />
              <label> Interprétation IMC</label>
              <input type="text" value={categorieImc} readOnly />
    
              <h4>Antécédents personnels - Tabacs</h4>
              {Object.keys(reponses).map((label, i) => (
                <div key={i} className="toggle-group">
                  <label>{label}</label>
                  <div>
                    <label>
                      <input type="radio" name={label} checked={reponses[label] === "Oui"} disabled /> Oui
                    </label>
                    <label>
                      <input type="radio" name={label} checked={reponses[label] === "Non"} disabled /> Non
                    </label>
                  </div>
                  <input type="text" value="" disabled />
                </div>
              ))}
            </section>
    
            <section className="form-column">
              <h4>Antécédents médico-chirurgicaux</h4>
              <div className="text-area">
                {labels.map((label, index) => (
                  <div key={index} className="labeandtext">
                    <label>{label}</label>
                    <textarea
                      value={textareaValues[index]}
                      disabled
                      rows={1}
                      style={{ overflow: "hidden", resize: "none" }}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      );
}

export default ReadOnlyStudent
