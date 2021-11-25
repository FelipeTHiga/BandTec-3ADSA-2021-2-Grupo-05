package com.veganhouse.checkout.service;

import com.veganhouse.checkout.domain.CartItem;
import com.veganhouse.checkout.repository.ICartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PatchMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartManager {
    @Autowired
    private ICartItemRepository cartItemsRepository;

    // Adicionar item no carrinho
    public void addItem(int idUser, CartItem cartItem){
        cartItem.setFkUser(idUser);
        cartItem.setSubTotal(cartItem.getSubTotal());
        cartItemsRepository.save(cartItem);
    }
    // Remover item do carrinho
    public boolean removeItem(int cartItemId){
        boolean success = false;
        if (cartItemsRepository.existsById(cartItemId)){
            cartItemsRepository.deleteById(cartItemId);
            success = true;
        }
        return success;
    }

    public void removeAllUserItems(int userId){
        List<CartItem> userCartItems = cartItemsRepository.findByFkUser(userId);

        for (CartItem cartItem: userCartItems)
            cartItemsRepository.deleteById(cartItem.getIdCartItem());
    }

    public void updateOrderId(CartItem c){
        cartItemsRepository.save(c);
    }

    //Retornar itens do carrinho
    public List<CartItem> getAllUserCartItems(int idUser){
        return cartItemsRepository.findByFkUser(idUser);
    }

    public List<CartItem> getAllUserCartItemsWithoutOrder(int idUser){
        return cartItemsRepository.findByFkUser(idUser).stream().filter(cartItem -> cartItem.getFkOrder() == 0).collect(Collectors.toList());
    }

    // Alterar quantidade de itens
    public boolean incrementItemQuantity(int cartItemId){
        boolean success = false;
        if (cartItemsRepository.existsById(cartItemId)){
            CartItem cartItem =  cartItemsRepository.getById(cartItemId);
            double productPrice = cartItem.getProduct().getPrice();

            cartItem.setQuantity(cartItem.getQuantity()+1);
            cartItem.setSubTotal(cartItem.getQuantity()*productPrice);

            cartItemsRepository.save(cartItem);
            success = true;
        }
        return success;
    }

    public boolean decrementItemQuantity(int cartItemId){
        boolean success = false;
        if (cartItemsRepository.existsById(cartItemId)){
            CartItem cartItem =  cartItemsRepository.getById(cartItemId);
            double productPrice = cartItem.getProduct().getPrice();

            if(cartItem.getQuantity()-1<=0) {
                return false;
            }

            cartItem.setQuantity(cartItem.getQuantity()-1);
            cartItem.setSubTotal(cartItem.getQuantity()*productPrice);

            cartItemsRepository.save(cartItem);
            success = true;
        }
        return success;
    }
}
