const renderPerfil = (req, res) => {
    const usuario = req.session.usuario;
    res.render("perfil", { usuario });
  };
  
  module.exports = {
    renderPerfil,
  };
  