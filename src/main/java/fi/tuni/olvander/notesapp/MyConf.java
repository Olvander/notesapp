package fi.tuni.olvander.notesapp;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * A class that implements WebMvcConfigurer interface.
 * For adding CORS mappings.
 *
 * @author  Olli Pertovaara
 * @version 2020.09.06
 * @since   1.8
 */
@Configuration
public class MyConf implements WebMvcConfigurer {
    /**
     * Adds CORS mappings for GET, PUT, POST and DELETE METHODS for all origins.
     *
     * @param registry  The CorsRegistry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
