package com.veganhouse.checkout.service;

import com.veganhouse.checkout.domain.CartItem;
import com.veganhouse.checkout.domain.OrderVh;
import com.veganhouse.checkout.dto.OrderDTO;
import com.veganhouse.checkout.repository.IOrderRepository;
import com.veganhouse.domain.Adress;
import com.veganhouse.domain.Product;
import com.veganhouse.domain.User;
import com.veganhouse.repository.IAdressRepository;
import com.veganhouse.repository.IUserRepository;
import com.veganhouse.services.ProductService;
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
    @Autowired
    IAdressRepository adressRepository;
    @Autowired
    private ProductService productService;


    //Atulizar status do pedido
    public void updateStatus(String status, int order){
        OrderVh orderVh= orderRepository.findById(order).get();
        orderVh.setOrderStatus(status);
        orderRepository.save(orderVh);
    }

    // Criar pedidos
    public OrderVh orderBuilder(User user, Integer fkSeller) {
        OrderVh orderVh = new OrderVh();
        List<CartItem> cartItemListBySeller = cartManager.getAllUserCartItemsWithoutOrder(user.getId());
        List<Product> productList = cartManager.getSellersProductsFromCart(cartItemListBySeller,fkSeller);
        orderVh.setUser(user);
        orderVh.setAdress(user.getAdress());
        orderVh.setOrderDate(LocalDate.now());
        orderVh.setOrderStatus("Pendente");
        orderVh.setTotal(cartItemListBySeller.stream().mapToDouble(CartItem::getSubTotal).sum());
        return orderVh;
    }

    public void createOrder(User user) {
        List<CartItem> cartItemList = cartManager.getAllUserCartItemsWithoutOrder(user.getId());

        // criar um order diferente para cada seller
        for(Integer i : getSellersId(cartItemList)){
            orderRepository.save(orderBuilder(user, i));
            int lastOrderId = orderRepository.findAll().stream().skip(orderRepository.count()-1).findFirst().get().getIdOrder();

            for (CartItem c : cartManager.getAllUserCartItemsWithoutOrder(user.getId())){
                if (c.getFkSellerCartItem() == i) {
                    c.setFkOrder(lastOrderId);
                    cartManager.updateOrderId(c);
                }
            }
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

    // Mapeia os pedidos que estão marcados como pendentes
    public List<OrderDTO> getOrdersPending(int idUser){
        List<OrderDTO> mappedOrders = new ArrayList<>();
        List<OrderDTO> userOrderDTO = getUserOrders(idUser);

        for (OrderDTO o : userOrderDTO) {
            if (o.getOrderStatus().equals("Pendente")) {
                mappedOrders.add(o);
            }
        }

        return mappedOrders;
    }

    // Agrupa os order itens dos orders que estão marcados como pendente
    public List<CartItem> getOrderItensByUser(int idUser){
        List<OrderDTO> ordersPending = getOrdersPending(idUser);
        List<CartItem> cartItemList = new ArrayList<>();

        // Percorre os orders e o array de cartItens de cada order
        for (OrderDTO o : ordersPending) {
            for (int i = 0; i < o.getOrderItems().size(); i++) {
                cartItemList.add(o.getOrderItems().get(i));
            }
        }

        return cartItemList;
    }

    // Atualiza o estoque dos produtos
    public void updateOrderItensByUser(int idUser) {
        List<CartItem> cartItemList = getOrderItensByUser(idUser);
        for (CartItem c : cartItemList) {
            productService.updateProduct(c.getProduct(), c.getQuantity());
        }
    }

    public void updateOrderItensByUser(List<CartItem> cartItemList) {
        for (CartItem c : cartItemList) {
            productService.updateProduct(c.getProduct(), c.getQuantity());
        }
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

        Adress buyerAdress = adressRepository.findByFkUser(orderVh.getUser().getId());

        if(Objects.nonNull(buyerAdress)){
            adress = buyerAdress.getStringAdress();
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

    public List<Integer> getSellersId(List<CartItem> cartItemList){
        List<Integer> sellersList = new ArrayList();

        for(CartItem c : cartItemList){
            if(!sellersList.contains(c.getProduct().getFkSeller()))
                sellersList.add(c.getProduct().getFkSeller());
        }

        return sellersList;
    }

    public void deleteOrderByUser(Integer id) {
        orderRepository.deleteByOrderStatusAndUserId("Pendente", id);
    }

}
