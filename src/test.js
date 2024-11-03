const request = require('supertest');
const { Pool } = require('pg');
const express = require('express');

// Importa tu aplicación
const app = require('./index'); // Asegúrate de exportar `app` en index.js

// Mock de la base de datos
jest.mock('pg');

describe('Pruebas del algoritmo de recomendación', () => {
    let pool;

    beforeAll(() => {
        pool = new Pool();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debería agregar la columna is_selected', async () => {
        const mockQuery = jest.fn();
        pool.query = mockQuery;

        await request(app).post('/recomendar');

        expect(mockQuery).toHaveBeenCalledWith("ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS is_selected BOOLEAN DEFAULT FALSE;");
    });

    test('Debería cargar datos de estudiantes', async () => {
        const mockQuery = jest.fn().mockReturnValue({
            rows: [
                { id: 1, avg_acd: 4.6, indice_int: 0.9 },
                { id: 2, avg_acd: 3.5, indice_int: 0.7 },
            ]
        });

        pool.query = mockQuery;

        const response = await request(app).post('/recomendar');

        expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM estudiantes;');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Actualización completa: Columna 'is_selected' agregada/actualizada en la tabla de estudiantes.");
    });

    // Aquí puedes añadir más pruebas para cada función específica...
});

const { encontrarEstudiantesAA, crearPerfilAA, compararConPerfil } = require('./index');

describe('Pruebas de precisión del algoritmo de recomendación', () => {
    test('Debería identificar correctamente a los estudiantes AA', () => {
        const estudiantes = [
            { avg_acd: 4.6, indice_int: 0.9, med_dis_min: 0, arrastres: 0, repitente: 0 },
            { avg_acd: 4.4, indice_int: 0.8, med_dis_min: 0, arrastres: 0, repitente: 0 },
            { avg_acd: 4.2, indice_int: 0.7, med_dis_min: 0, arrastres: 0, repitente: 1 },
        ];

        const estudiantesAA = encontrarEstudiantesAA(estudiantes);
        expect(estudiantesAA).toHaveLength(2); // Debería encontrar 2 estudiantes AA
    });

    test('Debería crear un perfil promedio correctamente', () => {
        const estudiantesAA = [
            { avg_acd: 4.6, indice_int: 0.9 },
            { avg_acd: 4.4, indice_int: 0.8 },
        ];

        const perfilPromedio = crearPerfilAA(estudiantesAA);
        expect(perfilPromedio.avg_acd).toBeCloseTo(4.5, 1); // Promedio debería ser 4.5
        expect(perfilPromedio.indice_int).toBeCloseTo(0.85, 2); // Promedio debería ser 0.85
    });

    test('Debería comparar correctamente los estudiantes con el perfil promedio', () => {
        const estudiantes = [
            { id: 1, avg_acd: 4.6, indice_int: 0.9 },
            { id: 2, avg_acd: 3.5, indice_int: 0.6 },
        ];

        const perfilPromedio = { avg_acd: 4.5, indice_int: 0.85 };
        const resultados = compararConPerfil(estudiantes, perfilPromedio);

        expect(resultados[0].sugeridos).toBe(true); // Estudiante 1 debería ser sugerido
        expect(resultados[1].sugeridos).toBe(false); // Estudiante 2 no debería ser sugerido
    });
});
