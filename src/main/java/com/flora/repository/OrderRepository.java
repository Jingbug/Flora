package com.flora.repository;

import com.flora.entity.CartEntity;
import com.flora.entity.OrderEntity;
import com.flora.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findCartEntitiesByUserSeq(UserEntity user_seq);
}
