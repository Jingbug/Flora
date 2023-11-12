package com.flora.repository;

import com.flora.entity.CartEntity;
import com.flora.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<CartEntity, Long> {

    List<CartEntity> findCartEntitiesByUserSeq(UserEntity user_seq);
}
