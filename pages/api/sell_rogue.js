import fetch from 'node-fetch';

export default async function handler(req, res) {
  const playerAddress = globalThis.playerAddress;
  const playerId = req.body.playerId;
  const price = req.body.price;
  const level = req.body.level;

  const response = await fetch('https://staging.api.xerial.io/create_nft', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: process.env.XERIAL_API_KEY,
      newNft: {
        sellerAddress: playerAddress,
        title: `Picaro (${level})`,
        description: `Este es mi picaro nivel ${level}`,
        price,
        stock: 1,
        image: 'https://staging.xerial.io/assets/homeAssets/leagueoflegends.png',
      }
    }),
  });
  const json = await response.json();
  res.status(200).json(json);
}
