
import pandas as pd
import psycopg2
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

# Conexión a la base de datos
def cargar_datos():
    conn = psycopg2.connect(
        dbname="tesis",
        user="postgres",
        password="1234",
        host="localhost",
        port="5432"
    )
    query = "SELECT * FROM estudiantes;"
    df = pd.read_sql(query, conn)
    conn.close()
    return df



# Agrega la columna is_selected a la base de datos si no existe
def agregar_columna(conn):
    cursor = conn.cursor()
    try:
        cursor.execute("ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS is_selected BOOLEAN DEFAULT FALSE;")
        conn.commit()
    except Exception as e:
        print(f"La columna no se pudo agregar o ya existe: {e}")
    finally:
        cursor.close()

# La parte del preprocesamiento de datos
def preprocesar_datos(df):
    features = df[['avg_acd', 'indice_int', 'produccion', 'feu_ujc',
                   'investigacion', 'tsu', 'deporte', 'guardia',
                   'cultura', 'residencia']]

    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)

    return features_scaled

# Encontrar estudiantes AA usando k-NN
def encontrar_estudiantes_aa(df, features_scaled, k=5):
    knn = NearestNeighbors(n_neighbors=k)
    knn.fit(features_scaled)

    # Filtrar estudiantes AA
    estudiantes_aa = df[(df['avg_acd'] >= 4.5) &
                        (df['indice_int'] >= 0.8) &
                        (df['med_dis_min'] == 0) &
                        (df['arrastres'] == 0) &
                        (df['repitente'] == 0)]

    return estudiantes_aa

# Crear un perfil de alto aprovechamiento
def crear_perfil_aa(estudiantes_aa):
    return estudiantes_aa.mean()

# Comparar todos los estudiantes con el perfil AA
def comparar_con_perfil(df, perfil_promedio):
    df_comparacion = df.copy()
    df_comparacion['diferencia'] = (
        df_comparacion[['avg_acd', 'indice_int']].mean(axis=1) -
        perfil_promedio[['avg_acd', 'indice_int']].mean()
    )

    # Establecer un umbral para definir estudiantes AA
    umbral = 0.0
    df_comparacion['sugeridos'] = df_comparacion['diferencia'] >= umbral

    return df_comparacion

# Actualizar la base de datos
def actualizar_base_datos(df, conn):
    cursor = conn.cursor()
    for index, row in df.iterrows():
        cursor.execute(
            "UPDATE estudiantes SET is_selected = %s WHERE id = %s",
            (row['sugeridos'], row['id'])
        )
    conn.commit()
    cursor.close()

# Main
def main():
    conn = psycopg2.connect(
        dbname="tesis",
        user="postgres",
        password="1234",
        host="localhost",
        port="5432"
    )

    # Agrega columna is_selected si no existe
    agregar_columna(conn)

    # Cargar y procesar datos
    df_estudiantes = cargar_datos()
    
    features_scaled = preprocesar_datos(df_estudiantes)

    estudiantes_aa = encontrar_estudiantes_aa(df_estudiantes, features_scaled, k=5)

    perfil_promedio = crear_perfil_aa(estudiantes_aa)

    resultados = comparar_con_perfil(df_estudiantes, perfil_promedio)

    actualizar_base_datos(resultados, conn)

    conn.close()
    print("Actualización completa: Columna 'is_selected' agregada/actualizada en la tabla de estudiantes.")

if __name__ == "__main__":
    main()
