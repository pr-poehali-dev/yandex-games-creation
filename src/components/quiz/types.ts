export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    character: string;
  }[];
}

export interface Character {
  id: string;
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  color: string;
  image: string;
}
