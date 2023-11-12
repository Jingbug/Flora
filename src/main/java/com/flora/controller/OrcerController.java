package com.flora.controller;

import com.flora.dto.Response;
import com.flora.dto.order.OrderReqDTO;
import com.flora.entity.OrderEntity;
import com.flora.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = {"주문 관련"}, description = "주문 관련")
@RestController
@RequiredArgsConstructor  // 사용하는 객체에 맞는 생성자 생성
@Log4j2
@RequestMapping("/api/order")
public class OrcerController {
    private final OrderService orderService;

    @PostMapping("/new")
    @ApiOperation(value = "신규 주문")
    public Response<?> order(@RequestBody OrderReqDTO dto){
        OrderEntity result;
        try {
            result = orderService.order(dto);
        } catch (Exception e){
            return new Response<>(HttpStatus.NOT_FOUND, "사용자 조회 실패", null);
        }
        return new Response<>(HttpStatus.OK,"주문 완료", result);
    }

    // 회원의 주문 목록 조회
    @GetMapping("/{name}")
    @ApiOperation(value = "회원의 장바구니 리스트")
    public Response<?> list(@PathVariable String name){
        List<OrderEntity> list;
        try{
            list = orderService.findUserOrder(name);
        }catch (Exception e){
            return new Response<>(HttpStatus.NOT_FOUND, "회원 조회 실패", null);
        }
        return new Response<>(HttpStatus.OK, "회원의 구매목록 리스트", list);
    }
}
