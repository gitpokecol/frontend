import { API_ENDPOINTS } from "../constant/api";
import {
  BagItemsResponse,
  DailyItemResponse,
  GithubAuthCallbackResponse,
  PokedexResponse,
  PokemomsResponse,
  UseItemResponse,
} from "../type/apis";
import { PokedexItem } from "../type/pokedex";
import axiosInstance from "./axiosInstance";

export async function getGithubAuthUrl(): Promise<string> {
  const res = await axiosInstance.get(API_ENDPOINTS.GITHUB_AUTH);
  return res.data;
}

export async function getGithubAuthCallback(
  code: string
): Promise<GithubAuthCallbackResponse> {
  const res = await axiosInstance.get(API_ENDPOINTS.GITHUB_AUTH_CALLBACK(code));
  return res.data;
}

export async function getDailyItem(): Promise<DailyItemResponse> {
  const res = await axiosInstance.get(API_ENDPOINTS.DAILY_ITEM);
  return res.data;
}

export async function abtainDailyItem(getSubstitute: boolean) {
  await axiosInstance.post(API_ENDPOINTS.DAILY_ITEM_ABTAIN(getSubstitute));
}

export async function getBagItems(): Promise<BagItemsResponse> {
  const res = await axiosInstance.get(API_ENDPOINTS.BAG_ITEMS);
  return res.data;
}

export async function getPokemons(): Promise<PokemomsResponse> {
  const res = await axiosInstance.get(API_ENDPOINTS.POKEMONS);
  return res.data;
}

export async function getPokedex(): Promise<PokedexResponse> {
  const res = await axiosInstance.get(API_ENDPOINTS.POKEDEX);
  return res.data;
}

export async function postUseItem(
  internalPokemonId: number,
  itemType: number
): Promise<UseItemResponse> {
  const res = await axiosInstance.post(
    API_ENDPOINTS.USE_ITEM(internalPokemonId, itemType)
  );
  return res.data;
}
