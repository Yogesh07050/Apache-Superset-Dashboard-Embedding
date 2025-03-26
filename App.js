import React from "react";
import axios from "axios";
import { embedDashboard } from "@superset-ui/embedded-sdk";

const supersetUrl = "Superset URL";
const supersetApiUrl = supersetUrl + "/api/v1/security"; 
const dashboardId = "Dashboard ID";


//  For filters :)
// const Dataset = "HR"
// const Column_1 = "Gender"
// const Attribute_1 = "Female"
// const Column_2 = "Department"
// const Attribute_2 = "Human Resources"

async function getToken(){
  try {
    // 🔹 1. Login to get access token
    const loginResponse = await axios.post(
      supersetApiUrl + "/login",
      {
        password: "admin",
        provider: "db",
        refresh: true,
        username: "admin",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (loginResponse.status !== 200) {
      throw new Error("Login failed");
    }

    const access_token = loginResponse.data.access_token;

    // 🔹 2. Fetch CSRF token
    const csrfResponse = await axios.get(supersetApiUrl + "/csrf_token/", {
      headers: {
        Authorization: `Bearer ${access_token}`, 
      },
      withCredentials: true,
    });

    if (csrfResponse.status !== 200) {
      throw new Error("Failed to fetch CSRF token");
    }

    const csrfToken = csrfResponse.data.result;

    // Filtering  :)
    // const rls = [
    //   {
    //     clause: `"${Dataset}"."${Column_1}" = '${Attribute_1}'`
    //   },
    //   {
    //     clause: `"${Dataset}"."${Column_2}" = '${Attribute_2}'`

    //   }
    // ];

    // 🔹 3. Fetch guest token
    const guestTokenResponse = await axios.post(
      supersetApiUrl + "/guest_token/",
      {
        user: {
          username: "admin",
          first_name: "admin",
          last_name: "admin",
        },
        resources: [
          {
            type: "dashboard",
            id: dashboardId,
          },
        ],
        // Filters
        rls,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,  
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      }
    );

    if (guestTokenResponse.status !== 200) {
      throw new Error("Failed to fetch guest token");
    }

    const token = guestTokenResponse.data.token;

    // 🔹 4. Embed dashboard
    embedDashboard({
      id: dashboardId,
      supersetDomain: supersetUrl,
      dashboardUiConfig: {
        hideTitle: true,
        filters: {
          expanded: false,
          visible: false,  
        },
      },
      mountPoint: document.getElementById("superset-container"),
      fetchGuestToken: () => Promise.resolve(token),
    });

    // 🔹 5. Style the iFrame
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.style.width = "100%";
      iframe.style.minHeight = "100vh";
    }
  } catch (error) {
    console.error("Error in getToken:", error);
  }
}

function App() {
  React.useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="App">
      <h1>Embedded Superset Dashboard</h1>
      <div
        id="superset-container"
      ></div>
    </div>
  );  
}
export default App;