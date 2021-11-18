package com.veganhouse.checkout.service;

import com.veganhouse.checkout.domain.CartItem;
import com.veganhouse.checkout.domain.Order;
import com.veganhouse.checkout.repository.IOrderRepository;
import com.veganhouse.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    IOrderRepository orderRepository;
    @Autowired
    CartManager cartManager;

    // Criar pedidos
    public Order orderBuilder(User user) {
        Order order = new Order();
        order.setUser(user);
        order.setAdress(user.getAdress());
        order.setOrderItems(cartManager.getUserCartItems(user.getId()));
        order.setDate(LocalDate.now());
        order.setStatus("Pendente");

        double total = 0;
        for (CartItem c : order.getOrderItems()) {
            total += c.getSubTotal();
        }

        order.setTotal(total);

        return order;
    }

    public void createOrder(User user) {
        orderRepository.save(orderBuilder(user));
        cartManager.removeAllUserItems(user.getId());
    }

    // Selecionar pedidos de um usuário
    public List<Order> getUserOrders(int userId) {
        List<Order> orderList = orderRepository.findAll();
        ArrayList<Order> userOrders = new ArrayList();

//        for (Order order:orderList){
//            if(order.getUser().getId()==userId)
//                userOrders.add(order);
//        }

        return orderList.stream()
                .filter(order -> order.getUser().getId() == userId)
                .collect(Collectors.toList());
    }


    // Selecionar pedidos de um seller
    public List<Order> getSellerOrders(int userId) {
        List<Order> orderList = orderRepository.findAll();
        List<Order> sellerOrders =
                orderList.stream().filter(order -> order.getSellers().contains(userId))
                        .collect(Collectors.toList());

//        for(Order order : orderList) {
//            if(order.getSellers().contains(userId))
//                sellerOrders.add(order);
//        }

        for (Order order : sellerOrders) {
            order.setOrderItems(order.getProductsBySeller(userId));
        }

        return sellerOrders;
    }


}
