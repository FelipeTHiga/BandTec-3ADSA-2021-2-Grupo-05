package com.veganhouse.exports;

public class QueueCircularObj<T> {

    // Atributos
    private T[] fila;
    private int tamanho;
    private int inicio;
    private int fim;

    // Construtor
    public QueueCircularObj(int capacidade) {
        tamanho = 0;
        inicio = 0;
        fim = 0;
        fila = (T[]) new Object[capacidade];
    }

    // Metodos
    public Boolean isEmpty() {
        return tamanho == 0;
    }

    public Boolean isFull() {
        return tamanho >= fila.length;
    }

    public void insert(T info) {
        if (!isFull()) {
            fila[fim] = info;
            fim = (fim + 1) % fila.length;
            tamanho++;
        }
    }

    public T peek() {
        return fila[inicio];
    }

    public T poll() {
        T primeiro = fila[inicio];
        if (!isEmpty()) {
            inicio = (inicio + 1) % fila.length;
            tamanho--;
        }
        return primeiro;
    }

    public void exibe() {
        if (isEmpty()) {
            System.out.println("Fila vazia");
        } else {
            //int indice = inicio;
            System.out.println("\n----------Fila----------\n");
            for (int i = 0, indice = inicio; i < tamanho; i++) {
                System.out.println(fila[indice]);
                indice = indice + 1 % fila.length;
            }
            System.out.println("\n------------------------\n");
        }
    }
}
