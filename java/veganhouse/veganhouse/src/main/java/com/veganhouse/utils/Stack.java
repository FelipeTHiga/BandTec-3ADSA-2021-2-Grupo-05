package com.veganhouse.utils;

public class Stack<T> {
    // Atributos
    private int top;
    private Object[] stack;

    // Construtor
    public Stack(int stackLimit) {
        top = -1;
        stack = new Object[stackLimit];
    }

    // Métodos
    public boolean isEmpty() {
        return top == -1;
    }

    public boolean isFull() {
        return top == stack.length - 1;
    }

    public void push(Object info) {
        if (!isFull())
            stack[++top] = info;
        else
            System.out.println("Pilha cheia");
    }

    public Object pop() {
        if (isEmpty())
            return null;

        return stack[top--];
    }

    public Object peek() {
        if (isEmpty())
            return null;

        return stack[top];
    }

    public void listAll() {
        if (isEmpty())
            System.out.println("Pilha vazia!");

        for (int i = top; i > -1; --i)
            System.out.println(stack[i]);
    }

}

