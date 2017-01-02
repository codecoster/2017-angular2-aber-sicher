package de.trion.sample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter
{
    @Value("${security.oauth2.resource.id}")
    String resourceId;    

    @Autowired
    TokenStore tokenStore;

    @Override
    public void configure(HttpSecurity http) throws Exception
    {
        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS, "/protected/**").permitAll()//CORS requests
            .antMatchers("/protected/**").authenticated()
            .antMatchers("/**").anonymous();
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer serverSecurityConfigurer) throws Exception
    {
        serverSecurityConfigurer.resourceId("service").tokenStore(tokenStore);
    }
    
}
