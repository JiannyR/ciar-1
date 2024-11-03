import pandas as pd
import psycopg2

#Configurar la conexión a la base de datos
conn = psycopg2.connect(
    dbname="tesis",
        user="postgres",
        password="1234",
        host="localhost",
        port="5432"
)
cursor = conn.cursor()

#Leer el archivo CSV sin encabezados
df = pd.read_csv('C:\\Users\\Jian_Raw\\Documents\\NuevoEstudiantes.csv', header=None, delimiter = ';')

#Convertir las columnas a los tipos de datos apropiados
df[4] = df[4].str.replace(',' , '.').astype(float)           # columna2 como entero
df[5] = df[5].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[6] = df[6].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[7] = df[7].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[8] = df[8].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[9] = df[9].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[10] = df[10].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[11] = df[11].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[12] = df[12].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[13] = df[13].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[14] = df[14].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[15] = df[15].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[16] = df[16].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[17] = df[17].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[18] = df[18].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[19] = df[19].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[20] = df[20].str.replace(',' , '.').astype(float)         # columna3 como flotante
df[21] = df[21].str.replace(',' , '.').astype(float)         # columna3 como flotante

#Repite la conversión según sea necesario para otras columnas.
#Insertar datos en la tabla
for index, row in df.iterrows():
    cursor.execute("""
        INSERT INTO estudiantes (
            full_name, provincia, municipio, grupo, avg_acd, avg_gen, indice_int, indice_gen, produccion, feu_ujc, investigacion, tsu, deporte, guardia, cultura, residencia, premio_mella, titulo_oro, med_dis_min, arrastres, mundiales, repitente
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        )
    """, (
        row[0], row[1], row[2], 
        row[3], row[4], 
        row[5], row[6], 
        row[7], row[8], 
        row[9], row[10], 
        row[11],row[12],
        row[13],row[14],
        row[15],row[16],
        row[17],row[18],
        row[19],row[20],row[21],
    ))

#Confirmar los cambios y cerrar la conexión
conn.commit()
cursor.close()
conn.close()