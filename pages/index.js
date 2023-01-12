import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react';



const refresher = (async function () {
  let lastPlayerAddress
    , lastNftId;

  async function updatePlayerAddress() {
    const response = await fetch('/api/player_address');
    const json = await response.json();
    if (lastPlayerAddress == json.playerAddress) return;
    lastPlayerAddress = json.playerAddress;
    viewmodel.setPlayerAddress(json.playerAddress);
  }

  async function updateNftId() {
    const response = await fetch('/api/nft_id');
    const json = await response.json();
    if (lastNftId == json.nftId) return;
    lastNftId = json.nftId;
    viewmodel.setNftId(json.nftId);
  }

  async function updateEverything() {
    await updatePlayerAddress();
    await updateNftId();
  }

  async function loop() {
    await updateEverything();
    await new Promise(function (ok) { setTimeout(ok, 2000); });
    await loop();
  }

  if (globalThis.constructor.name != 'Window') return;

  await loop();
})();



const viewmodel = (function () {
  const vm = {};

  vm.observer = {
    subs: [],
    watch: function (fn) { vm.observer.subs.push(fn); },
    notify: function () { vm.observer.subs.forEach(function (fn) { fn(); }) }
  };

  vm.waitingForPlayerAddress = true;
  vm.waitingForNftId = false;

  // NOTE: This is a test project ID, in order to use the API with your own
  // API key, you'll need to change this project ID to your own project's ID.
  vm.projectId = '63a0835be57a519991b17968';

  vm.playerId = Math.ceil(Math.random() * 1000);

  vm.level = Math.ceil(Math.random() * 100);

  vm.price = undefined;

  vm.playerAddress = undefined;

  vm.nftId = undefined;

  /***/

  vm.setPrice = function (newPrice) {
    vm.price = newPrice;
    vm.observer.notify();
  };

  vm.setPlayerAddress = function (newPlayerAddress) {
    vm.playerAddress = newPlayerAddress;
    vm.waitingForPlayerAddress = false;
    vm.observer.notify();
  };

  vm.setNftId = function (newNftId) {
    vm.nftId = newNftId;
    vm.waitingForNftId = false;
    vm.observer.notify();
  };

  vm.connectProject = function () {
    window.open(`https://staging.xerial.io/games/${vm.projectId}/connect`);
    vm.waitingForPlayerAddress = true;
    vm.observer.notify();
  };

  vm.createSale = async function () {
    vm.creatingSale = true;
    vm.observer.notify();

    try {
      await fetch('/api/sell_rogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: vm.playerId,
          level: vm.level,
          price: vm.price,
        })
      });
      vm.waitingForNftId = true;
    }
    catch (error) {
      vm.createSaleError = error;
    }
    finally {
      vm.creatingSale = false;
      vm.observer.notify();
    }
  };

  return vm;
})();



export default function Home() {
  const [waitingForPlayerAddress, setWaitingForPlayerAddress] = useState();
  const [waitingForNftId, setWaitingForNftId] = useState();
  const [playerId, setPlayerId] = useState();
  const [playerAddress, setPlayerAddress] = useState();
  const [level, setLevel] = useState();
  const [price, setPrice] = useState();
  const [nftId, setNftId] = useState();
  const [creatingSale, setCreatingSale] = useState();

  useEffect(function () {
    setPlayerId(viewmodel.playerId);
    setPlayerAddress(viewmodel.playerAddress);
    setLevel(viewmodel.level);

    viewmodel.observer.watch(function () {
      setWaitingForPlayerAddress(viewmodel.waitingForPlayerAddress);
      setWaitingForNftId(viewmodel.waitingForNftId);
      setPlayerAddress(viewmodel.playerAddress);
      setPrice(viewmodel.price);
      setNftId(viewmodel.nftId);
      setCreatingSale(viewmodel.creatingSale);
    });
  }, []);

  const onPriceChanged = function (event) {
    event.preventDefault();
    viewmodel.setPrice(event.target.value);
  };

  const connectProject = function (event) {
    event.preventDefault();
    viewmodel.connectProject();
  };

  const createSale = function (event) {
    event.preventDefault();
    viewmodel.createSale();
  };

  const renderConnect = function () {
    if (playerAddress)
      return <p>Tu address de Xerial es {playerAddress}</p>;
    if (waitingForPlayerAddress)
      return <p>Espera un momento...</p>;
    return <>
      <p className='home__generalText'>El juego no conoce tu address en Xerial.</p>
      {/* <p><a onClick={connectProject} href="">Conectar mi cuenta de Xerial con el juego.</a></p> */}
      <button className='home__buttonRoseGradient' onClick={connectProject} href="">Conectar cuenta</button>
    </>;
  };

  const renderSaleForm = function () {
    if (!playerAddress) {
      return <p className='home__generalTextMini home__textCenter'><em>Para vender tu picaro el juego tiene que conocer tu address en Xerial.</em></p>;
    }
    if (nftId) {
      const url = `https://staging.xerial.io/items/${nftId}`;
      return <p>Tu picaro esta a la venta! Entra aca: <a href={url} target="_blank" rel="noreferrer">Ver en Xerial</a></p>;
    }
    if (creatingSale) {
      return <p>Creando venta de picaro...</p>;
    }
    if (waitingForNftId) {
      return <p>Espera un momento...</p>;
    }
    return <>
      <input type="number" placeholder="Precio del picaro" onChange={onPriceChanged} />
      <p><a onClick={createSale} href="">Vender picaro por {price || '??'} tokens.</a></p>
    </>
  };

  return (
    <>
      <Head>
        <title>Sample game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='home__principalContainer'>
        <hgroup className='home__connectSection'>
          <h1 className='home__title'>Este es un juego de rol :)</h1>
          <p className='home__generalText'>Sirve para mostrar una integracion con <a className='home__xerialHyperlink' href="https://xerial.io">Xerial</a>.</p>
          <img src='/assets/hockeyPicaro.png' className='home__picaroImage'/>
          {/* Quizá muevo esto debajo de la página. */}
          <p className='home__generalTextMini'>Podes ver el codigo fuente de esta pagina en <a href="https://github.com/xerial-games/sample-game" target="_blank" rel="noreferrer">Github</a> y la documentacion en <a href="https://docs.xerial.io">este link</a>.</p>
        </hgroup>

        <hr />

        <div className='home__playerIdAndPicaroLvl'>
          {/* <h2>Ya jugas a este juego de rol hace un tiempo...</h2> */}
          <p className='home__generalText'>Sos el jugador con ID #{playerId}.</p>
          <p className='home__generalTextMini home__picaroLvlMargin'>Tenes un picaro nivel {level}.</p>
        </div>

        <hr />

        <div className='home__connectAccountSection'>
          <h2 className='home__title'>Este juego se conecta con Xerial...</h2>
          {renderConnect()}
          <p className='home__generalTextMini home__textCenter'>Como funciona? Al conectar tu cuenta de Xerial con el juego, el juego sabe el <a href="https://docs.solana.com/es/wallet-guide" target="_blank" rel="noreferrer">address</a> de la <a href="https://docs.solana.com/es/wallet-guide" target="_blank" rel="noreferrer">wallet</a> de tu cuenta y puede crear <a href="https://en.wikipedia.org/wiki/Non-fungible_token" target="_blank" rel="noreferrer">NFTs</a> para el marketplace. Sin tu address, el juego no puede crear NFTs en Xerial.</p>
        </div>

        <hr />

        <div className='home__sellItemsInfoSection'>
          <h2 className='home__title'>Y te permite vender tus personajes y objetos!</h2>
          {renderSaleForm()}
          <p className='home__generalTextMini home__textCenter'>Como funciona? El juego va a comunicarse con Xerial para crear un NFT y ponerlo a la venta en el marketplace. Cuando otro jugador compre el NFT, tu saldo en tokens se va a actualizar.</p>
        </div>
      </main>
    </>
  )
}
