package com.flora.service;

import com.flora.dto.user.UpdateUserReqDTO;
import com.flora.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserServiceTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Test
    void 정보_수정(){
        UpdateUserReqDTO dto = new UpdateUserReqDTO();
        dto.setUserId("user1");
        dto.setSeq(4L);
        dto.setUserName("kim eun ji");
        dto.setTel("01012345678");
        dto.setEmail("user1@naver.com");
        dto.setPassword("12345");

        userRepository.save(dto.toEntity(dto));
    }

}