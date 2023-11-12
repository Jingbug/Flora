package com.flora.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@JsonInclude(JsonInclude.Include.NON_NULL) // null값을 가진 필드는 응답에 포함하지 않음.
@Getter
@AllArgsConstructor
public class Response<T> {
    private HttpStatus status;
    private String message;
    private T data;
}
