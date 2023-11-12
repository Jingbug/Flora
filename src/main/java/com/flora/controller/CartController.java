package com.flora.controller;

import com.flora.dto.Response;
import com.flora.dto.cart.CartReqDTO;
import com.flora.dto.order.OrderReqDTO;
import com.flora.dto.user.UserRespDTO;
import com.flora.entity.CartEntity;
import com.flora.entity.OrderEntity;
import com.flora.service.CartService;
import com.flora.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = {"장바구니 관련"}, description = "장바구니 관련")
@RestController
@RequiredArgsConstructor  // 사용하는 객체에 맞는 생성자 생성
@Log4j2
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;

    @PostMapping("/new")
    @ApiOperation(value = "장바구니에 추가")
    public Response<?> order(@RequestBody CartReqDTO dto){
        CartEntity result;
        try {
            result = cartService.order(dto);
        } catch (Exception e){
            return new Response<>(HttpStatus.NOT_FOUND, "로그인 사용자 조회 실패", null);
        }
        return new Response<>(HttpStatus.OK,"장바구니 추가 완료", result);
    }

    @DeleteMapping("/del/{seq}")
    @ApiOperation(value = "아이템 삭제")
    public Response<?> deleteItem(@PathVariable Long seq){
        boolean result = cartService.deleteItem(seq);
        return new Response<>(HttpStatus.OK, "아이템 삭제 성공", result);

    }

    // 회원의 장바구니 목록 조회
    @GetMapping("/{name}")
    @ApiOperation(value = "회원의 장바구니 리스트")
    public Response<?> list(@PathVariable String name){
        List<CartEntity> list;
        //CartEntity list;
        try {
            list = cartService.findUserCart(name);
        } catch (IllegalArgumentException e){
            return new Response<>(HttpStatus.NOT_FOUND, "회원 조회 실패", null);
        }
        return new Response<>(HttpStatus.OK, "회원의 장바구니 리스트", list);
    }

}
