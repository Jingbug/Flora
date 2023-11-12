package com.flora.service;

import com.flora.dto.user.UpdateUserReqDTO;
import com.flora.dto.user.UserRespDTO;
import com.flora.dto.user.LoginReqDTO;
import com.flora.dto.user.SignUpReqDTO;
import com.flora.entity.UserEntity;
import com.flora.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserEntity signUp(SignUpReqDTO dto) {
        // reqository의 save메소드 호출 ( entity객체를 넘겨줘야 함 )
        // 1. Dto -> entity 변환 toEntity() 메소드
        // 2. reqository의 save메소드 호출
        UserEntity entity = dto.toEntity(dto);

        log.info("UserService signUp : 회원가입 로직 실행됨.");
        return userRepository.save(entity);
    }

    public Boolean checkId(String id) {
        Optional<UserEntity> byUserId = userRepository.findByUserId(id);
        if (byUserId.isPresent()) {
            // id가 있을경우
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        } else
            return true;
    }

    public UserEntity login (LoginReqDTO dto){
        // 1. 회원이 입력한 아이디를 db조회
        // 2. db에서 조회한 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 확인
        Optional<UserEntity> byId = userRepository.findByUserId(dto.getUserId());  // Entity객체를 Optional로 한번 더 감싼것임 로그인 유저가 입력한 id가 db에 있는지 확인 값이 있으면 전체 컬럼 값 리턴

        if(byId.isPresent()){ // 조회 결과가 있다.  id 존재 여부만 확인한 것이고, 비밀번호 대조는 아직 안한것임
            UserEntity userEntity = byId.get(); // Optional객체를 Entity객체화 하는 과정
            if(userEntity.getPassword().equals(dto.getPassword())) { // 입력받은 비밀번호와 db의 비밀번호 일치여부 확인
                // 비밀번호 일치
                return userEntity;
            }else{
                // 비밀번호 불일치
                throw new IllegalArgumentException("비밀번호가 일치하지 않습니다!");
            }
        }else{ // 조회 결과가 없다
            throw new IllegalArgumentException("일치하는 아이디가 없습니다!");
        }
    }

    public List<UserRespDTO> findAll() {
        // 회원 리스트 조회
        List<UserEntity> all = userRepository.findAll();  // repository 클래스의 리턴은 무조건 Entity타입
        List<UserRespDTO> userList = new ArrayList<>();
        for (UserEntity userEntity : all) {
            userList.add(new UserRespDTO(userEntity));
        }
        return userList;
    }

    public UserRespDTO userDetail(String id) {
        // id를 기준으로 회원 상세 조회
        Optional<UserEntity> byId = userRepository.findByUserId(id);   // 회원 Id를 기준으로 db조회

        if (byId.isPresent()){  // 조회 성공
            return new UserRespDTO(byId.get());
        }else{  // 조회 결과가 없다
            throw new NullPointerException("해당 회원을 찾을 수 없습니다.");
        }
    }

    // 회원정보 수정 요청
    @Transactional
    public UserEntity update(UpdateUserReqDTO dto) {
        String oldPw = dto.getOldPassword();
        UserEntity oldInfo = userRepository.findByUserName(dto.getUserName());

        if(oldInfo.getPassword().equals(oldPw)){
            // 기존 비밀번호가 일치할 경우 정보수정 진행.
            UserEntity updateInfo = dto.toEntity(dto);
            return userRepository.save(updateInfo);
        } else {
            // 기존 비밀번호가 일치하지 않을 경우
            throw new IllegalArgumentException("기존 비밀번호가 일치하지 않습니다!");
        }
    }
}
