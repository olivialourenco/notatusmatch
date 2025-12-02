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
import TestConnection from "./components/TestConnection"
import PerfilTatuador from "./pages/PerfilTatuador"
import DashboardTatuador from "./pages/DashboardTatuador"
import DetalhesSolicitacao from "./pages/DetalhesSolicitacao"
import MinhasSolicitacoes from "./pages/MinhasSolicitacoes"
import DetalhesSolicitacaoCliente from "./pages/DetalhesSolicitacaoCliente"
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
            <Route path="/test-connection" element={<TestConnection />} />
            <Route path="/tatuador/:id" element={<PerfilTatuador />} />
            <Route path="/tatuador/dashboard" element={<DashboardTatuador />} />
            <Route path="/solicitacao/:id" element={<DetalhesSolicitacao />} />
            <Route path="/minhas-solicitacoes" element={<MinhasSolicitacoes />} />
            <Route path="/minhas-solicitacoes/:id" element={<DetalhesSolicitacaoCliente />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
