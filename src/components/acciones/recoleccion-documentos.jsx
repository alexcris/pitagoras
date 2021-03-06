'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var moment = require('moment');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');
var TimeSelect = require('src/components/shared/time-select');

// -----------------------------------------------------------------------------------------------
// RecoleccionDocumentos
// -----------------------------------------------------------------------------------------------

var RecoleccionDocumentos = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;

        var state = {
            tipo: 7,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                recogeDocumentos: lastAccion ? lastAccion.respuestas.recogeDocumentos : true
            },
            disabled: false
        };

        if (lastAccion && lastAccion.respuestas.recogeDocumentos) {
            state.respuestas.personaRecoge = lastAccion.respuestas.personaRecoge;
            state.respuestas.documentosRecogidos = lastAccion.respuestas.documentosRecogidos;
        }

        if (lastAccion && !lastAccion.respuestas.recogeDocumentos) {
            state.respuestas.fecha = lastAccion.respuestas.fecha;
            state.respuestas.horario = {
                start: lastAccion.respuestas.horario.start,
                end: lastAccion.respuestas.horario.end
            };
        }

        return state;
    },
    componentWillReceiveProps: function (nextProps) {
        this.getState(nextProps);
    },
    getState: function (props) {
        this.setState({disabled: props.disabled});
    },
    render: function () {
        return (
            <div className='recoleccion-documentos accion-form'>
                <div className='element-wrapper'>
                    <h5>¿Documentos recogidos?</h5>
                    <div>
                        <input
                            type='radio'
                            id='si'
                            value={1}
                            checked={this.state.respuestas.recogeDocumentos}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='si' disabled={this.state.disabled}>Si</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='no'
                            value={0}
                            checked={!this.state.respuestas.recogeDocumentos}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='no' disabled={this.state.disabled}>No</label>
                    </div>
                </div>
                {this.renderTextInputs()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderTextInputs: function () {
        if (this.state.respuestas.recogeDocumentos) {
            return (
                <div className='element-wrapper'>
                    <div>
                        <h5 className='text-label'>¿Quién recogió?</h5>
                        <input
                            type='text'
                            value={this.state.respuestas.personaRecoge}
                            onChange={this.handleChange.bind(this, 'personaRecoge')}
                            disabled={this.state.disabled} />
                    </div>
                    <div>
                        <h5 className='text-label'>¿Qué recogió?</h5>
                        <input
                            type='text'
                            value={this.state.respuestas.documentosRecogidos}
                            onChange={this.handleChange.bind(this, 'documentosRecogidos')}
                            disabled={this.state.disabled} />
                    </div>
                </div>
            );
        }

        return (
            <div className='element-wrapper'>
                <div>
                    <h5>Nueva Fecha</h5>
                    <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
                </div>
                <div>
                    <label className='text-label'>Horario</label>
                        <TimeSelect time={this.state.respuestas.horario.start} onChange={this.handleHorarioChange.bind(this, 'start')} />
                        <TimeSelect time={this.state.respuestas.horario.end} onChange={this.handleHorarioChange.bind(this, 'end')} />
                </div>
            </div>
        );
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        var recogeDocumentos = parseInt(event.target.value, 10) === 1;

        respuestas.recogeDocumentos = recogeDocumentos;

        if (!recogeDocumentos) {
            respuestas.fecha = null;
            respuestas.horario = {
                start: null,
                end: null
            };
        } else if (respuestas.fecha) {
            delete respuestas.fecha;
            delete respuestas.horario;
        }

        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fecha = date ? date.clone() : null;

        this.setState(state);
    },
    handleHorarioChange: function (key, time) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.horario[key] = time;

        this.setState(state);
    }
});

module.exports = RecoleccionDocumentos;
