FEATURE_FLAGS = { 
        "EMBEDDED_SUPERSET": True
    }

ENABLE_JWT_AUTH = True 

# CORS Enabling 
ENABLE_CORS = True 
ENABLE_PROXY_FIX = True

TALISMAN_CONFIG = {
    "force_https": False,
    "frame_options": None,  # Correct way to remove X-Frame-Options
    "content_security_policy": {
        "frame-ancestors": "*",  # Allow embedding from any origin
    }
}

CORS_OPTIONS = {
    "supports_credentials": True, 
    "allow_headers": ["Content-Type", "Authorization", "X-CSRFToken"],
    "expose_headers": ["Content-Type", "X-CSRFToken"],
    "resources": [r"/*"],
    "Access-Control-Allow-Origin": ["*"],
    "origins": ["http://localhost:3000","http://localhost:4000"],
}


# Dashboard embedding 
GUEST_ROLE_NAME = "Gamma" 
GUEST_TOKEN_JWT_SECRET = "RANDOM STRONG" # ex: qwertyuiopasdfghjklzxcvbnm
GUEST_TOKEN_JWT_ALGO = "HS256" 
GUEST_TOKEN_HEADER_NAME = "X-GuestToken" 
GUEST_TOKEN_JWT_EXP_SECONDS = 1300 