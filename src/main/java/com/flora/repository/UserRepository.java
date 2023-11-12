package com.flora.repository;

import com.flora.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // 입력 받은 유저의 아이이로 해당 데이터 리턴
    Optional<UserEntity> findByUserId(String id);

    // 입력 받은 유저의 이름으로 해당 데이터 리턴
    UserEntity findByUserName(String name);

    // 전체 회원목록 조회
    List<UserEntity> findAll();
}
