// models/produkModel.js
const daftarProduk = [
  {
    id: 1,
    nama: "Keripik Singkong Original",
    kategori: "Keripik Singkong",
    harga: 10000,
    keunggulan: "Renyah, gurih alami, dan diolah dari singkong pilihan"
  },
  {
    id: 2,
    nama: "Keripik Singkong Pedas",
    kategori: "Keripik Singkong",
    harga: 12000,
    keunggulan: "Bumbu pedas mantap asli racikan khas Pawon Risra"
  },
  {
    id: 3,
    nama: "Kacang Bawang Gurih",
    kategori: "Kacang Bawang",
    harga: 15000,
    keunggulan: "Empuk, renyah dengan taburan bawang goreng melimpah"
  }
];

exports.getAll = () => {
  return daftarProduk;
};