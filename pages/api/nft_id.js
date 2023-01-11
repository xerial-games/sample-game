export default function handler(req, res) {
  res.status(200).json({ nftId: globalThis.nftId });
}
