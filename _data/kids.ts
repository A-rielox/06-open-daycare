export type ParentStatus = "active" | "pending";

export interface Parent {
  id: string;
  name: string;
  initial: string;
  role: string;
  status: ParentStatus;
}

export interface Kid {
  id: string;
  name: string;
  initial: string;
  avatarBg: string;
  avatarText: string;
  age: number;
  room: string;
  birthDateLabel: string;
  joinedLabel: string;
  allergies: string[];
  allergyNote?: string;
  parents: Parent[];
}

export interface KidsRoomHeader {
  eyebrow: string;
  title: string;
  room: string;
}

export const kidsRoomHeader: KidsRoomHeader = {
  eyebrow: "GESTIÓN",
  title: "Niños",
  room: "SALA SOLES",
};

export const kids: Kid[] = [
  {
    id: "mateo",
    name: "Mateo Fernández",
    initial: "M",
    avatarBg: "#A9D9E8",
    avatarText: "#1F7A93",
    age: 3,
    room: "Soles",
    birthDateLabel: "12 mar 2022",
    joinedLabel: "feb 2025",
    allergies: ["MANÍ"],
    allergyNote:
      "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    parents: [
      {
        id: "lucia",
        name: "Lucía Fernández",
        initial: "L",
        role: "Mamá",
        status: "active",
      },
      {
        id: "diego",
        name: "Diego Fernández",
        initial: "D",
        role: "Papá",
        status: "pending",
      },
    ],
  },
  {
    id: "sofia",
    name: "Sofía Méndez",
    initial: "S",
    avatarBg: "#F4B8CC",
    avatarText: "#C44A7A",
    age: 2,
    room: "Soles",
    birthDateLabel: "5 ago 2023",
    joinedLabel: "ene 2025",
    allergies: [],
    parents: [
      {
        id: "paula",
        name: "Paula Méndez",
        initial: "P",
        role: "Mamá",
        status: "active",
      },
    ],
  },
  {
    id: "benjamin",
    name: "Benjamín Ruiz",
    initial: "B",
    avatarBg: "#B9DEC4",
    avatarText: "#3E8B62",
    age: 3,
    room: "Soles",
    birthDateLabel: "21 ene 2023",
    joinedLabel: "mar 2025",
    allergies: [],
    parents: [
      {
        id: "martin",
        name: "Martín Ruiz",
        initial: "M",
        role: "Papá",
        status: "active",
      },
      {
        id: "carla",
        name: "Carla Gómez",
        initial: "C",
        role: "Mamá",
        status: "active",
      },
    ],
  },
  {
    id: "valentina",
    name: "Valentina Soto",
    initial: "V",
    avatarBg: "#F4DC8E",
    avatarText: "#9A7B1E",
    age: 2,
    room: "Soles",
    birthDateLabel: "30 may 2024",
    joinedLabel: "feb 2025",
    allergies: [],
    parents: [],
  },
  {
    id: "tomas",
    name: "Tomás Díaz",
    initial: "T",
    avatarBg: "#C9B6E8",
    avatarText: "#7B5FC0",
    age: 3,
    room: "Soles",
    birthDateLabel: "14 nov 2022",
    joinedLabel: "feb 2025",
    allergies: ["LACTOSA"],
    allergyNote:
      "Intolerancia a la lactosa. Evitar lácteos; ofrecer bebida vegetal.",
    parents: [
      {
        id: "andres",
        name: "Andrés Díaz",
        initial: "A",
        role: "Papá",
        status: "active",
      },
    ],
  },
  {
    id: "emma",
    name: "Emma Castro",
    initial: "E",
    avatarBg: "#F4B8CC",
    avatarText: "#C44A7A",
    age: 2,
    room: "Soles",
    birthDateLabel: "9 feb 2024",
    joinedLabel: "ene 2025",
    allergies: [],
    parents: [
      {
        id: "julieta",
        name: "Julieta Castro",
        initial: "J",
        role: "Mamá",
        status: "active",
      },
    ],
  },
  {
    id: "lucas",
    name: "Lucas Romero",
    initial: "L",
    avatarBg: "#A9D9E8",
    avatarText: "#1F7A93",
    age: 3,
    room: "Soles",
    birthDateLabel: "2 jul 2023",
    joinedLabel: "mar 2025",
    allergies: [],
    parents: [
      {
        id: "ramiro",
        name: "Ramiro Romero",
        initial: "R",
        role: "Papá",
        status: "active",
      },
    ],
  },
  {
    id: "olivia",
    name: "Olivia Vega",
    initial: "O",
    avatarBg: "#B9DEC4",
    avatarText: "#3E8B62",
    age: 2,
    room: "Soles",
    birthDateLabel: "18 sep 2024",
    joinedLabel: "feb 2025",
    allergies: [],
    parents: [
      {
        id: "marina",
        name: "Marina Vega",
        initial: "M",
        role: "Mamá",
        status: "active",
      },
    ],
  },
];

export function getKidById(id: string): Kid | undefined {
  return kids.find((kid) => kid.id === id);
}
