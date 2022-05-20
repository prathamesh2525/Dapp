let provider = new ethers.providers.Web3Provider(window.ethereum, "rinkeby");
let MoodContract;
let signer;
const MoodContractAddress = "0x1c4f7DA8d3f62D88A41Ea0FFB17245FE30f0c8Cb";
let display = document.getElementById("getMood");
const MoodContractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

async function connect() {
  signer = await provider.getSigner();
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectButton").innerHTML = "Connected";
    const adr = document.getElementById("address");
    adr.textContent = "Address: " + (await signer.getAddress());
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  }
}
async function getBalance() {
  const balance = await signer.getBalance();
  const convertToEth = 1e18;
  const balancedis = document.getElementById("balance");
  balancedis.textContent ="Balance: "+ balance.toString() / convertToEth + " eth";
}

async function getMood() {
  const getMoodPromise = MoodContract.getMood();
  const Mood = await getMoodPromise;
  console.log(Mood);
  display.textContent = "Mood: " + Mood;
}

async function setMood() {
  const mood = document.getElementById("mood").value;
  const setMoodPromise = MoodContract.setMood(mood);
  await setMoodPromise;
}
