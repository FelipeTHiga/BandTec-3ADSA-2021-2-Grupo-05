package com.veganhouse.productsCommander;

import com.veganhouse.domain.Product;
import com.veganhouse.repository.IProductRepository;
import com.veganhouse.utils.Stack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductCommander {
    private Stack<Command> commands;
    private Stack<Command> undoneCommands;

    @Autowired
    private IProductRepository productRepository;

    public ProductCommander() {
        this.commands = new Stack(10);
        this.undoneCommands = new Stack(10);
    }

    public void pushCommand(String action, Product product){
        commands.push(new Command (action, product));
    }

    public void undo(){
        Command lastAction = (Command) commands.pop();
        Product product = lastAction.getChangedProduct();

        if("delete".equals(lastAction.getAction())) {
            product.setAvaliable(true);
            productRepository.save(product);
        } else {
            product.setAvaliable(false);
            productRepository.save(product);
        }


        undoneCommands.push(lastAction);
    }

    public void redo(){
        Command lastAction = (Command) undoneCommands.pop();
        Product product = lastAction.getChangedProduct();

        if("create".equals(lastAction.getAction())) {
            product.setAvaliable(true);
            productRepository.save(product);
        } else {
            product.setAvaliable(false);
            productRepository.save(product);
        }
        commands.push(lastAction);
    }

}
