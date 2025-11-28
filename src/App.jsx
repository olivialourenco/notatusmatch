import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import EscolhaPerfil from "./pages/EscolhaPerfil"
import CadastroTatuador from "./pages/CadastroTatuador"
import CadastroCliente from "./pages/CadastroCliente"
import Tatuadores from "./pages/Tatuadores"
import Sobre from "./pages/Sobre"
import Contato from "./pages/Contato"
import Login from "./pages/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="bg-[#0B1120] min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/escolha-perfil" element={<EscolhaPerfil />} />
            <Route path="/cadastro-tatuador" element={<CadastroTatuador />} />
            <Route path="/cadastro-cliente" element={<CadastroCliente />} />
            <Route path="/tatuadores" element={<Tatuadores />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
