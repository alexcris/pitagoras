'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');

// -----------------------------------------------------------------------------------------------
// Amparo
// -----------------------------------------------------------------------------------------------

var Amparo = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;

        return {
            tipo: 5,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                expediente: lastAccion ? lastAccion.respuestas.expediente : '',
                juzgado: lastAccion ? lastAccion.respuestas.juzgado : '',
                resolucion: lastAccion ? lastAccion.respuestas.resolucion : 'Admite',
                fechaPresentacion: lastAccion ? lastAccion.fechaPresentacion : null,
                fechaResolucion: lastAccion ? lastAccion.fechaResolucion : null
            },
            disabled: false
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.getState(nextProps);
    },
    getState: function (props) {
        this.setState({disabled: props.disabled});
    },
    render: function () {
        var respuestas = this.state.respuestas;

        return (
            <div className='amparo accion-form'>
                <div className='element-wrapper'>
                    <h5>Fecha de presentación</h5>
                    <DateSelect date={respuestas.fechaPresentacion} onChange={this.handleFechaChange.bind(this, 'fechaPresentacion')} />
                </div>
                <div className='element-wrapper'>
                    <h5>Expediente</h5>
                    <input
                        type='text'
                        value={respuestas.expediente}
                        onChange={this.handleChange.bind(this, 'expediente')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Juzgado</h5>
                    <input
                        type='text'
                        value={respuestas.juzgado}
                        onChange={this.handleChange.bind(this, 'juzgado')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Resolución</h5>
                    <div>
                        <input
                            type='radio'
                            id='admite'
                            value='Admite'
                            checked={respuestas.resolucion === 'Admite'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='admite' disabled={this.state.disabled}>Admite</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='confirma'
                            value='Confirma'
                            checked={respuestas.resolucion === 'Confirma'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='confirma' disabled={this.state.disabled}>Confirma</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='pendiente'
                            value='Pendiente'
                            checked={respuestas.resolucion === 'Pendiente'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='pendiente' disabled={this.state.disabled}>Pendiente</label>
                    </div>
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha de resolución</h5>
                    <DateSelect date={respuestas.fechaResolucion} onChange={this.handleFechaChange.bind(this, 'fechaResolucion')} />
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
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
        respuestas.resolucion = event.target.value;

        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (fecha, date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas[fecha] = date ? date.clone() : null;

        this.setState(state);
    }
});

module.exports = Amparo;
