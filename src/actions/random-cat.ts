import { hiraganaToKatakana, randomSelect } from '../utils/utils';
import { fetchImageUrl } from '../clients/flicker';
import { postImages } from '../clients/slack';
import { KANA_CATS } from '../constants/Cats';
import { catSearchableText } from '../utils/searchableText';

/*
 * ランダムにニャンコを抽出します
 */
export async function randomCat(text: string): Promise<void> {
  if (!randomCatRequested(text)) {
    return;
  }

  const cat = randomSelect(KANA_CATS);
  const searchableText = catSearchableText(cat)
  const imageUrl = await fetchImageUrl(searchableText);

  if (imageUrl === null) {
    console.log('no images found!');
    return;
  }

  try {
    await postImages([imageUrl], `${cat}だよ`);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

function randomCatRequested(text: string): boolean {
  return [
    'ナンデモイイカラニャンコクレ',
    'ニャンコクレ',
    'ニャンコクダサイ',
    'ニャンコ下サイ',
    'ランダムニャンコ',
    'ニャンコホシイ',
    'ニャンコ欲シイ',
    'ニャンコタリナイ',
    'ニャンコ足リナイ',
  ].includes(hiraganaToKatakana(text));
}
