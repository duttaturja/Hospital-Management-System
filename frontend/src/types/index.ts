export type Role = 'Patient' | 'Doctor' | 'Nurse' | 'Staff' | 'Admin';

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  access: string;
  refresh: string;
}

export interface DoctorProfile {
  user: string; // API returns StringRelatedField
  specialization: string;
  experience: number;
  fees: string;
  salary: string;
}

export interface PatientProfile {
  id: number;
  user: number; // ID
  date_of_birth: string;
  address: string;
  contact_number: string;
  emergency_contact: string;
  medical_history: string;
}

export interface Appointment {
  id: number;
  patient: number;
  doctor: number;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  prescription?: string;
}

export interface Invoice {
  id: number;
  patient: number;
  issued_date: string;
  total_amount: string;
  description: string;
}