export function obtenerDiferenciaAnio(anio, resultado) {
    const diferencia = (new Date().getFullYear() - anio) * 0.03;
    return resultado - (resultado * diferencia);
}

export function obtenerMarca(marca, resultado) {
    if( marca === 'americano' ) return resultado += ( resultado * 0.15 );
    if( marca === 'asiatico' ) return resultado += ( resultado * 0.05 );
    if( marca === 'europeo' ) return resultado += ( resultado * 0.3 );
}

export function obtenerPlan(plan, resultado) {
    if( plan === 'basico' ) return resultado += ( resultado * 0.2 );
    if( plan === 'completo' ) return resultado += ( resultado * 0.5 );
}

export function primeraMayuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}