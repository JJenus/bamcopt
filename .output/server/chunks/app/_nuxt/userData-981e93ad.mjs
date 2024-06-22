import { e as useState, n as navigateTo, u as useRuntimeConfig } from '../server.mjs';
import axios from 'axios';
import { u as useCookie } from './cookie-8c768185.mjs';

const useAuth = () => {
  const appUser = userData();
  const authData = useState("user", () => null);
  const authenticated = useState("isAuthenticated", () => false);
  const userAuth = useCookie("auth", {
    maxAge: 60 * 60 * 24
  });
  const openAuth = useState("authAction", () => "login");
  const openAuthModal = (action) => {
    openAuth.value = action;
  };
  const login = (auth) => {
    userAuth.value = auth;
    appUser.data.value = auth.user;
    appUser.account.value = auth.user.account;
    authData.value = auth;
    authenticated.value = true;
    try {
      if (auth.user.userType === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/app";
      }
    } catch (error) {
    }
  };
  const logout = () => {
    authData.value = null;
    authenticated.value = false;
    useCookie("auth").value = null;
    try {
      window.location.href = "/";
    } catch (error) {
    }
  };
  const isAuthenticated = () => {
    if (authenticated.value) {
      return true;
    }
    const auth = useCookie("auth");
    if (auth.value == null || auth.value == void 0) {
      return false;
    }
    authenticated.value = true;
    authData.value = auth.value;
    appUser.data.value = auth.value.user;
    appUser.account.value = auth.value.user.account;
    return true;
  };
  return {
    isAuthenticated,
    userData: authData,
    logout,
    login,
    openAuthModal,
    userAuth
  };
};
var AccountStatus = /* @__PURE__ */ ((AccountStatus2) => {
  AccountStatus2["ACTIVE"] = "active";
  AccountStatus2["CLOSED"] = "closed";
  AccountStatus2["FROZEN"] = "frozen";
  return AccountStatus2;
})(AccountStatus || {});
var NotificationStatus = /* @__PURE__ */ ((NotificationStatus2) => {
  NotificationStatus2["READ"] = "read";
  NotificationStatus2["UNREAD"] = "unread";
  return NotificationStatus2;
})(NotificationStatus || {});
const userData = () => {
  const initAcc = {
    id: "",
    userId: "",
    currencyId: "",
    amount: null,
    status: AccountStatus.ACTIVE,
    accountLevel: 0,
    accountNumber: 0
  };
  const initUser = {
    id: "",
    name: "",
    email: "",
    imgUrl: "/assets/media/svg/avatars/blank.svg",
    phone: "",
    address: "",
    city: "",
    country: "",
    dob: "",
    verified: false,
    emailVerified: false,
    account: {
      id: "",
      userId: "",
      currencyId: "",
      amount: 0,
      status: AccountStatus.ACTIVE,
      accountLevel: 0,
      accountNumber: 0
    },
    userType: "",
    createdAt: "",
    idUrl: void 0
  };
  const transactions = useState("user-transactions", () => []);
  const notifications = useState("notifications", () => []);
  const newNotifications = useState(
    "new-notifications",
    () => []
  );
  const isNewNotification = useState(
    "new-notification",
    () => false
  );
  const data = useState("userData", () => initUser);
  const account = useState("userAccount", () => initAcc);
  const users = useState("users", () => []);
  const active = useState("active-user");
  const admins = useState("admin", () => []);
  const getUsers = () => {
    var _a, _b;
    if (!((_a = useAuth().userData.value) == null ? void 0 : _a.user)) {
      navigateTo("/sign-in");
    }
    const axiosConfig = {
      method: "get",
      url: `${useRuntimeConfig().public.BE_API}/users`,
      timeout: 2e4,
      headers: {
        Authorization: "Bearer " + ((_b = useAuth().userData.value) == null ? void 0 : _b.token)
      }
    };
    axios.request(axiosConfig).then((response) => {
      users.value = response.data.filter((e) => {
        return e.userType !== "admin";
      }).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      admins.value = response.data.filter((e) => {
        return e.userType === "admin";
      }).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }).catch((error) => {
      const data2 = error.response.data;
      if (data2.message.includes("Access denied") || error.response.status === 401)
        ;
    });
  };
  const fetchBalance = () => {
    var _a;
    const axiosConfig = {
      method: "get",
      url: `${useRuntimeConfig().public.BE_API}/account/${data.value.id}`,
      timeout: 15e3,
      headers: {
        Authorization: "Bearer " + ((_a = useAuth().userData.value) == null ? void 0 : _a.token)
      }
    };
    axios.request(axiosConfig).then((response) => {
      const data2 = response.data;
      account.value = data2;
    }).catch((error) => {
    });
  };
  const showNotifications = () => {
    var _a;
    if (!isNewNotification.value) {
      return;
    }
    const axiosConfig = {
      method: "put",
      data: notifications.value,
      url: `${useRuntimeConfig().public.BE_API}/notifications/all`,
      timeout: 25e3,
      headers: {
        Authorization: "Bearer " + ((_a = useAuth().userData.value) == null ? void 0 : _a.token)
      }
    };
    axios.request(axiosConfig).then((response) => {
    }).catch((error) => {
      console.log(error);
    });
  };
  const getNotifications = () => {
    var _a;
    const axiosConfig = {
      method: "get",
      url: `${useRuntimeConfig().public.BE_API}/notifications/${data.value.id}`,
      timeout: 15e3,
      headers: {
        Authorization: "Bearer " + ((_a = useAuth().userData.value) == null ? void 0 : _a.token)
      }
    };
    axios.request(axiosConfig).then((response) => {
      notifications.value = response.data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const xx = notifications.value.filter((notice) => {
        if (notice.status === NotificationStatus.UNREAD) {
          isNewNotification.value = true;
          return true;
        }
        return false;
      });
      if (isNewNotification.value && notifications.value.length == 0) {
        newNotifications.value = xx;
      }
    }).catch((error) => {
    });
  };
  return {
    account,
    data,
    users,
    admins,
    active,
    notifications,
    newNotifications,
    isNewNotification,
    transactions,
    getUsers,
    fetchBalance,
    getNotifications,
    showNotifications
  };
};

export { NotificationStatus as N, useAuth as a, userData as u };
//# sourceMappingURL=userData-981e93ad.mjs.map
