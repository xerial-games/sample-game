const processProjectConnected = function (payload) {
  globalThis.playerAddress = payload.address;
};

const processNftCreated = function (payload) {
  globalThis.nftId = payload.nftId;
};

export const config = { api: { bodyParser: false } };
export default function handler(req, res) {
  req.body = [];
  req.on('data', function (chunk) { req.body.push(chunk); });
  req.on('end', function () {
    const webhook = JSON.parse(req.body.join(''));
    switch (webhook.eventName) {
      case 'projectConnected':
        processProjectConnected(webhook.payload);
        break;
      case 'nftCreated':
        processNftCreated(webhook.payload);
        break;
    }
    res.status(200).json({});
  })
}
