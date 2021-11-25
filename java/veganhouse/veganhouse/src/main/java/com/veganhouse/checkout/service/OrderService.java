package com.veganhouse.checkout.service;

import com.veganhouse.checkout.domain.CartItem;
import com.veganhouse.checkout.domain.OrderVh;
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
    public OrderVh orderBuilder(User user) {
        OrderVh orderVh = new OrderVh();
        List<CartItem> cartItemList = cartManager.getAllUserCartItemsWithoutOrder(user.getId());
        orderVh.setUser(user);
        orderVh.setAdress(user.getAdress());
        orderVh.setOrderDate(LocalDate.now());
        orderVh.setOrderStatus("Pendente");
        orderVh.setTotal(cartItemList.stream().mapToDouble(CartItem::getSubTotal).sum());
        return orderVh;
    }

    public void createOrder(User user) {
        orderRepository.save(orderBuilder(user));
        int lastOrderId = orderRepository.findAll().stream().skip(orderRepository.count()-1).findFirst().get().getIdOrder();

        for (CartItem c : cartManager.getAllUserCartItemsWithoutOrder(user.getId())){
                c.setFkOrder(lastOrderId);
                cartManager.updateOrderId(c);
        }
    }

    // Selecionar pedidos de um usuário
    public List<OrderDTO> getUserOrders(int userId) {
        List<OrderVh> orderVhList = orderRepository.findAll();
        ArrayList<OrderDTO> userOrderDTO = new ArrayList();


//        for (Order order:orderList){
//            if(order.getUser().getId()==userId)
//                userOrders.add(order);
//        }
        for(OrderVh o : orderVhList.stream()
                .filter(orderVh -> orderVh.getUser().getId() == userId)
                .collect(Collectors.toList())){
            userOrderDTO.add(mapOrderDTO(o));
        }
        return userOrderDTO;
    }


    // Selecionar pedidos de um seller
    public List<OrderDTO> getSellerOrders(int userId) {
        List<OrderVh> orderVhList = orderRepository.findAll();
        List<OrderDTO> orderDTOList = new ArrayList<>();

        for (OrderVh orderVh : orderVhList)
            orderDTOList.add(mapOrderDTO(orderVh));

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

    private OrderDTO mapOrderDTO(OrderVh orderVh){
        OrderDTO orderDTO= new OrderDTO();
        String adress = "Não cadastrado";
        orderDTO.setIdOrder(orderVh.getIdOrder());

        if(Objects.nonNull(orderVh.getAdress())){
            adress = orderVh.getAdress().getStringAdress();
        }

        orderDTO.setAdress(adress);
        orderDTO.setUser(orderVh.getUser());
        orderDTO.setOrderDate(orderVh.getOrderDate());
        orderDTO.setOrderStatus(orderVh.getOrderStatus());

       List<CartItem> orderItems = cartManager.getAllUserCartItems(orderVh.getUser().getId())
                .stream()
                .filter(cartItem -> cartItem.getFkOrder()== orderVh.getIdOrder())
               .collect(Collectors.toList());

       orderDTO.setOrderItems(orderItems);
       orderDTO.setTotal(orderVh.getTotal());

        return orderDTO;
    }

}
