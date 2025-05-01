package com.skillvo.course.api.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.skillvo.course.domain.model.enums.Language;
import java.io.IOException;

public class ObjectMapperConfig {
    public static ObjectMapper createObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT, true);
        objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS, true);
        
        SimpleModule module = new SimpleModule();
        module.addDeserializer(Language.class, new JsonDeserializer<Language>() {
            @Override
            public Language deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
                JsonNode node = p.getCodec().readTree(p);
                String value = node.asText();
                if (value == null || value.isEmpty()) {
                    return null;
                }
                try {
                    return Language.valueOf(value.toUpperCase());
                } catch (IllegalArgumentException e) {
                    return null;
                }
            }
        });
        objectMapper.registerModule(module);
        
        return objectMapper;
    }
} 