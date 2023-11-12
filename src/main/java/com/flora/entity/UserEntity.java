package com.flora.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    // 프런트 valueName과 일치해야함.

    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // AI
    private Long seq;

    @Column(unique = true, length = 10)
    private String userId;

    @JsonIgnore  // json리턴 시 제외
    @Column(nullable = false, length = 20)
    private String password;

    @Column
    private String userName;

    @Column
    private String tel;

    @Column
    private String email;
}
