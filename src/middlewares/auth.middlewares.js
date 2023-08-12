export function checkAdmin(req, res, next) {
  if (req.session.rol === 'admin') {
    next(); // Permite el acceso si el usuario es un administrador
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' }); // Deniega el acceso si no es un administrador
  }
}

export function checkUser(req, res, next) {
  if (req.session.rol === 'user') {
    next(); // Permite el acceso si el usuario es un usuario normal
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' }); // Deniega el acceso si no es un usuario normal
  }
}
