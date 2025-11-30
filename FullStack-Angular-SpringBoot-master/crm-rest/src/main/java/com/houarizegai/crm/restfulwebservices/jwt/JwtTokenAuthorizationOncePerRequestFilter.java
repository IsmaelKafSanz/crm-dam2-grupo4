package com.houarizegai.crm.restfulwebservices.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtTokenAuthorizationOncePerRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService jwtInMemoryUserDetailsService;

    @Value("${jwt.get.token.uri}")
    private String authenticationPath;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // No aplicar filtro JWT al endpoint de autenticación
        return request.getServletPath().equals(authenticationPath);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        logger.info("=== JWT FILTER DEBUG ===");
        logger.info("Request URI: " + request.getRequestURI());
        
        final String authHeader = request.getHeader("Authorization");
        logger.info("Authorization header present: " + (authHeader != null));
        
        if (authHeader != null) {
            logger.info("Authorization header value (first 20 chars): " + authHeader.substring(0, Math.min(20, authHeader.length())));
        }

        String username = null;
        String jwtToken = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwtToken = authHeader.substring(7);
            logger.info("JWT Token extracted (first 20 chars): " + jwtToken.substring(0, Math.min(20, jwtToken.length())));
            
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
                logger.info("✅ Username extracted from token: " + username);
                
                // Validar que el token no haya expirado
                if (jwtTokenUtil.isTokenExpired(jwtToken)) {
                    logger.error("❌ JWT Token ha expirado");
                    username = null;
                } else {
                    logger.info("✅ Token NOT expired");
                }
            } catch (Exception e) {
                logger.error("❌ Error al procesar el token JWT: " + e.getMessage());
                e.printStackTrace();
            }
        } else {
            logger.warn("⚠️ No Bearer token found in Authorization header");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            logger.info("✅ Creating authentication for user: " + username);

            // CARGAR LAS AUTHORITIES DEL USUARIO
            UserDetails userDetails = jwtInMemoryUserDetailsService.loadUserByUsername(username);
            logger.info("✅ User authorities: " + userDetails.getAuthorities());

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authToken);
            logger.info("✅ Authentication set in SecuSrityContext with authorities");
        } else if (username == null) {
            logger.warn("⚠️ Username is null, no authentication will be set");
        } else {
            logger.info("ℹ️ Authentication already exists in SecurityContext");
        }

        filterChain.doFilter(request, response);
    }
}
