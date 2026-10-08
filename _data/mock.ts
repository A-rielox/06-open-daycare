export type PostKind = "achievement" | "activity" | "announcement";

export interface RoomHeader {
  room: string;
  greetingName: string;
  childCount: number;
  dateLabel: string;
}

export interface Author {
  id: string;
  name: string;
  initial: string;
  role: string;
  room: string;
}

export interface Post {
  id: string;
  kind: PostKind;
  author: Author;
  time: string;
  publishedBy: string;
  audience: string;
  body: string;
  likes: number;
  comments: number;
  photoLabel?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface PostKindStyle {
  label: string;
  bubbleBg: string;
  dot: string;
  text: string;
}

export const currentUser: Author = {
  id: "caro",
  name: "Caro Giménez",
  initial: "C",
  role: "Maestra",
  room: "Soles",
};

export const roomHeader: RoomHeader = {
  room: "Sala Soles",
  greetingName: "Caro",
  childCount: 12,
  dateLabel: "martes 17 jun",
};

export const navItems: NavItem[] = [
  { id: "feed", label: "Feed", href: "/" },
  { id: "children", label: "Niños", href: "/kids" },
  { id: "notices", label: "Avisos", href: "#" },
  { id: "account", label: "Mi cuenta", href: "#" },
];

const mateo: Author = {
  id: "mateo",
  name: "Mateo",
  initial: "M",
  role: "Sala Soles",
  room: "Soles",
};

const generalAnnouncement: Author = {
  id: "general",
  name: "Anuncio general",
  initial: "A",
  role: "Sala Soles",
  room: "Soles",
};

export const posts: Post[] = [
  {
    id: "post-1",
    kind: "achievement",
    author: mateo,
    time: "14:20",
    publishedBy: "publicado por vos",
    audience: "Para: familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "post-2",
    kind: "activity",
    author: mateo,
    time: "09:40",
    publishedBy: "publicado por vos",
    audience: "Para: familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    likes: 5,
    comments: 2,
    photoLabel: "Foto · pintando con témperas",
  },
  {
    id: "post-3",
    kind: "announcement",
    author: generalAnnouncement,
    time: "07:50",
    publishedBy: "publicado por vos",
    audience: "Para: toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];

export const postKindStyles: Record<PostKind, PostKindStyle> = {
  achievement: {
    label: "LOGRO",
    bubbleBg: "#CFEBD8",
    dot: "#3E9B6C",
    text: "#3E9B6C",
  },
  activity: {
    label: "ACTIVIDAD",
    bubbleBg: "#C7E7F1",
    dot: "#2E89A6",
    text: "#2E89A6",
  },
  announcement: {
    label: "ANUNCIO",
    bubbleBg: "#CCD8F4",
    dot: "#4E72C8",
    text: "#4E72C8",
  },
};
