package com.mmz.msreservas.Feign;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor internalHeaderInterceptor() {
        return template -> template.header("X-Internal-Call", "true");
    }
}
