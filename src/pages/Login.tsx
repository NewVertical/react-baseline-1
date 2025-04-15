import wiLogo from "/wood-ingenuity-logo-1.png";
import { LanguageSwitcher } from "../components/language/LanguageSwitcher.tsx";
import translationEN from "../locales/en/translation.json";
import translationES from "../locales/es/translation.json";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { useAuth } from "../services/useAuth.tsx";
import { useState } from "react";

import { useMask } from "@react-input/mask";
import { useNavigate, useRouter } from "@tanstack/react-router";

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const Login = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    phone: "",
    authenticated: false,
  });
  const { user, authLite } = useAuth();
  const router = useRouter();
  const navigate = useNavigate();

  if (user) {
    navigate({ to: "/" }).then(() => {});
  }

  const inputRef = useMask({
    mask: "(___)___-____",
    replacement: { _: /\d/ },
  });

  const submit = async () => {
    if (!formState.phone) return;

    const res = await authLite(formState.phone);
    console.log("auth results", res);
    if (res && res.authenticated) {
      setFormState({ ...formState, authenticated: true });
      //await navigate({ to: "/" });
      await router.navigate({ to: "/" });
    }
  };
  return (
    <div
      className={
        "flex flex-col justify-center border border-gray-300 rounded p-8"
      }
    >
      <div className={"text-center w-[8rem] self-center"}>
        <a href="/" target="_blank">
          <img src={wiLogo} className={"w-[8rem]"} alt="Wood Ingenuity" />
        </a>
      </div>
      <h1>Work Pro</h1>
      <div className="flex flex-col gap-2">
        <label className={"text-lg"}>{t("phone_number")}</label>

        <input
          placeholder={t("enter_phone_number")}
          ref={inputRef}
          value={formState.phone}
          onChange={(e) => {
            setFormState({ ...formState, phone: e.target.value });
          }}
          className={"w-full py-2 px-3 rounded border border-gray-400"}
        />
      </div>
      <div className={"mt-4"}>
        <button
          className={
            "bg-[#4C721D] text-white border-[#572600]  py-3 px-4 rounded font-bold w-full cursor-pointer"
          }
          onClick={submit}
        >
          {t("login")}
        </button>
      </div>
      <div className={"mt-2 w-full"}>
        <LanguageSwitcher />
      </div>
    </div>
  );
};
