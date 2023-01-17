export default function handler(req, res) {
  delete globalThis.nftId;
  delete globalThis.playerAddress;
  res.status(200).json({});
}
