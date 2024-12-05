export async function handleDictionaryLookUp(word: string) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  return res.ok;
}
