const jwt = require('jsonwebtoken');

// verificación del token


const verificaToken = (req, res, next) => {
    const token = req.get('Authorization');
    jwt.verify(token, process.env.SEED , (error, decode) => {
        if (error) {
            return res.status(401).json({
                ok: false,
                message: 'Token no válido'
            });
        }

        req.usuario = decode.usuario;
        // !Importante si no llamo al next el calback de la ruta no se va a ejecutar
        next();
    });
};

const verificaAdminRole = (req, res, next) => {
    const usuario = req.usuario;

    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(400).json({
            ok: false,
            message: 'El usuario necesita permisos de Administrador'
        });
    }

    next();
}

module.exports ={ verificaToken, verificaAdminRole};
