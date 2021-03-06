'use strict';

var Parse = require('parse');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

var AccionRecord = require('src/records/accion');
var AccionObject = Parse.Object.extend('Accion');

var NotificacionRecord = require('src/records/notificacion');

module.exports = {
    fetchAcciones: function (contratoId) {
        Dispatcher.dispatch({
            type: 'ACCIONES_FETCH'
        });

        var query = new Parse.Query(AccionObject);
        query.include('creador');
        query.descending('createdAt');
        query.limit(5000);
        query.equalTo('contrato', new (Parse.Object.extend('Contrato'))({id: contratoId}));

        query.find().then(function (acciones) {
            // Convert array of Parse.Objects to Immutable.List of Nota Records
            acciones = acciones.map(function (accion) {
                return createAccionRecord(accion);
            });

            Dispatcher.dispatch({
                type: 'ACCIONES_FETCH_SUCCESS',
                contratoId: contratoId,
                acciones: new Immutable.List(acciones)
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'ACCIONES_FETCH_ERROR',
                error: error
            });
        });
    },
    saveAccion: function (accion, contratoId) {
        Dispatcher.dispatch({
            type: 'ACCIONES_SAVE'
        });

        (new AccionObject()).save(accion).then(function (payload) {
            var updatedAccion = createAccionRecord(payload);
            Dispatcher.dispatch({
                type: 'ACCIONES_SAVE_SUCCESS',
                accion: updatedAccion,
                contratoId: contratoId
            });

            if (updatedAccion.contrato.notificacion) {
                Dispatcher.dispatch({
                    type: 'NOTIFICACIONES_UPDATE',
                    notificacion: createNotificacionRecord(updatedAccion.contrato.notificacion),
                    contratoId: contratoId
                });
            }
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'ACCIONES_SAVE_ERROR',
                error: error
            });
        });
    }
};

function createAccionRecord (accion) {
    return new AccionRecord(accion.toJSON());
}

function createNotificacionRecord (notificacion, numeroContrato) {
    return new NotificacionRecord(notificacion, numeroContrato);
}
