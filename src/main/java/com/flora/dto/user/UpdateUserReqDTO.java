package com.flora.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.flora.entity.UserEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@NoArgsConstructor
public class UpdateUserReqDTO {
    private String oldPassword;
    private Long seq;
    private String userId;
    private String password;
    private String userName;
    private String tel;
    private String email;

    public static UserEntity toEntity(UpdateUserReqDTO dto){
        return UserEntity.builder()
                .seq(dto.getSeq())
                .userId(dto.getUserId())
                .password(dto.getPassword())
                .userName(dto.getUserName())
                .tel(dto.getTel())
                .email(dto.getEmail())
                .build();
    }
}
