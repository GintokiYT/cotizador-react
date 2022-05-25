import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { obtenerDiferenciaAnio, obtenerMarca, obtenerPlan } from '../Helper';

const Campo  = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    flex: 1;
    padding: .7rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 1rem;
    width: 100%;
    padding: .8rem;
    border-radius: .3rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover {
        cursor: pointer;
        background-color: #26C6DA;
        color: #fff;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    text-align: center;
    margin-bottom: 1.5rem;
`;

const Formulario = ( { guardarResumen, guardarCargando } ) => {

    //* Creamos el state
    const [ datos, guardarDatos ] = useState({
        marca: '',
        anio: '',
        plan: ''
    });
    
    const [ error, guardarError ] = useState(false);

    //* Extraemos los valores del state
    const { marca, anio, plan } = datos;

    //* Leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = e => {
        e.preventDefault();
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    //* Cuando el usuario haga submit
    const contizarSeguro = e => {
        e.preventDefault();

        if( marca.trim() === "" || anio.trim() === "" || plan.trim() === "" ){
            guardarError(true);
            return;
        }
        guardarError(false);

        // Una base de 2000
        let resultado = 2000;

        // Por cada año hay que restar el 3%
        resultado = obtenerDiferenciaAnio(anio, resultado);

        // Americano 15%, Asiatico 5%, Europeo 30%
        resultado = obtenerMarca(marca, resultado);

        // Plan basico aumenta 20%, completo 50%
        resultado =  obtenerPlan(plan, resultado);

        // Total
        guardarCargando(true);

        setTimeout(() => {
            guardarCargando(false);

            guardarResumen({
                cotizacion: resultado,
                datos : datos
            });
        }, 2000);

    }

    return ( 
        <form
            onSubmit={contizarSeguro}
        >
            { error? <Error>Todos los campos son obligatorios</Error> : null }

            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name="anio"
                    value={anio}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                /> Básico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                /> Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>
    );
}
 
PropTypes.Formulario = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

export default Formulario;