package com.luxuria.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class XmlToJsonService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public XmlToJsonService() {
        this.webClient = WebClient.builder()
                .baseUrl("http://api.btmc.vn")
                .build();
        this.objectMapper = new ObjectMapper();
    }

    public Mono<JsonNode> getGoldPrices() {
        return webClient.get()
                .uri("/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v")
                .retrieve()
                .bodyToMono(String.class)
                .map(this::convertStringToJsonNode);
    }

    private JsonNode convertStringToJsonNode(String data) {
        try {
            return objectMapper.readTree(data);
        } catch (Exception e) {
            throw new RuntimeException("Error converting string to JSON", e);
        }
    }
}