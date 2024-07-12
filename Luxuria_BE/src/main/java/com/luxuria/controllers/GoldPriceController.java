package com.luxuria.controllers;

import com.luxuria.services.XmlToJsonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import com.fasterxml.jackson.databind.JsonNode;

@RestController
@RequestMapping("/api/v1/gold_price")
@RequiredArgsConstructor
public class GoldPriceController {

    private final XmlToJsonService xmlToJsonService;

    @GetMapping()
    public Mono<JsonNode> getGoldPrices() {
        return xmlToJsonService.getGoldPrices();
    }
}
