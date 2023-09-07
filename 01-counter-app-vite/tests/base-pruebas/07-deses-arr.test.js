import { retornaArreglo } from "../../src/base-pruebas/07-deses-arr";

describe('Pruebas en 07-deses-arr', () => { 

    test('Debe de retornar un String y un número', () => { 

        const [letters, number] = retornaArreglo();

        expect(typeof letters).toBe("string")
        expect(typeof number).toBe("number")

        expect(letters).toStrictEqual(expect.any(String))

     })

 })