import { Route, Routes } from 'react-router-dom';

import AdminPage from './components/Admin_Page.jsx';
import Appointment from './components/Appointment';
import AssistantList from './components/AssistantList';
import AssitantHome from './components/AssitantHome';
import Calendar from './components/Calender';
import CancelAppointment from './components/CancelAppointment.jsx';
import CreateFormATS from './components/CreateFormATS';
import CreateFormEnseignant from './components/CreateFormEnseignant';
import CreateFormPatient from './components/CreateFormPatient';
import Demandes from './components/Demandes.jsx';
import Doctorhome from './components/Doctorhome';
import DoctorList from './components/DoctorList';
import Forgot_Password from './components/Forgot_Password';
import Forgot_Password1 from './components/Forgot_Password1';
import Forgot_Password2 from './components/Forgot_Password2';
import MedicalPrescription from './components/MedicalPrescription';
import ModifyFormATS from './components/ModifyFormATS';
import ModifyFormEnseignant from './components/ModifyFormEnseignant';
import ModifyFormEtudiant from './components/ModifyFormEtudiant';
import Notification from './components/Notification.jsx';
import PatientList from './components/PatientList.jsx';
import PatientListeDemandes from './components/PatientListeDemandes.jsx';
import PatientSideBare from './components/PatientSideBare.jsx';
import PrescriptionList from './components/PrescriptionList';
import PrescriptionListAssistant from './components/PrescriptionListAssistant';
import PrescriptionPrint from './components/PrescriptionPrint';
import Profile from './components/profile';
import ReadOnlyATS from './components/ReadOnlyAts';
import ReadOnlyStudent from './components/ReadOnlyStudent';
import ReadOnlyTeacher from './components/ReadOnlyTeacher';
import SeConnecter from './components/seConnecter';
import Signup_User from './components/Signup_User';
import Sinscrire from './components/sinscrire';
import TAkeAppointment from './components/TAkeAppointment.jsx';
import ConsultationList from './components/ConsultationList.jsx';
import ConsultationView from './components/ConsultationView.jsx';
import AddConsultation from './components/AddConsultation.jsx';
import AddDisease from './components/AddDisease.jsx';
import VerifyEmail from './components/VerifyEmail'; // Assuming you have this component
import DirectorSideBare from './components/DirectorSideBare.jsx';
import DirectorDashboard from './components/DirectorDashboard.jsx';

const App = () => {
  return (
    <>
    <DirectorDashboard />
    {/* <Routes>
      <Route path="/" element={<SeConnecter />} />
      <Route path="/home" element={<Doctorhome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sinscrire" element={<Sinscrire />} />
      <Route path="/PatientList" element={<PatientList />} />
      <Route path="/CreateFormPatient" element={<CreateFormPatient />} />
      <Route path="/verify-email/:uidb64/:token" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<Forgot_Password />} />
      <Route path="/enter-code" element={<Forgot_Password1 />} />
      <Route path="/reset-password" element={<Forgot_Password2 />} />
      <Route path="/Admin_Page" element={<AdminPage />} />
      <Route path="/signup_user" element={<Signup_User />} />
      <Route path="/Assitanthome" element={<AssitantHome />} />
      <Route path="/Notification" element={<Notification />} />
      <Route path="/AssistantList" element={<AssistantList />} />
      <Route path="/DoctorList" element={<DoctorList />} />
      <Route path="/CreateFormEnseignant" element={<CreateFormEnseignant />} />
      <Route path="/CreateFormATS" element={<CreateFormATS />} />
      <Route path="/ModifyFormEtudiant/:id" element={<ModifyFormEtudiant />} />
      <Route path="/ModifyFormEnseignant/:id" element={<ModifyFormEnseignant />} />
      <Route path="/ModifyFormATS/:id" element={<ModifyFormATS />} />
      <Route path="/ReadOnlyStudent/:id" element={<ReadOnlyStudent />} />
      <Route path="/ReadOnlyTeacher/:id" element={<ReadOnlyTeacher />} />
      <Route path="/ReadOnlyATS/:id" element={<ReadOnlyATS />} />
      <Route path="/dossier/:id/student" element={<ReadOnlyStudent />} />
      <Route path="/dossier/:id/teacher" element={<ReadOnlyTeacher />} />
      <Route path="/dossier/:id/ats" element={<ReadOnlyATS />} />
      <Route path="/Demandes" element={<Demandes />} />
      <Route path="/Appointment" element={<Appointment />} />
      <Route path="/PrescriptionList/:id/" element={<PrescriptionList />} />
      <Route path="/MedicalPrescription" element={<MedicalPrescription />} />
      <Route path="/PrescriptionPrint/:id/" element={<PrescriptionPrint />} />
      <Route path="/PrescriptionList" element={<PrescriptionList />} />
      <Route path="/PrescriptionListAssistant/:id/" element={<PrescriptionListAssistant />} />
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/CancelAppointment" element={<CancelAppointment />} />
      <Route path="/TAkeAppointment" element={<TAkeAppointment />} />
      <Route path="/PatientSideBare" element={<PatientSideBare />} />
      <Route path="/ConsultationList" element={<ConsultationList />} />
      <Route path="/AddConsultation" element={<AddConsultation />} />
      <Route path="/ConsultationView" element={<ConsultationView />} />
      <Route path="/AddDisease" element={<AddDisease />} />
    </Routes> */}
    </>
  );
};

export default App;
