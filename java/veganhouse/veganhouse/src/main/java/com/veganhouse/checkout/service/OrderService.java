package com.veganhouse.checkout.service;

import com.veganhouse.checkout.domain.CartItem;
import com.veganhouse.checkout.domain.Order;
import com.veganhouse.checkout.dto.OrderDTO;
import com.veganhouse.checkout.repository.IOrderRepository;
import com.veganhouse.domain.User;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    IOrderRepository orderRepository;
    @Autowired
    CartManager cartManager;
    @Autowired
    IUserRepository userRepository;

    // Criar pedidos
    public Order orderBuilder(User user) {
        Order order = new Order();
        order.setFkUser(user.getId());
        order.setFkAdress(1);
        order.setOrderDate(LocalDate.now());
        order.setOrderStatus("Pendente");

        return order;
    }

    public void createOrder(User user) {
        orderRepository.save(orderBuilder(user));
        int lastOrderId = orderRepository.findAll().stream().findFirst().get().getIdOrder();

        for (CartItem c : cartManager.getUserCartItems(user.getId())){
            if(Objects.isNull(c.getFkOrder()))
                c.setFkOrder(lastOrderId);
        }
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
                .filter(order -> order.getFkUser() == userId)
                .collect(Collectors.toList());
    }


    // Selecionar pedidos de um seller
    public List<OrderDTO> getSellerOrders(int userId) {
        List<Order> orderList = orderRepository.findAll();
        List<OrderDTO> orderDTOList = new ArrayList<>();

        for (Order order : orderList)
            orderDTOList.add(mapOrderDTO(order));

        List<OrderDTO> sellerOrders =
                orderDTOList.stream().filter(order -> order.getSellers().contains(userId))
                        .collect(Collectors.toList());

//        for(Order order : orderList) {
//            if(order.getSellers().contains(userId))
//                sellerOrders.add(order);
//        }

        for (OrderDTO order : orderDTOList) {
            order.setOrderItems(order.getProductsBySeller(userId));
        }

        return sellerOrders;
    }

    private OrderDTO mapOrderDTO(Order order){
        OrderDTO orderDTO= new OrderDTO();

        orderDTO.setIdOrder(order.getIdOrder());
        orderDTO.setAdress(null);
        orderDTO.setUser(userRepository.findById(order.getFkUser()).get());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setOrderStatus(order.getOrderStatus());

       List<CartItem> orderItems = cartManager.getUserCartItems(order.getFkUser())
                .stream()
                .filter(cartItem -> cartItem.getFkOrder()==order.getIdOrder())
               .collect(Collectors.toList());

       orderDTO.setOrderItems(orderItems);

        return orderDTO;
    }

}
