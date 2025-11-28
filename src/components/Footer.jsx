function Footer() {
  return (
    <footer className="relative bg-[#0A0E1A] border-t border-gray-800 py-6 md:py-10 text-center text-gray-400 px-4">
     

      {/* Logo centralizada */}
      <div className="flex justify-center mb-4">
        <img
          src="/src/assets/Logo1.png"
          alt="NotatusMatch"
          className="w-36"
        />
      </div>

      {/* Texto */}
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} <span>NotatusMatch</span> — Todos os direitos reservados.
      </p>

      {/* Efeito decorativo no rodapé */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-40"></div>
    </footer>
  )
}

export default Footer
