import { e as useState, u as useRuntimeConfig } from '../server.mjs';
import { a as useAuth } from './userData-981e93ad.mjs';
import axios from 'axios';

const useAppSettings = () => {
  const init = {
    id: 0,
    defaultLanguage: "",
    defaultBaseCurrency: "",
    createdAt: "",
    updatedAt: ""
  };
  const settings = useState("app-settings", () => init);
  const isPageLoading = useState("load-page", () => true);
  const accountLevels = useState("account-levels", () => []);
  const load = (obj, url) => {
    var _a;
    const axiosConfig = {
      method: "get",
      url: `${useRuntimeConfig().public.BE_API}/${url}`,
      timeout: 2e4,
      headers: {
        Authorization: "Bearer " + ((_a = useAuth().userData.value) == null ? void 0 : _a.token)
      }
    };
    axios.request(axiosConfig).then((response) => {
      obj.value = response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
  load(settings, "app-settings");
  load(accountLevels, "account-levels");
  return {
    settings,
    isPageLoading,
    accountLevels,
    load
  };
};

export { useAppSettings as u };
//# sourceMappingURL=appSettings-112ed972.mjs.map
