import { faker } from "@faker-js/faker";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Administrador" | "Empleado" | "Cliente" | "Proveedor";
};

export type Task = {
  id: string;
  name: string;
  category: string;
  progress: number;
  status: "Pendiente" | "En Proceso" | "Completado";
};

export type Incident = {
  id: string;
  category: string;
  description: string;
  status: "Pendiente" | "En Proceso" | "Resuelto";
  createdAt: Date;
};

export type Claim = {
  id: string;
  clientName: string;
  description: string;
  status: "Nuevo" | "En Revisión" | "Resuelto";
  createdAt: Date;
};

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement([
      "Administrador",
      "Empleado",
      "Cliente",
      "Proveedor",
    ]),
  }));
};

export const generateTasks = (count: number): Task[] => {
  const categories = [
    "Electricidad",
    "Plomería",
    "Albañilería",
    "Pintura",
    "Carpintería",
  ];
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      "Instalación de bandejas",
      "Tendido de cables",
      "Colocación de luminarias",
      "Instalación de tomacorrientes",
      "Montaje de tableros",
    ]),
    category: faker.helpers.arrayElement(categories),
    progress: faker.number.int({ min: 0, max: 100 }),
    status: faker.helpers.arrayElement([
      "Pendiente",
      "En Proceso",
      "Completado",
    ]),
  }));
};

export const generateIncidents = (count: number): Incident[] => {
  const categories = [
    "Electricidad",
    "Plomería",
    "Albañilería",
    "Pintura",
    "Carpintería",
  ];
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    category: faker.helpers.arrayElement(categories),
    description: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(["Pendiente", "En Proceso", "Resuelto"]),
    createdAt: faker.date.recent(),
  }));
};

export const generateClaims = (count: number): Claim[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    clientName: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(["Nuevo", "En Revisión", "Resuelto"]),
    createdAt: faker.date.recent(),
  }));
};

export const mockData = {
  users: generateUsers(20),
  tasks: generateTasks(30),
  incidents: generateIncidents(15),
  claims: generateClaims(10),
};
