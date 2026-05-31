from tkinter import *
from tkinter import messagebox
import os

# ==========================
# CONFIGURACION PRINCIPAL
# ==========================

ventana = Tk()
ventana.title("Sistema Integral de Personas Desaparecidas")
ventana.geometry("1000x700")
ventana.config(bg="#DDEEFF")

registros = []

# ==========================
# FUNCIONES
# ==========================

def guardar_archivo():

    archivo = open("personas_desaparecidas.txt", "w", encoding="utf-8")

    for persona in registros:

        archivo.write(
            f"{persona['nombre']} | "
            f"{persona['edad']} | "
            f"{persona['sexo']} | "
            f"{persona['lugar']}\n"
        )

    archivo.close()


def registrar():

    if nombre.get() == "":
        messagebox.showerror(
            "Error",
            "Ingrese el nombre"
        )
        return

    persona = {

        "nombre": nombre.get(),
        "edad": edad.get(),
        "sexo": sexo.get(),
        "estatura": estatura.get(),
        "peso": peso.get(),
        "ojos": ojos.get(),
        "cabello": cabello.get(),
        "nariz": nariz.get(),
        "boca": boca.get(),
        "senas": senas.get(),
        "vestimenta": vestimenta.get(),
        "fecha": fecha.get(),
        "lugar": lugar.get(),
        "telefono": telefono.get()
    }

    registros.append(persona)

    lista.insert(
        END,
        f"{persona['nombre']} | "
        f"{persona['edad']} años | "
        f"{persona['lugar']}"
    )

    guardar_archivo()

    messagebox.showinfo(
        "Registro",
        "Persona registrada correctamente"
    )

    limpiar()


def limpiar():

    nombre.delete(0, END)
    edad.delete(0, END)
    sexo.delete(0, END)
    estatura.delete(0, END)
    peso.delete(0, END)
    ojos.delete(0, END)
    cabello.delete(0, END)
    nariz.delete(0, END)
    boca.delete(0, END)
    senas.delete(0, END)
    vestimenta.delete(0, END)
    fecha.delete(0, END)
    lugar.delete(0, END)
    telefono.delete(0, END)


def buscar():

    dato = busqueda.get().lower()

    lista.delete(0, END)

    for persona in registros:

        if dato in persona["nombre"].lower():

            lista.insert(
                END,
                f"{persona['nombre']} | "
                f"{persona['edad']} años | "
                f"{persona['lugar']}"
            )


def eliminar():

    seleccion = lista.curselection()

    if not seleccion:

        messagebox.showwarning(
            "Aviso",
            "Seleccione un registro"
        )
        return

    indice = seleccion[0]

    del registros[indice]

    lista.delete(indice)

    guardar_archivo()

    messagebox.showinfo(
        "Eliminado",
        "Registro eliminado"
    )


def total():

    messagebox.showinfo(
        "Total",
        f"Personas registradas: {len(registros)}"
    )

# ==========================
# TITULO
# ==========================

titulo = Label(
    ventana,
    text="SISTEMA INTEGRAL DE PERSONAS DESAPARECIDAS",
    font=("Arial", 18, "bold"),
    bg="#DDEEFF"
)

titulo.pack(pady=10)

# ==========================
# FORMULARIO
# ==========================

frame = Frame(ventana)
frame.pack()

campos = [
    "Nombre Completo",
    "Edad",
    "Sexo",
    "Estatura",
    "Peso",
    "Color de Ojos",
    "Color de Cabello",
    "Tipo de Nariz",
    "Tipo de Boca",
    "Señas Particulares",
    "Vestimenta",
    "Fecha de Desaparición",
    "Lugar de Desaparición",
    "Teléfono"
]

for i, texto in enumerate(campos):

    Label(
        frame,
        text=texto
    ).grid(
        row=i,
        column=0,
        sticky="w"
    )

nombre = Entry(frame, width=40)
edad = Entry(frame, width=40)
sexo = Entry(frame, width=40)
estatura = Entry(frame, width=40)
peso = Entry(frame, width=40)
ojos = Entry(frame, width=40)
cabello = Entry(frame, width=40)
nariz = Entry(frame, width=40)
boca = Entry(frame, width=40)
senas = Entry(frame, width=40)
vestimenta = Entry(frame, width=40)
fecha = Entry(frame, width=40)
lugar = Entry(frame, width=40)
telefono = Entry(frame, width=40)

entradas = [
    nombre,
    edad,
    sexo,
    estatura,
    peso,
    ojos,
    cabello,
    nariz,
    boca,
    senas,
    vestimenta,
    fecha,
    lugar,
    telefono
]

for i, entrada in enumerate(entradas):

    entrada.grid(
        row=i,
        column=1,
        padx=10,
        pady=2
    )

# ==========================
# BOTONES
# ==========================

Button(
    ventana,
    text="Registrar",
    width=20,
    command=registrar
).pack(pady=5)

Button(
    ventana,
    text="Total Registrados",
    width=20,
    command=total
).pack(pady=5)

# ==========================
# BUSQUEDA
# ==========================

Label(
    ventana,
    text="Buscar por nombre"
).pack()

busqueda = Entry(
    ventana,
    width=40
)

busqueda.pack()

Button(
    ventana,
    text="Buscar",
    command=buscar
).pack()

# ==========================
# LISTA
# ==========================

lista = Listbox(
    ventana,
    width=120,
    height=12
)

lista.pack(pady=10)

Button(
    ventana,
    text="Eliminar Registro",
    command=eliminar
).pack()

ventana.mainloop()