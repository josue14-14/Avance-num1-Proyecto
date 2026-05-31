registros = []

def registrar():
    nombre = input("Nombre completo: ")
    edad = input("Edad: ")
    sexo = input("Sexo: ")
    lugar = input("Lugar de desaparición: ")

    persona = {
        "nombre": nombre,
        "edad": edad,
        "sexo": sexo,
        "lugar": lugar
    }

    registros.append(persona)

    print("\nPersona registrada correctamente.\n")


def mostrar():
    if len(registros) == 0:
        print("\nNo hay registros.\n")
        return

    print("\n--- REGISTROS ---")

    for i, persona in enumerate(registros):
        print(
            f"{i+1}. {persona['nombre']} | "
            f"{persona['edad']} años | "
            f"{persona['lugar']}"
        )

    print()


def buscar():
    nombre = input("Nombre a buscar: ").lower()

    encontrado = False

    for persona in registros:
        if nombre in persona["nombre"].lower():
            print(
                f"{persona['nombre']} | "
                f"{persona['edad']} años | "
                f"{persona['lugar']}"
            )
            encontrado = True

    if not encontrado:
        print("No se encontraron registros.")


def eliminar():
    mostrar()

    if len(registros) == 0:
        return

    indice = int(input("Número de registro a eliminar: ")) - 1

    if 0 <= indice < len(registros):
        del registros[indice]
        print("Registro eliminado.")
    else:
        print("Número inválido.")


def total():
    print(f"\nTotal de personas registradas: {len(registros)}\n")


while True:

    print("\n===== SISTEMA DE PERSONAS DESAPARECIDAS =====")
    print("1. Registrar")
    print("2. Mostrar registros")
    print("3. Buscar")
    print("4. Eliminar")
    print("5. Total registrados")
    print("6. Salir")

    opcion = input("Seleccione una opción: ")

    if opcion == "1":
        registrar()

    elif opcion == "2":
        mostrar()

    elif opcion == "3":
        buscar()

    elif opcion == "4":
        eliminar()

    elif opcion == "5":
        total()

    elif opcion == "6":
        print("Programa finalizado.")
        break

    else:
        print("Opción no válida.")