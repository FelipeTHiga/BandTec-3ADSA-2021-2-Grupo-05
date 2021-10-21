package com.veganhouse.exports;

import com.veganhouse.domain.Product;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Formatter;
import java.util.FormatterClosedException;
import java.util.NoSuchElementException;
import java.util.Scanner;

public class ControllerCsv {
    public static void gravaArquivoCsv (ListaObj<Product> lista, String nomeArq) {
        FileWriter arq = null;
        Formatter saida = null;
        Boolean deuRuim = false;

        nomeArq += ".csv";

        try {
            arq = new FileWriter(nomeArq, true);
            saida = new Formatter(arq);
        }
        catch (IOException erro) {
            System.out.println("Erro ao abrir o arquivo");
            System.exit(1);
        }

        try {
            for (int i = 0; i < lista.getTamanho(); i++) {
                Product product = lista.getElemento(i);
                // Separando cada campo por um ;
                saida.format("%d;%s;%.2f;%d;%s;%s;%s;%d\n",
                        product.getId(),
                        product.getName(),
                        product.getPrice(),
                        product.getInventory(),
                        product.getCategory(),
                        product.getSubCategory(),
                        product.getDescription(),
                        product.getFkUser());
            }
        }
        catch (FormatterClosedException erro) {
            System.out.println("Erro ao gravar arquivo");
            deuRuim = true;
        }
        finally {
            saida.close();
            try {
                arq.close();
            }
            catch (IOException erro) {
                System.out.println("Erro ao fechar o arquivo");
                deuRuim = true;
            }
            if (deuRuim) {
                System.exit(1);
            }
        }
    }


    public static void leExibeArquivoCsv (String nomeArq) {
        FileReader arq = null;      // objeto que representa o arquivo para leitura
        Scanner entrada = null;     // objeto usado para ler do arquivo
        Boolean deuRuim = false;

        nomeArq += ".csv";          // acrescenta a extensão .csv ao nome do arquivo

        // Bloco try-catch para abrir o arquivo
        try {
            arq = new FileReader(nomeArq);
            entrada = new Scanner(arq).useDelimiter(";|\\n");
        }
        catch (FileNotFoundException erro) {
            System.out.println("Arquivo não encontrado");
            System.exit(1);
        }

        // Bloco try-catch para ler do arquivo
        try {
            System.out.printf("%5s %10s %5s %5s %10s %10s %20s %5s\n", "ID", "NOME", "PREÇO", "ESTOQUE", "CATEGORIA", "SUBCATEGORIA", "DESCRIÇÃO", "ID USER");
            while (entrada.hasNext()) {
                Integer id = entrada.nextInt();
                String name = entrada.next();
                Double price = entrada.nextDouble();
                Integer inventory = entrada.nextInt();
                String category = entrada.next();
                String subCategory = entrada.next();
                String description = entrada.next();
                Integer idUser = entrada.nextInt();
                System.out.printf("%05d %10s %5.2f %5d %10s %10s %20s %05d\n", id, name, price, inventory, category, subCategory, description, idUser);
            }
        }
        catch (NoSuchElementException erro) {
            System.out.println("Arquivo com problemas");
            deuRuim = true;
        }
        catch (IllegalStateException erro) {
            System.out.println("Erro na leitura do arquivo");
            deuRuim = true;
        }
        finally {
            entrada.close();
            try {
                arq.close();
            }
            catch (IOException erro) {
                System.out.println("Erro ao fechar arquivo");
                deuRuim = true;
            }
            if (deuRuim) {
                System.exit(1);
            }
        }
    }
}