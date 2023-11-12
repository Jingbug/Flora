package com.flora.service;

import com.flora.dto.order.OrderReqDTO;
import com.flora.entity.OrderEntity;
import com.flora.entity.UserEntity;
import com.flora.repository.OrderRepository;
import com.flora.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class OrderService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public OrderEntity order(OrderReqDTO dto){
        UserEntity userEntity = userRepository.findByUserName(dto.getUserName());  // 해당 주문자의 이름으로 가입된 정보를 가져옴.
        if(userEntity != null){
            dto.setUserSeq(userEntity);
            return orderRepository.save(dto.toEntity(dto));
        }
        else { // 조회 결과가 없다
            throw new IllegalArgumentException("일치하는 아이디가 없습니다!");
        }
    }

    // 회원의 주문 목록 조회
    public List<OrderEntity> findUserOrder(String name) {
        UserEntity userEntity = userRepository.findByUserName(name);

        if(userEntity != null){
            return orderRepository.findCartEntitiesByUserSeq(userEntity);
        }
        else { // 조회 결과가 없다
            throw new IllegalArgumentException("일치하는 아이디가 없습니다!");
        }
    }
}
