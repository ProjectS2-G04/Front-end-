
import { Outlet } from 'react-router-dom';
import DoctorSideBare from './DoctorSideBare';

export default function DoctorLayout() {
  return (
    <div className="flex overflow-x-hidden">
      <DoctorSideBare />
      <div className="ml-64 p-6 w-full">
        <Outlet />
      </div>
    </div>
  );
}