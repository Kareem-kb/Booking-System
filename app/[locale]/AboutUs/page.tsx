import { useTranslations } from "next-intl"

export default function AboutUs() {

  const t = useTranslations("AboutUs")
  return ( 
  <div> 
    <h1>{t("title")}</h1>
    <p>{t("content")}</p>
  </div>
  )
}
