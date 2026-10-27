import { useCallback, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { useBodyLock, useLayout } from './lib';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Lightbox } from './components/Lightbox';
import { HeroDesktop, HeroMobile } from './sections/Hero';
import { AboutDesktop, AboutMobile } from './sections/About';
import { ExperienceDesktop, ExperienceMobile } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Tools } from './sections/Tools';
import { PortfolioDesktop, PortfolioMobile } from './sections/Portfolio';
import { Photography } from './sections/Photography';
import { Education } from './sections/Education';
import { ContactsDesktop, ContactsMobile, Footer } from './sections/Contacts';

export default function App() {
  const { mob, nav } = useLayout();
  const [menu, setMenu] = useState(false);
  const [photo, setPhoto] = useState<number | null>(null);
  const closeMenu = useCallback(() => setMenu(false), []);
  const closePhoto = useCallback(() => setPhoto(null), []);
  useBodyLock(menu || photo !== null);
  const variant = mob ? 'phone' : nav ? 'tab' : 'desk';

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative bg-paper font-sans text-ink">
          <div className="cq overflow-x-clip">
            <Header variant={variant} menuOpen={menu} onMenu={() => setMenu(v => !v)} />
            <main>
              {mob ? (
                <>
                  <HeroMobile />
                  <AboutMobile />
                  <ExperienceMobile />
                  <Skills mob />
                  <Tools mob />
                  <PortfolioMobile onOpen={setPhoto} />
                  <Photography mob onOpen={setPhoto} />
                  <Education mob />
                  <ContactsMobile />
                </>
              ) : (
                <>
                  <HeroDesktop />
                  <AboutDesktop />
                  <ExperienceDesktop />
                  <Skills mob={false} />
                  <Tools mob={false} />
                  <PortfolioDesktop onOpen={setPhoto} />
                  <Photography mob={false} onOpen={setPhoto} />
                  <Education mob={false} />
                  <ContactsDesktop />
                </>
              )}
            </main>
            <Footer mob={mob} />
          </div>
          {menu && nav && <MobileMenu onClose={closeMenu} />}
          {photo !== null && <Lightbox index={photo} onIndex={setPhoto} onClose={closePhoto} />}
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
