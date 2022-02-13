package com.veganhouse.exports;

import com.veganhouse.TxtService;
import com.veganhouse.domain.Product;
import com.veganhouse.domain.Seller;
import com.veganhouse.domain.User;
import com.veganhouse.repository.IProductRepository;
import com.veganhouse.repository.ISellerRepository;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ControllerTxt {


    @Autowired
    private TxtService txtService;

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

        String header = "00PRODUTO";
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
            body += String.format("%-30.30s", p.getName());
            body += String.format("%07.2f", p.getPrice());
            body += String.format("%03d", p.getInventory());
            body += String.format("%-15.15s", p.getCategory());
            body += String.format("%-1500.1500s ", p.getDescription());
            recordRegister(fileName, body);
            countRegister++;
        }

        // Monta e grava o trailer
        String trailer = "01";
        trailer += String.format("%010d", countRegister);
        recordRegister(fileName, trailer);

    }

    public String readDisplayFileTxt(Seller seller, String fileName) {
        BufferedReader entrada = null;
        String register, registerType;
        Integer countDataRegister = 0;
        Integer recordedRegisters = 0;
        Integer index = 1;

        // Products data
        String name;
        Double price;
        Integer inventory;
        String category;
        String description;
        ListaObj<Product> readList = new ListaObj<Product>(10);
        QueueCircularObj productQueue = new QueueCircularObj(10);

        // Seller data
        String commercialName = null;
        String cnpj = null;

        // Try-catch para abrir o arquivo
        try {
            entrada = new BufferedReader(new FileReader(fileName));
        } catch (IOException erro) {
            System.out.println("Erro ao abrir o arquivo " + erro.getMessage());
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
                    case "03":
                        System.out.println("----------Registro do Body (Produto)----------");
                        name = register.substring(2, 32).trim();
                        price = Double.valueOf(register.substring(32, 39).replace(',', '.'));
                        inventory = Integer.valueOf(register.substring(39, 42));
                        category = register.substring(42, 57).trim();
                        description = register.substring(57, 142).trim();
                        Integer fkSeller = seller.getIdSeller();
                        Boolean isAvaliable = true;
                        Product p = new Product(name, price, category, description, inventory, fkSeller, isAvaliable);
                        productQueue.insert(p);
                        readList.adiciona(p);
                        countDataRegister++;
                        break;
                    case "02":
                        System.out.println("----------Registro do Body (Vendedor)----------");
                        commercialName = register.substring(2, 32).trim();
                        cnpj = register.substring(32, 46);
                        break;
                    case "01":
                        System.out.println("----------Trailer----------");
                        recordedRegisters = Integer.valueOf(register.substring(2, 12));
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

        // Exibir lista
        System.out.println("\n----------Conteúdo lido do arquivo:----------");
        for (int i = 0; i < readList.getTamanho(); i++) {
            Product p = readList.getElemento(i);
            System.out.println(p);
        }

        // VALIDAÇÕES
        if (recordedRegisters != countDataRegister) {
            while (!productQueue.isEmpty()) {
                productQueue.poll();
            }
            System.out.println("Quantidade de registros lidos incompatível com a quantidade de registros gravados");
            return ("Não foi possível realizar o cadastro dos produtos!\nQuantidade de registros lidos incompatível com a quantidade de registros presentes no arquivo txt.");
        } else if (!commercialName.equalsIgnoreCase(seller.getCommercialName()) || !cnpj.equals(seller.getCnpj())) {
            while (!productQueue.isEmpty()) {
                productQueue.poll();
            }
            System.out.println("Dados do vendedor incompatível com os dados do usuário logado");
            return ("Não foi possível realizar o cadastro dos produtos!\nDados do vendedor no arquivo txt incompatível com os dados do usuário logado.");
        } else {
            while (!productQueue.isEmpty()) {
                try {
                    txtService.createProduct((Product) productQueue.poll());
                } catch (Exception erro) {
                    System.out.println(erro.getMessage());
                    System.out.println(String.format("Erro de registro do %d° produto", index));
                    return (String.format("Erro ao cadastrar o %d° produto.\nPor favor, verifique se o registro do produto no arquivo txt segue nosso documento de layout.", index));
                }
                index++;
            }
        }
        return ("Produtos cadastrados com sucesso!");
    }

}
