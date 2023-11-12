package com.flora.dto.cart;

import com.flora.entity.CartEntity;
import com.flora.entity.OrderEntity;
import com.flora.entity.UserEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class CartReqDTO {
    private String flowerName;  // 상품 명
    private int price;          // 가격
    private String flowerImg;   // 상품 이미지
    private String userName;    // 구매자 이름 (프런트에서 전달 받음)
    private UserEntity userSeq;  // 프런트에서 전달 받은 구매자 이름을 기준으로 주문자의 정보를 받아옴.

    public static CartEntity toEntity(CartReqDTO dto){
        return CartEntity.builder()
                .flowerName(dto.getFlowerName())
                .price(dto.getPrice())
                .flowerImg(dto.getFlowerImg())
                .userSeq(dto.getUserSeq())
                .build();
    }
}
