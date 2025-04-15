import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e: any) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleLanguageChange}
      className={"border border-gray-300 p-2 w-full"}
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
};
