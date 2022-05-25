import React from 'react';
import PropTypes from 'prop-types';
import { primeraMayuscula } from '../Helper'

import styled from '@emotion/styled';


const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFFFFF;
    margin-top: 1rem;
`;

const Resumen = ( { datos } ) => {

    const { marca, anio, plan } = datos;

    if(marca === '' || anio === '' || plan === '') return null;

    return ( 
        <ContenedorResumen>
            <h2>Resumen de cotizacion</h2>
            <ul>
                <li>Marca: <b>{primeraMayuscula(marca)}</b> </li>
                <li>Año: <b>{primeraMayuscula(anio)}</b> </li>
                <li>Plan: <b>{primeraMayuscula(plan)}</b> </li>
            </ul>
        </ContenedorResumen>
    );
}

PropTypes.Resumen = {
    datos: PropTypes.object.isRequired
}
 
export default Resumen;