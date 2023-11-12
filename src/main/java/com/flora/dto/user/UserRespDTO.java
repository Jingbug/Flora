package com.flora.dto.user;

import com.flora.entity.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRespDTO {
    private Long seq;
    private String userId;
    //private String password;
    private String userName;
    private String tel;
    private String email;

    public UserRespDTO(UserEntity entity){
        this.seq = entity.getSeq();
        this.userId = entity.getUserId();
        this.userName = entity.getUserName();
        this.tel = entity.getTel();
        this.email = entity.getEmail();
    }
}
