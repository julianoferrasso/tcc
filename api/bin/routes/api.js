"use strict";
const express = require("express");
const UsuarioCtrl_1 = require("../controllers/UsuarioCtrl");
const photoCtlr_1 = require("../controllers/photoCtlr");
var mcache = require('memory-cache');
var router = express.Router();
var descache = () => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cachedBody = mcache.get(mcache.keys()[0]);
        if (cachedBody) {
            mcache.clear();
        }
        next();
    };
};
router.post('/salvarUsuario', UsuarioCtrl_1.default.create);
router.post('/loginUser', UsuarioCtrl_1.default.login);
router.post('/salvarFotos', photoCtlr_1.default.putPhotos);
router.get('/carregarAlbuns/:id', photoCtlr_1.default.buscarAlbuns);
router.get('/carregarFotos/:id', photoCtlr_1.default.buscarAlbum);
router.post('/apagarFoto', photoCtlr_1.default.deletarFoto);
router.put('/addFotos', photoCtlr_1.default.addFotos);
module.exports = router;
