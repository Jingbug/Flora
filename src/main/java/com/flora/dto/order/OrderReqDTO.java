package com.flora.dto.order;

import com.flora.entity.OrderEntity;
import com.flora.entity.UserEntity;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class OrderReqDTO {
    private LocalDate date;  // 구매일자 자동삽입
    private String flowerName;  // 상품 명
    private int price;          // 가격
    private String flowerImg;   // 상품 이미지
    private String userName;    // 구매자 이름 (프런트에서 전달 받음)
    private String postNum;     // 우편번호
    private String address;     // 기본주소
    private String detailAddress;   // 상세주소
    private String fromUser; // 받는 사람
    private String fromUserTel;  // 받는 사람 전화번호
    private int status;         // 주문 상태 자동 삽입 defaul = 0
    private String paymentKey; // 결제 성공 시 리턴되는 키 값
    private UserEntity userSeq;  // 프런트에서 전달 받은 구매자 이름을 기준으로 주문자의 정보를 받아옴.

    public static OrderEntity toEntity(OrderReqDTO dto){
        return OrderEntity.builder()
                .date(LocalDate.now())
                .flowerName(dto.getFlowerName())
                .price(dto.getPrice())
                .flowerImg(dto.getFlowerImg())
                .postNum(dto.getPostNum())
                .address(dto.getAddress())
                .detailAddress(dto.getDetailAddress())
                .fromUser(dto.getFromUser())
                .fromUserTel(dto.getFromUserTel())
                .status(0)
                .paymentKey(dto.getPaymentKey())
                .userSeq(dto.getUserSeq())
                .build();
    }
}
