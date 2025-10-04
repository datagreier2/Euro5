import { Zap, Layers, Globe2, ShieldCheck, Mail } from 'lucide-react';
import { useI18n } from '../i18n';

const valueIconClasses = 'w-10 h-10 text-amber-500 mb-4';

export default function AboutPage() {
  const { t } = useI18n();

  const values = [
    {
      key: 'rapidResponse',
      title: t('aboutPage.values.rapidResponseTitle'),
      body: t('aboutPage.values.rapidResponseBody'),
      Icon: Zap,
    },
    {
      key: 'curatedBriefings',
      title: t('aboutPage.values.curatedBriefingsTitle'),
      body: t('aboutPage.values.curatedBriefingsBody'),
      Icon: Layers,
    },
    {
      key: 'panEuropean',
      title: t('aboutPage.values.panEuropeanTitle'),
      body: t('aboutPage.values.panEuropeanBody'),
      Icon: Globe2,
    },
    {
      key: 'trustedSources',
      title: t('aboutPage.values.trustedSourcesTitle'),
      body: t('aboutPage.values.trustedSourcesBody'),
      Icon: ShieldCheck,
    },
  ];

  const contactEmail = t('aboutPage.contactEmail');

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <section className="text-center space-y-6">
        <h2 className="text-4xl sm:text-5xl font-serif text-neutral-900 tracking-wide">
          {t('aboutPage.heroTitle')}
        </h2>
        <p className="text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto">
          {t('aboutPage.heroSubtitle')}
        </p>
      </section>

      <section className="bg-white border border-neutral-200 p-8 sm:p-10">
        <h3 className="text-2xl font-serif text-neutral-900 mb-4 tracking-wide">
          {t('aboutPage.missionTitle')}
        </h3>
        <p className="text-neutral-600 font-light leading-relaxed">
          {t('aboutPage.missionBody')}
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-serif text-neutral-900 mb-8 tracking-wide text-center">
          {t('aboutPage.valuesTitle')}
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {values.map(({ key, title, body, Icon }) => (
            <article
              key={key}
              className="bg-white border border-neutral-200 p-6 flex flex-col h-full"
            >
              <Icon className={valueIconClasses} />
              <h4 className="text-xl font-serif text-neutral-900 mb-3">{title}</h4>
              <p className="text-neutral-600 font-light leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="bg-white border border-neutral-200 p-8">
          <h3 className="text-2xl font-serif text-neutral-900 mb-4 tracking-wide">
            {t('aboutPage.teamTitle')}
          </h3>
          <p className="text-neutral-600 font-light leading-relaxed">
            {t('aboutPage.teamBody')}
          </p>
        </div>
        <div className="bg-white border border-neutral-200 p-8">
          <h3 className="text-2xl font-serif text-neutral-900 mb-4 tracking-wide">
            {t('aboutPage.contactTitle')}
          </h3>
          <p className="text-neutral-600 font-light leading-relaxed mb-4">
            {t('aboutPage.contactBody')}
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 transition-colors font-serif"
          >
            <Mail className="w-5 h-5" />
            {contactEmail}
          </a>
        </div>
      </section>
    </main>
  );
}
