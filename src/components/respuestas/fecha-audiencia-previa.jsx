'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Fecha Audiencia Previa Respuestas
// -----------------------------------------------------------------------------------------------

var FechaAudienciaPrevia = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Atendido por: </span>
                    <span>{respuestas.atendido}</span>
                </div>
                <div>
                    <span className='bold'>Fecha: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fecha)}</span>
                </div>
                {this.renderHour()}
            </div>
        );
    },
    renderHour: function () {
        var hora = this.props.accion.respuestas.hora;
        if (!hora) {
            return;
        }

        return (
            <div>
                <span className='bold'>Hora: </span>
                <span>{hora}</span>
            </div>
        );
    }
});

module.exports = FechaAudienciaPrevia;
