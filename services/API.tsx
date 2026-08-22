//const URL = "http://api.articaresplatform.com/dev/Dev";
const URL = "http://localhost:5000/api";

export type FirstTimeSetupPayload = {
  Organization: {
    OrganizationsID: string;
    Name: string;
    Department: string;
    OrganizationType: string;
    Others: string;
    Address: string;
    CityState: string;
    Country: string;
    PostalCode: string;
    Email: string;
    Phone: string;
    TimeZone: string;
    Description: string;
    InstallationDate: string;
    ExpiryDate: string;
    CreatedDate: string;
  };

  UserMaster: {
    FirstName: string;
    LastName: string;
    Designation: string;
    Email: string;
    Phone: string;
    UserRole: string;
    UserName: string;
    Password: string;
    CreatedDate: string;
  };

  SecurityQuestion: {
    Question1: string;
    Answer1: string;
    Question2: string;
    Answer2: string;
  };

  OrgDevice: {
    OrganizationID: number;
    ProductDeviceID: number;
    CreatedDate: string;
  };

  ProductDevice: {
    SystemType: string;
    Model: string;
    CreatedDate: string;
  };

  OrganizationAccessories: any[];
};

export const sendFirstTimeSetup = async (
  data: FirstTimeSetupPayload
) => {
  try {
    console.log("================================");
    console.log("FIRST TIME SETUP REQUEST");
    console.log(JSON.stringify(data, null, 2));
    console.log("================================");

    const response = await fetch( `${URL}/first-time-setup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(data),
      }
    );
    const text = await response.text();

    console.log("API STATUS:", response.status);
    console.log("API RAW RESPONSE:", text);

    let result: any;

    try {
      result = JSON.parse(text);
    } catch {
      result = {
        status: "error",
        message: text || "Invalid server response",
      };
    }

    console.log(
      "API PARSED RESPONSE:",
      JSON.stringify(result, null, 2)
    );

    if (!response.ok) {
      throw new Error(
        result?.message ||
        result?.error ||
        `Server returned HTTP ${response.status}`
      );
    }

    if (result?.status !== "success") {
      throw new Error(
        result?.message ||
        "First Time Setup failed"
      );
    }

    return result;

  } catch (error) {
    console.error(
      "First Time Setup API Error:",
      error
    );

    throw error;
  }
};
export const loginUser = async (
  OrganizationName: string,
  username: string,
  password: string
) => {
  try {
    const response = await fetch(`${URL}/login`,
      {
        method: "POST",
        //credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OrganizationName,
          username,
          password,
        }),
      }
    );

    const text = await response.text();

    console.log("LOGIN STATUS:", response.status);
    console.log("LOGIN RESPONSE:", text);

    if (!text) {
      throw new Error(
        `Empty login response. Status: ${response.status}`
      );
    }

    const result = JSON.parse(text);

    if (!response.ok) {
      throw new Error(
        typeof result.message === "string"
          ? result.message
          : "Login failed"
      );
    }

    if (result.status !== "success") {
      throw new Error(
        typeof result.message === "string"
          ? result.message
          : "Invalid username or password"
      );
    }

    const user = JSON.parse(result.data);

    console.log("LOGIN USER:", user);
    console.log("JWT TOKEN:", user.JwtToken);

    return user;

  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};