package com.veganhouse.exports;

import com.veganhouse.domain.Product;
import com.veganhouse.repository.ISellerRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ControllerTxt {

    @Autowired
    private ISellerRepository sellerRepository;

    public static void recordRegister(String fileName, String registro) {
        BufferedWriter saida = null;

        // Try-catch para abrir o arquivo
        try {
            saida = new BufferedWriter(new FileWriter(fileName, true));
        } catch (IOException erro) {
            System.out.println("Erro ao abrir o arquivo" + erro.getMessage());
        }

        // Try-catch para fechar o arquivo
        try {
            saida.append(registro + "\n");
            saida.close();
        } catch (IOException erro) {
            System.out.println("Erro ao fechar o arquivo" + erro.getMessage());
        }
    }

    public static void recordFileTxt(ListaObj<Product> list, String fileName) {
        fileName += ".txt";
        int countRegister = 0;

        String header = "00PRODUTOS";
        Date dataHora = new Date();
        SimpleDateFormat anoMesFormatado = new SimpleDateFormat("MM-yyyy");
        SimpleDateFormat dataFormatada = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        header += anoMesFormatado.format(dataHora);
        header += dataFormatada.format(dataHora);
        header += "01";

        // Grava o registro da header
        recordRegister(fileName, header);

        // Grava o body
        String body;
        for (int i = 0; i < list.getTamanho(); i++) {
            Product p = list.getElemento(i);
            body = "02";
            body += String.format("%05d", p.getId());
            body += String.format("%-30.30s", p.getName());
            body += String.format("%05.2f", p.getPrice());
            body += String.format("%03d", p.getInventory());
            body += String.format("%-30.30s", p.getCategory());
            body += String.format("%-30.30s", p.getSubCategory());
            body += String.format("%-255.255s ", p.getDescription());
            body += String.format("%05d", p.getFkSeller());

            recordRegister(fileName, body);
            countRegister++;
        }

        // Monta e grava o trailer
        String trailer = "01";
        trailer += String.format("%010d", countRegister);
        recordRegister(fileName, trailer);

    }

    public static void readDisplayFileTxt(String fileName) {
        fileName += ".txt";
        BufferedReader entrada = null;
        String register, registerType;
        Integer countDataRegister = 0;
        Integer recordedRegisters;

        // Products data
        String name;
        Double price;
        Integer inventory;
        String category;
        String subCategory;
        String description;
        ListaObj<Product> readList = new ListaObj<Product>(10);
        QueueCircularObj productQueue = new QueueCircularObj(10);

        // Seller data
        String commercialName;
        String cnpj;

        // Try-catch para abrir o arquivo
        try {
            entrada = new BufferedReader(new FileReader(fileName));
        } catch (IOException erro) {
            System.out.println("Erro ao abrir o arquivo" + erro.getMessage());
        }

        try {
            register = entrada.readLine();

            while (register != null) {
                registerType = register.substring(0, 2); // posição 0 e 1

                switch (registerType) {
                    case "00":
                        System.out.println("----------Header----------");
                        System.out.println("Tipo do arquivo: " + register.substring(2, 9));
                        System.out.println("Ano/Mês de Referência: " + register.substring(9, 16));
                        System.out.println("Data/Hora de geração do arquivo: " + register.substring(16, 35));
                        System.out.println("Versão de layout: " + register.substring(35, 37));
                        break;
                    case "02":

                        commercialName = register.substring(2, 32);
                        cnpj = register.substring(32, 50);

//                        if(!(sellerRepository.findByCommercialName(commercialName) || sellerRepository.findByCnpj(cnpj))) {
//                        entrada.close();
//                    } else {
//                            fkSeller =
//                        }



                        System.out.println("----------Registro do Body (Produto)----------");
                        name = register.substring(2, 32).trim();
                        price = Double.valueOf(register.substring(32, 39).replace(',', '.'));
                        inventory = Integer.valueOf(register.substring(39, 42));
                        category = register.substring(42, 72).trim();
                        subCategory = register.substring(72, 102).trim();
                        description = register.substring(102, 357).trim();

                        productQueue.insert(new Product(name, price, category, subCategory, description, inventory));
                        countDataRegister++;
                        break;
                    case "03":
                        System.out.println("----------Registro do Body (Vendedor)----------");
                        commercialName = register.substring(2, 32);
                        cnpj = register.substring(32, 50);
                        break;
                    case "01":
                        System.out.println("----------Trailer----------");
                        recordedRegisters = Integer.valueOf(register.substring(2, 12));

                        if(recordedRegisters != countDataRegister) {
                            while(!productQueue.isEmpty()) {
                                productQueue.poll();
                            }
                            System.out.println("Quantidade de registros lidos incompatível com a quantidade de registros gravados");
                            entrada.close();
                        } else {

//                            productQueue
                        }
                        break;
                    default:
                        System.out.println("Tipo de registro inválido");
                        break;
                }

                register = entrada.readLine();
            }

            entrada.close();
        } catch (IOException erro) {
            System.out.println("Erro ao ler arquivo: " + erro.getMessage());
        }

//        System.out.println("\n----------Conteúdo lido do arquivo:----------\n");
//        for (int i = 0; i < readList.getTamanho(); i++) {
//            Product p = readList.getElemento(i);
//            System.out.println(p);
//        }
//        String messenger = recordedRegisters == countDataRegister ?
//                "Quantidade de registros lidos compatível com a quantidade de registros gravados"
//                : "Quantidade de registros lidos incompatível com a quantidade de registros gravados";
//        System.out.println(messenger);
    }

}
