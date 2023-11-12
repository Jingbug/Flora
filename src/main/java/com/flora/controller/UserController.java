package com.flora.controller;

import com.flora.dto.user.UpdateUserReqDTO;
import com.flora.dto.user.UserRespDTO;
import com.flora.dto.user.LoginReqDTO;
import com.flora.dto.Response;
import com.flora.dto.user.SignUpReqDTO;
import com.flora.entity.UserEntity;
import com.flora.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = {"회원 관련"}, description = "회원 관련")
@RestController
@RequiredArgsConstructor  // 사용하는 객체에 맞는 생성자 생성
@Log4j2
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    // 생성자 주입 사용
    // --- 회원가입 및 로그인 관련

    // 회원가입 페이지에서 submit 했을 때 요청 처리
    @PostMapping("/signUp")
    @ApiOperation(value = "회원가입")
    public Response<?> signUp(@RequestBody SignUpReqDTO dto){
        return new Response<>(HttpStatus.CREATED, "가입 성공", userService.signUp(dto));
    }

    @GetMapping("/checkId/{id}")
    @ApiOperation(value = "아이디 중복 확인")
    public Response<?> checkId(@PathVariable String id){
        Boolean status;
        try{
            status = userService.checkId(id);
        } catch (Exception e){
            return new Response<>(HttpStatus.NOT_FOUND, "사용중인 아이디", null);
        }
        return new Response<>(HttpStatus.OK, "사용 가능한 아이디", status);
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인 로직")
    public Response<?> login (@RequestBody LoginReqDTO dto){
        UserEntity result;
        try{
            result = userService.login(dto);
        } catch (Exception e) {
            return new Response<>(HttpStatus.NOT_FOUND, "로그인 실패", null);
        }
        return new Response<>(HttpStatus.OK, "로그인 성공!", result);
    }

    // 회원목록 조회
    @GetMapping("/list")
    @ApiOperation(value = "회원 리스트")
    public Response<?> list(){
        List<UserRespDTO> list = userService.findAll();
        return new Response<>(HttpStatus.OK, "회원 리스트", list);
    }

    // 회원상세 조회
    @GetMapping("/{id}")
    @ApiOperation(value = "회원 상세조회( 회원 id를 값으로 전달 )")
    public Response<?> userDetail(@PathVariable String id){  // rest API 방식을 이용할 때 즉 경로상의 값을 가져올 때 PathVariable사용
        UserRespDTO dto;
        try{
            dto = userService.userDetail(id);
        } catch (Exception e){
            return new Response<>(HttpStatus.NOT_FOUND, "회원 조회 실패", null);
        }
        return new Response<>(HttpStatus.OK, "회원 조회 성공", dto);
    }

    // 회원정보 수정
    // 회원정보 수정 요청
    @PutMapping("/update")
    @ApiOperation(value = "회원 정보수정 요청")
    public Response<?> updateUser(@RequestBody UpdateUserReqDTO dto){
        UserEntity result;
        try{
            result = userService.update(dto);
        }catch (IllegalArgumentException e){
            return new Response<>(HttpStatus.NOT_FOUND, "기존 비밀번호 불일치", null);
        }
        log.info("userController updateUser Sucess");
        return new Response<>(HttpStatus.OK, "회원정보 수정 완료", result);
    }

/*
    // 회원정보 수정폼에 들어갈 데이터 요청
    @GetMapping("/update/{id}")
    @ApiOperation(value = "정보수정할 회원정보 요청")
    public UserResponseDTO<UserRespDTO> editDetail(@PathVariable String id){  // rest API 방식을 이용할 때 즉 경로상의 값을 가져올 때 PathVariable사용
        UserRespDTO dto = userService.userDetail(id);
        return new UserResponseDTO<>(HttpStatus.OK, dto);
    }
    */
}
