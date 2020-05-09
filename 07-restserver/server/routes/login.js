const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const Usuario = require('../models/Usuario');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const app = express();

const generarToken = (usuario) => {
    const token = jwt.sign(
        { usuario },
        process.env.SEED,
        { expiresIn: process.env.CADUCIDAD_TOKEN }
    );

    return token;
};

const respuestaCorrectaConElToken = (usuario, res) => {
    const token = generarToken(usuario);

    return res.json({
        ok: true,
        usuario,
        token
    });
};

app.post('/login', (req, res) => {

    const body = req.body;

    Usuario.findOne({ email: body.email }, (error, usuarioDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: '(Usuario)o contraseña incorrectos' //Eliminar los parentesis para produccion
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o (contraseña)incorrectos' //Eliminar los parentesis para produccion
            })
        }

        respuestaCorrectaConElToken(usuarioDB, res);
    });
})

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
    const userid = payload['sub'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}


app.post('/google', async(req, res) => {
    const token = req.body.idtoken;

    const googleUser = await verify(token).catch(e => {
        return res.status(403).json({
            ok: false,
            error: e
        });
    });

    Usuario.findOne({ email: googleUser.email }, (error, usuarioDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (usuarioDB) {
            if (!usuarioDB.google) {
                return res.status(500).json({
                    ok: false,
                    error: {
                        message: 'Debe de usar su autenticación normal'
                    }
                });
            } else {
                respuestaCorrectaConElToken(usuarioDB, res);
                }
            } else {
            const usuario = new Usuario({ ...googleUser, password: ':)' });
            usuario.save((error, newUsuario) => {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        error
                    });
                }
                respuestaCorrectaConElToken(newUsuario, res);
            });
        }
    });
});































module.exports = app;
