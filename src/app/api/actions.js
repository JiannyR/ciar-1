'use server'

import { Pool } from 'pg';

// Configura la conexión con PostgreSQL
const pool = new Pool({
    user: 'postgres.uizflcorbsdcswttfbmv',
    host: 'aws-0-us-west-1.pooler.supabase.com',
    database: 'postgres',
    password: 'S5wafi7NRwY7tgmP',
    port: 6543,
});

// Función para obtener los estudiantes de los dos grupos
export async function fetchEstudiantes(groupStudent) {
    try {
        const client = await pool.connect();
        const res = await client.query(`SELECT id, id_student, first_name, last_name, is_selected FROM estudiantes WHERE is_selected = ${groupStudent}`);
        client.release();
        return { data: res.rows };

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
        const queryText = `UPDATE estudiantes SET is_selected = ${flag} WHERE id = ANY($1) RETURNING id`;
        await client.query(queryText, [ids]);
        client.release();
        return { status: 'success' };

    } catch (err) {
        console.error('Error moving estudiante/s:', err.message);
        return { status: 'error', message: err.message };
    }
}

