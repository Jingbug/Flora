package com.flora.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Table(name = "cart")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartEntity {

    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // AI
    private Long seq;

    @Column
    private String flowerName;  // 상품 명

    @Column
    private int price;  // 가격

    @Column
    private String flowerImg;  // 상품 이미지

    @ManyToOne
    @JoinColumn(name = "USER_SEQ")
    private UserEntity userSeq;  // 구매자 정보
}
