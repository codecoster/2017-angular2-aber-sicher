package de.trion.sample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
public class JwtConfiguration
{
    @Value("${security.oauth2.resource.jwt.keyValue}")
    String publicKey;    
    
    @Autowired
    JwtAccessTokenConverter jwtAccessTokenConverter;

    @Bean
    protected JwtAccessTokenConverter jwtAccessTokenConverter()
    {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setVerifierKey(publicKey);
        return converter;
    }
    
    @Bean
    @Qualifier("tokenStore")
    public TokenStore tokenStore()
    {
        //We ONLY accept JWT tokens this way
        //the other option is to use a RemoteTokenServices
        return new JwtTokenStore(jwtAccessTokenConverter);
    }

}
