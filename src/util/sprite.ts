import { getCurrentTime } from "./time";

export const GENDER_DIFFERENCE_ID_ON_FRONT = [
  3, 12, 19, 20, 25, 26, 41, 42, 44, 45, 64, 65, 84, 85, 97, 111, 112, 118, 119,
  123, 129, 130, 154, 165, 166, 178, 185, 186, 190, 194, 195, 198, 202, 203,
  207, 208, 212, 214, 215, 217, 221, 224, 229, 232, 256, 257, 267, 269, 272,
  274, 275, 307, 308, 315, 316, 317, 322, 323, 332, 350, 369, 396, 397, 398,
  399, 400, 401, 402, 403, 404, 405, 407, 415, 417, 424, 443, 444, 445, 449,
  450, 453, 454, 456, 457, 459, 460, 461, 464, 465, 473,
];

export const GENDER_DIFFERENCE_ID_WITHOUT_FRONT = [
  3, 25, 154, 202, 208, 214, 415, 443, 444, 445, 449, 450,
];

export function getPokemonSpriteUrl(
  id: number,
  facing: "front" | "left" | "right" | "down",
  isShiny: boolean,
  frame: 1 | 2,
  gender?: "female" | "male" | "genderless",
  form?: string
) {
  // public/sprite/pokemon/{id}_{facing}_shiny_{gender}_{form}_{frame}.png
  let url = `${process.env.PUBLIC_URL}/sprite/pokemon/${id}_${facing}_`;

  if (id === 421 && facing === "front") {
    if (getCurrentTime() === "day") {
      form = "shiny";
    } else {
      form = "overcast";
    }
  }

  if (isShiny) {
    url += "shiny_";
  }

  if (facing === "front" && GENDER_DIFFERENCE_ID_ON_FRONT.includes(id)) {
    url += `${gender}_`;
  } else if (GENDER_DIFFERENCE_ID_WITHOUT_FRONT.includes(id)) {
    url += `${gender}_`;
  }

  if (!!form) {
    url += `${form}_`;
  }

  url += `${frame}`;

  return url + ".png";
}

export function getItemSpriteUrl(itemType: number) {
  // public/sprite/item/{type}.png
  return `${process.env.PUBLIC_URL}/sprite/item/${itemType}.png`;
}
