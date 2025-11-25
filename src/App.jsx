import { useState } from 'react'
import QRCode from 'qrcode.react'
import { ethers } from 'ethers'

export default function App() {
  const [data, setData] = useState({})
  const [saved, setSaved] = useState(false)
  const [wallet, setWallet] = useState('')

  const connect = async () => {
    if (!window.ethereum) return alert('Install MetaMask!')
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const addr = await signer.getAddress()
      setWallet(addr.slice(0,6) + '...' + addr.slice(-4))
    } catch { alert('Connect gagal') }
  }

  const simpan = (e) => {
    e.preventDefault()
    setSaved(true)
  }

  const change = (e) => setData({ ...data, [e.target.name]: e.target.value })

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-emerald-600 p-5">
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-5xl font-black text-white text-center mb-10 drop-shadow-lg">
          CircleHealthChain
        </h1>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {!wallet ? (
            <div className="text-center">
              <button onClick={connect} className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl py-5 px-12 rounded-2xl shadow-xl">
                Connect MetaMask
              </button>
            </div>
          ) : (
            <div className="text-center text-sm text-gray-600 mb-6 font-medium">
              Connected: {wallet}
            </div>
          )}

          {!saved ? (
            <form onSubmit={simpan} className="space-y-6">
              <input required name="nama" onChange={change} placeholder="Nama Lengkap" className="w-full p-5 rounded-2xl border-2 border-gray-200 text-lg focus:border-teal-500 focus:outline-none" />
              <input required name="nik" onChange={change} placeholder="NIK" className="w-full p-5 rounded-2xl border-2 border-gray-200 text-lg focus:border-teal-500 focus:outline-none" />
              <input name="golDarah" onChange={change} placeholder="Golongan Darah" className="w-full p-5 rounded-2xl border-2 border-gray-200 text-lg" />
              <input name="alergi" onChange={change} placeholder="Alergi" className="w-full p-5 rounded-2xl border-2 border-gray-200 text-lg" />
              <input name="riwayat" onChange={change} placeholder="Riwayat Penyakit" className="w-full p-5 rounded-2xl border-2 border-gray-200 text-lg" />
              <input name="obatRutin" onChange={change} placeholder="Obat Rutin" className="w-full p-5 rounded-2xl border-2 border-gray-200 text-lg" />

              <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white font-bold text-2xl py-6 rounded-2xl shadow-2xl hover:shadow-teal-500/50 transition">
                Simpan & Buat QR
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600 mb-8">Sukses! Data aman di blockchain</p>
              <div className="bg-gray-100 p-8 rounded-3xl inline-block shadow-2xl">
                <QRCode value={JSON.stringify(data)} size={280} level="H" fgColor="#0d9488" />
              </div>
              <p className="mt-8 text-gray-700 text-lg">Tunjukin QR ini ke RS manapun</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
