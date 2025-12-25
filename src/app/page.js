import HeroAdaptive from "@/components/HeroAdaptive";

import ContentSection from '../components/HomePage/ContentSection/ContentSection';
import TimelineSection from '@/components/HomePage/TimelineSection/TimelineSection';
import VeraAwardSection from '@/components/HomePage/VeraAwardSection/VeraAwardSection';
import Footer from '@/components/Footer/Footer';
// import NewsSection from '@/components/HomePage/NewsSection/NewsSection';
import ProstranstvoSection from "@/components/HomePage/ProstranstvoSection/ProstranstvoSection";
import AwardsSection from "@/components/HomePage/AwardSection/AwardSection";
// import HeroVideoSection from "@/components/HomePage/HeroVideoSection/HeroVideoSection";
import FivePillars from "@/components/HomePage/FivePillars/FivePillars";
import SevenDaySprint from "@/components/HomePage/SevenDaySprint/SevenDaySprint";
import AccessProtocolSection from "@/components/HomePage/AccessProtocolSection/AccessProtocolSection";
import ContactsSection from "@/components/HomePage/ContactsSection/ContactsSection";

// import { getHomePageData, testWordPressConnection } from '../lib/wordpress';

// Загрузка данных из WordPress
// async function getPageData() {
//   // Проверяем соединение
//   const isConnected = await testWordPressConnection();
//   if (!isConnected) {
//     return null;
//   }
//   return await getHomePageData();
// }

// ✅ Данные выставок
const exhibitionsData = [
  {
    id: 1,
    title: "CONSUMER ROBOTICS: АВТОНОМНЫЙ ДОМ",
    dates: "12.01 - 21.01",
    year: "2026",
    description: "Презентация сервисных дроидов. Генеральный партнер: ЯНДЕКС",
    image: "/exhibitions/1.jpeg",
    category: "Lastochka.ai",
    location: "Все залы",
    link: "/events/kusto/"
  },
  {
    id: 2,
    title: "FINTECH: НОВАЯ ЭКОНОМИКА",
    dates: "22.01 - 28.01",
    year: "2026",
    description: "Запуск экосистемы цифровых активов Krypto.Konekt. Генеральный партнер: АЛЬФА-БАНК ",
    image: "/exhibitions/2.jpeg",
    category: "Krypto.Konekt.",
    location: "Все залы",
    link: "/events/ai-summit"
  },
  {
    id: 3,
    title: "GREENHOUSE TECH: ЕДА БУДУЩЕГО",
    dates: "29.01 - 04.02",
    year: "2026",
    description: "Живая демонстрация ИИ-гидропоники от bio.lotusCity.ai. Партнер: ТИМИРЯЗЕВСКАЯ АКАДЕМИЯ",
    image: "/exhibitions/3.jpeg",
    category: "bio.lotusCity.ai",
    location: "Все залы",
    link: "/events/in-pulse-ai/"
  },
  {
    id: 4,
    title: "CONSTRUCTION & 3D PRINTING",
    dates: "08.02 - 15.02",
    year: "2026",
    description: "Роботы, которые печатают дома. Шоукейс CONSTRUCTION.lotusCity.ai. Партнер: МФТИ (Физтех)",
    image: "/exhibitions/1.jpeg",
    category: "CONSTRUCTION.lotusCity.ai.",
    location: "Все залы",
    link: "/events/tri-vostoka/"
  }
];

export default async function HomePage() {

  // const homeData = await getPageData();
  const data = {
    mode: 'sequence',
    frameCount: 280
  }

  // const data = homeData || fallbackData;
  // const data = homeData 
  return (
    <>
      <HeroAdaptive />
      
      <ContentSection
        id="about-section"
      />

      <ProstranstvoSection />

      <FivePillars />

      {/* <HeroVideoSection /> */}
      <SevenDaySprint />

      <TimelineSection 
        exhibitions={exhibitionsData}
        label="Календарь событий"
        title="Выставки 2025"
        subtitle="Исследуйте наши предстоящие выставки"
      />

      <AwardsSection />
      <VeraAwardSection />

      <AccessProtocolSection />

      <ContactsSection />
      
      <Footer />
    </>
  );
}

// Настройки статической генерации
export const revalidate = 60; // ISR каждую минуту

