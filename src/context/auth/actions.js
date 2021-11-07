import { fetchToServer } from "../../fetchToServer";

const END_POINT = "loginActions.php";


export async function loginUser(dispatch, dataObj) {

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    const response = await fetchToServer(END_POINT, dataObj);
    let data = response.data;
    if (data.indexOf("OK") === 0) {
      let paramsStr = JSON.stringify(data).split("OK")[1];
      let paramsObj = JSON.parse(paramsStr);
      paramsObj["cn"] = dataObj["cn"];
      dispatch({ type: "LOGIN_SUCCESS", payload: paramsObj });
      localStorage.setItem("currentUser", paramsStr);
      return paramsObj;
    } else {
      dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function forgotPassword(dispatch, dataObj) {
  try {
    const response = await fetchToServer(END_POINT, dataObj);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function reportAttendance(dispatch, dataObj) {
  try {
    const response = await fetchToServer(END_POINT, dataObj);
    let data = response.data;
    return data;
  } catch (error) {
    return error;
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}