export interface Pokemon {
  internalId: number;
  id: number;
  level: number;
  isShiny: boolean;
  form?: string;
  gender: "female" | "male" | "genderless";
}
