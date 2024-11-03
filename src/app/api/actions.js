'use server'

import { Pool } from 'pg';

// Configura la conexión con PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tesis',
    password: '1234',
    port: 5432,
});


// Función para obtener los estudiantes de los dos grupos
export async function fetchEstudiantes(groupStudent) {
    try {
        const client = await pool.connect();
        const res = await client.query(`SELECT id, grupo, full_name, avg_gen, indice_gen, is_selected FROM estudiantes WHERE is_selected = ${groupStudent}`);
        client.release();
        return { data: res.rows };

    } catch (err) {
        console.error('Error fetching estudiantes:', err.message);
        return { data: [], message: err.message };
    }
}

// Función para obtener los usuarios seleccionados
export async function fetchSeleccionados() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT id, grupo, full_name, avg_gen, indice_gen, is_selected FROM estudiantes WHERE is_selected = true');
        client.release(); // Liberar el cliente de la conexión
        return res.rows;
    } catch (err) {
        console.error('Error fetching estudiantes:', err.message);
        return { data: [], message: err.message };
    }
}

// Función para mover los usuarios seleccionados
export async function moverEstudiantes(ids = [], flag = false) {
    try {
        if (ids.length < 1) throw new Error('No hay usuarios seleccionados');

        const client = await pool.connect();
        
        // Hacer un UPDATE en la columna 'is_selected' basado en los ids.
        const queryText = `UPDATE estudiantes SET is_selected = ${flag} WHERE id = ANY($1) RETURNING id`;
        
        // Aquí envolvemos ids en otro array, ya que $1 espera un array.
        const res = await client.query(queryText, [ids]);
        
        console.log(res.rows);
        client.release();
        return { status: 'success' };

    } catch (err) {
        console.error('Error moving estudiante/s:', err.message);
        return { status: 'error', message: err.message };
    }
}

