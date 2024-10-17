'use server'

import { Pool } from 'pg';

// Configura la conexión con PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ciar',
    password: '12345678',
    port: 5432,
});

// Función para obtener los usuarios sugeridos
export async function fetchSugeridos() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT id, first_name, last_name, email, is_active FROM user_user WHERE is_active = false');
        client.release(); // Liberar el cliente de la conexión
        return res.rows;
    } catch (err) {
        console.error('Error fetching sugeridos:', err);
        throw new Error('Failed to fetch sugeridos');
    }
}

// Función para obtener los usuarios seleccionados
export async function fetchSeleccionados() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT id, first_name, last_name, email, is_active FROM user_user WHERE is_active = true');
        client.release(); // Liberar el cliente de la conexión
        return res.rows;
    } catch (err) {
        console.error('Error fetching sugeridos:', err);
        throw new Error('Failed to fetch sugeridos');
    }
}

// Función para mover los usuarios seleccionados
export async function moverEstudiantes(ids = [], flag = false) {
    try {
        if (ids.length < 1) {
            throw new Error('No hay usuarios seleccionados');
        }

        const client = await pool.connect();
        
        // Hacer un UPDATE en la columna 'is_selected' basado en los ids.
        const queryText = `UPDATE user_user SET is_active = ${flag} WHERE id = ANY($1) RETURNING id`;
        
        // Aquí envolvemos ids en otro array, ya que $1 espera un array.
        const res = await client.query(queryText, [ids]);
        
        console.log(res.rows);
        client.release();
        return { status: 'success', moved_ids: res.rows.map(row => row.id) }; // Retornamos los ids que fueron actualizados.
    } catch (err) {
        console.error('Error moving estudiante/s:', err);
        throw new Error('Failed to move estudiante/s');
    }
}

