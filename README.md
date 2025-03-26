# Embedded Apache Superset Dashboard

This project demonstrates how to embed an Apache Superset dashboard into a React web application using guest token authentication.

## 🚀 How It Works

### 1️⃣ Dockerized Superset Setup
- Apache Superset is deployed using Docker along with PostgreSQL and Redis.
- A `docker-compose.yml` file defines the services and their configurations.

  command : `docker compose up`.
  
- Superset is configured to allow embedding through feature flags.

### 2️⃣ Superset Configuration
- `superset_config.py` enables embedded dashboards by setting `FEATURE_FLAGS["EMBEDDED_SUPERSET"] = True`.

  ![image](https://github.com/user-attachments/assets/0d8a6c8c-9f67-4231-89bc-e549510c8133)
  
- Copy the embed dashboard ID.

  <img width="404" alt="image" src="https://github.com/user-attachments/assets/190b2ba1-7f65-411d-8bc0-416488e2b255" />

- CORS is enabled to allow communication between the frontend and Superset.
- JWT-based authentication is used to generate guest tokens for embedding.

### 3️⃣ React Frontend Integration
- The frontend (built with React) communicates with Superset's API.
- A login request retrieves an access token.
- A CSRF token is obtained to make secure API calls.
- A guest token is generated to authenticate users for embedded dashboards.
- The `@superset-ui/embedded-sdk` library is used to embed the dashboard inside a React component.

### 4️⃣ Parametric Filtering (Optional)
- Custom filters can be applied to the dashboard dynamically.
- Role-based row-level security (RLS) clauses allow filtering based on user attributes.
- Filters are passed while requesting a guest token, restricting the displayed data.

### 5️⃣ Dashboard Rendering
- Once the guest token is obtained, the dashboard is embedded inside an `<iframe>`.
- The React component manages styling and iframe properties for a seamless user experience.
- The dashboard can be displayed with or without filters based on user preferences.

## 🔗 Key Features
- **Secure embedding** using JWT guest tokens.
- **CORS support** for frontend-backend communication.
- **Parametric filtering** for customized data views.
- **Role-based access control** to restrict user access.
- **Scalable architecture** using Dockerized Superset.

## Output 

![image](https://github.com/user-attachments/assets/335b9ce2-3195-4a94-becd-9d3a1f738ea2)

## 📌 Troubleshooting
- **Superset not embedding?** Check if `FEATURE_FLAGS["EMBEDDED_SUPERSET"]` is enabled.
- **CORS errors?** Verify `ENABLE_CORS` and `TALISMAN_CONFIG` settings.
- **Guest token errors?** Ensure authentication is correctly configured.




Happy coding! 🚀

