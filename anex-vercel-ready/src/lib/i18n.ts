import type { SiteLang } from "@/lib/types";

export type SiteCopy = {
  languageName: string;
  nav: { focus: string; desk: string; method: string; contact: string };
  hero: { kicker: string; title: string; body: string; cta: string };
  focus: { kicker: string; title: string; intro: string; services: Array<[string, string]> };
  desk: { kicker: string; title: string; body: string; points: string[]; cta: string };
  method: { title: string; body: string; steps: Array<[string, string, string]> };
  geography: { title: string; body: string };
  contact: { title: string; body: string; office: string };
  notice: string;
  chat: {
    launcher: string; title: string; online: string; offline: string; intro: string;
    placeholder: string; send: string; sending: string; error: string; privacy: string;
    translationUnavailable: string;
  };
};

export const LANGUAGE_LABELS: Record<SiteLang, string> = {
  EN: "EN", DE: "DE", TR: "TR", RU: "RU", ZH: "中文"
};

export const COPY: Record<SiteLang, SiteCopy> = {
  EN: {
    languageName: "English",
    nav: { focus: "Focus", desk: "Digital Desk", method: "Method", contact: "Contact" },
    hero: {
      kicker: "ANEX | London",
      title: "Clarity for cross-border tax questions.",
      body: "International tax, European tax law, company formation and tax disputes, supported by a five-language digital advisory desk.",
      cta: "Open Digital Desk"
    },
    focus: {
      kicker: "Focus areas",
      title: "Tax advice built for cross-border questions.",
      intro: "ANEX works where tax law, company structure and cross-border facts meet.",
      services: [
        ["International Tax", "Cross-border tax analysis for individuals and businesses connected to more than one jurisdiction."],
        ["European Tax Law", "EU and European tax-law analysis, including cross-border treatment, rights and administrative issues."],
        ["Company Formation", "Practical guidance on company setup, structure and the tax questions that follow a new business."],
        ["Tax Disputes", "Case analysis, evidence review and strategic support for tax disputes and tax-authority correspondence."]
      ]
    },
    desk: {
      kicker: "Digital advisory desk",
      title: "Five languages. One conversation.",
      body: "Messages are accepted 24/7. When ANEX is online, the same thread becomes a live conversation. Messages can be translated between English, German, Turkish, Russian and Chinese.",
      points: ["24/7 message intake", "Live replies when online", "Automatic message translation", "EN · DE · TR · RU · 中文"],
      cta: "Start a conversation"
    },
    method: {
      title: "See the position. Test the assumptions. Build the route.",
      body: "We separate facts, law, risk and practical options before identifying the next step.",
      steps: [
        ["01", "Position", "Map the jurisdictions, facts, documents and tax exposure."],
        ["02", "Analysis", "Test the legal basis, evidence and competing interpretations."],
        ["03", "Route", "Set out workable next steps, including where regulated local counsel is required."]
      ]
    },
    geography: {
      title: "London based. Cross-border by design.",
      body: "ANEX is positioned for UK, European and Turkey-linked matters and can work with clients across borders through its digital desk."
    },
    contact: {
      title: "Start with the question you actually have.",
      body: "Use the digital desk for a first message or contact ANEX directly.",
      office: "London office"
    },
    notice: "ANEX provides consultancy and non-reserved advisory services. It is not a solicitors' practice and does not conduct reserved legal activities in England and Wales.",
    chat: {
      launcher: "Digital Desk", title: "ANEX Digital Desk", online: "Online now", offline: "Message us 24/7",
      intro: "Write in your own language. If translation is enabled, ANEX can read and reply across all five supported languages.",
      placeholder: "Write your message…", send: "Send", sending: "Sending…", error: "Message could not be sent.",
      privacy: "Messages are stored securely for the advisory conversation.", translationUnavailable: "Automatic translation is temporarily unavailable."
    }
  },
  DE: {
    languageName: "Deutsch",
    nav: { focus: "Schwerpunkte", desk: "Digitaler Tisch", method: "Methode", contact: "Kontakt" },
    hero: {
      kicker: "ANEX | London",
      title: "Klarheit bei grenzüberschreitenden Steuerfragen.",
      body: "Internationales Steuerrecht, Europäisches Steuerrecht, Firmengründung und Steuerstreitigkeiten mit einer digitalen Beratung in fünf Sprachen.",
      cta: "Digitalen Tisch öffnen"
    },
    focus: {
      kicker: "Schwerpunkte",
      title: "Steuerberatung für grenzüberschreitende Fragen.",
      intro: "ANEX arbeitet an der Schnittstelle von Steuerrecht, Unternehmensstruktur und grenzüberschreitenden Sachverhalten.",
      services: [
        ["Internationales Steuerrecht", "Analyse grenzüberschreitender Steuerfragen für Personen und Unternehmen mit Bezug zu mehreren Staaten."],
        ["Europäisches Steuerrecht", "Analyse des EU- und europäischen Steuerrechts einschließlich grenzüberschreitender Behandlung und Verwaltungsfragen."],
        ["Firmengründung", "Praktische Begleitung bei Gründung, Struktur und den steuerlichen Fragen eines neuen Unternehmens."],
        ["Steuerstreitigkeiten", "Fallanalyse, Beweisprüfung und strategische Unterstützung bei Steuerstreitigkeiten und Behördenkorrespondenz."]
      ]
    },
    desk: {
      kicker: "Digitaler Beratungstisch",
      title: "Fünf Sprachen. Ein Gespräch.",
      body: "Nachrichten werden rund um die Uhr angenommen. Wenn ANEX online ist, wird derselbe Verlauf zum Live-Gespräch. Nachrichten können automatisch zwischen Englisch, Deutsch, Türkisch, Russisch und Chinesisch übersetzt werden.",
      points: ["Nachrichten 24/7", "Live-Antworten bei Online-Status", "Automatische Übersetzung", "EN · DE · TR · RU · 中文"],
      cta: "Gespräch starten"
    },
    method: {
      title: "Position verstehen. Annahmen prüfen. Den Weg aufbauen.",
      body: "Wir trennen Sachverhalt, Recht, Risiko und praktische Optionen, bevor der nächste Schritt festgelegt wird.",
      steps: [
        ["01", "Position", "Jurisdiktionen, Fakten, Unterlagen und steuerliche Risiken erfassen."],
        ["02", "Analyse", "Rechtsgrundlage, Beweise und konkurrierende Auslegungen prüfen."],
        ["03", "Weg", "Praktische nächste Schritte festlegen und bei Bedarf regulierte lokale Beratung einbeziehen."]
      ]
    },
    geography: {
      title: "London als Basis. Grenzüberschreitend gedacht.",
      body: "ANEX ist auf Angelegenheiten mit Bezug zum Vereinigten Königreich, Europa und der Türkei ausgerichtet und arbeitet digital über Grenzen hinweg."
    },
    contact: { title: "Beginnen Sie mit Ihrer tatsächlichen Frage.", body: "Nutzen Sie den digitalen Beratungstisch oder kontaktieren Sie ANEX direkt.", office: "Büro London" },
    notice: "ANEX erbringt Beratungsleistungen und nicht reservierte Rechtsberatung. ANEX ist keine Solicitors-Kanzlei und führt in England und Wales keine reservierten Rechtsgeschäfte aus.",
    chat: {
      launcher: "Digitaler Tisch", title: "ANEX Digitaler Beratungstisch", online: "Jetzt online", offline: "Nachrichten 24/7",
      intro: "Schreiben Sie in Ihrer eigenen Sprache. Bei aktivierter Übersetzung kann ANEX in allen fünf unterstützten Sprachen lesen und antworten.",
      placeholder: "Nachricht schreiben…", send: "Senden", sending: "Wird gesendet…", error: "Nachricht konnte nicht gesendet werden.",
      privacy: "Nachrichten werden sicher für das Beratungsgespräch gespeichert.", translationUnavailable: "Automatische Übersetzung ist vorübergehend nicht verfügbar."
    }
  },
  TR: {
    languageName: "Türkçe",
    nav: { focus: "Odak Alanları", desk: "Dijital Masa", method: "Yöntem", contact: "İletişim" },
    hero: {
      kicker: "ANEX | Londra",
      title: "Sınır ötesi vergi konularında netlik.",
      body: "Uluslararası vergi, Avrupa vergi hukuku, şirket kurulumu ve vergi davaları için beş dilli dijital danışma masası.",
      cta: "Dijital Masayı Aç"
    },
    focus: {
      kicker: "Odak alanları",
      title: "Sınır ötesi vergi soruları için danışmanlık.",
      intro: "ANEX, vergi hukuku, şirket yapısı ve sınır ötesi olguların kesiştiği noktada çalışır.",
      services: [
        ["Uluslararası Vergi", "Birden fazla ülkeyle bağlantısı bulunan kişi ve işletmeler için sınır ötesi vergi analizi."],
        ["Avrupa Vergi Hukuku", "AB ve Avrupa vergi hukuku kapsamında sınır ötesi uygulamalar, haklar ve idari uyuşmazlıkların analizi."],
        ["Şirket Kurulumu", "Şirket kuruluşu, yapılandırma ve yeni işletmenin beraberinde getirdiği vergi sorularına yönelik pratik destek."],
        ["Vergi Davaları", "Vergi uyuşmazlıklarında dosya analizi, delil incelemesi ve vergi idaresi yazışmaları için stratejik destek."]
      ]
    },
    desk: {
      kicker: "Dijital danışma masası",
      title: "Beş dil. Tek konuşma.",
      body: "Mesajlar 7/24 alınır. ANEX çevrimiçiyse aynı konuşma canlı desteğe dönüşür. Mesajlar İngilizce, Almanca, Türkçe, Rusça ve Çince arasında otomatik çevrilebilir.",
      points: ["7/24 mesaj kabulü", "Çevrimiçiyken canlı yanıt", "Otomatik mesaj çevirisi", "EN · DE · TR · RU · 中文"],
      cta: "Konuşma başlat"
    },
    method: {
      title: "Konumu gör. Varsayımları test et. Yolu kur.",
      body: "Bir sonraki adımı belirlemeden önce olguları, hukuku, riski ve uygulanabilir seçenekleri birbirinden ayırırız.",
      steps: [
        ["01", "Konum", "Ülkeleri, olguları, belgeleri ve vergi riskini haritalandır."],
        ["02", "Analiz", "Hukuki temeli, delilleri ve farklı yorumları test et."],
        ["03", "Yol", "Gerekli olduğunda yerel ve düzenlemeye tabi uzmanlara yönlendirmeyi de içeren uygulanabilir adımları belirle."]
      ]
    },
    geography: {
      title: "Londra merkezli. Sınır ötesi düşünülmüş.",
      body: "ANEX, Birleşik Krallık, Avrupa ve Türkiye bağlantılı konulara odaklanır ve dijital masa üzerinden sınır ötesi çalışır."
    },
    contact: { title: "Gerçek sorunuzla başlayın.", body: "İlk mesaj için dijital masayı kullanın veya ANEX ile doğrudan iletişime geçin.", office: "Londra ofisi" },
    notice: "ANEX danışmanlık ve reserved olmayan hizmetler sunar. İngiltere ve Galler'de bir solicitors practice değildir ve reserved legal activities yürütmez.",
    chat: {
      launcher: "Dijital Masa", title: "ANEX Dijital Danışma Masası", online: "Şu an çevrimiçi", offline: "7/24 mesaj bırakın",
      intro: "Kendi dilinizde yazın. Çeviri etkinse ANEX desteklenen beş dil arasında mesajları okuyup yanıtlayabilir.",
      placeholder: "Mesajınızı yazın…", send: "Gönder", sending: "Gönderiliyor…", error: "Mesaj gönderilemedi.",
      privacy: "Mesajlar danışma görüşmesi için güvenli şekilde saklanır.", translationUnavailable: "Otomatik çeviri şu anda kullanılamıyor."
    }
  },
  RU: {
    languageName: "Русский",
    nav: { focus: "Направления", desk: "Цифровая стойка", method: "Метод", contact: "Контакты" },
    hero: {
      kicker: "ANEX | Лондон",
      title: "Ясность в международных налоговых вопросах.",
      body: "Международное налогообложение, европейское налоговое право, регистрация компаний и налоговые споры с цифровой консультацией на пяти языках.",
      cta: "Открыть консультацию"
    },
    focus: {
      kicker: "Основные направления",
      title: "Налоговое консультирование для трансграничных вопросов.",
      intro: "ANEX работает там, где пересекаются налоговое право, корпоративная структура и международные факты.",
      services: [
        ["Международное налогообложение", "Анализ трансграничных налоговых вопросов для частных лиц и компаний, связанных с несколькими юрисдикциями."],
        ["Европейское налоговое право", "Анализ права ЕС и европейского налогового права, включая трансграничное регулирование и административные вопросы."],
        ["Регистрация компаний", "Практическая поддержка при создании и структурировании компании и связанных налоговых вопросах."],
        ["Налоговые споры", "Анализ дела, проверка доказательств и стратегическая поддержка в налоговых спорах и переписке с налоговыми органами."]
      ]
    },
    desk: {
      kicker: "Цифровая консультационная стойка",
      title: "Пять языков. Один разговор.",
      body: "Сообщения принимаются 24/7. Когда ANEX онлайн, тот же диалог становится общением в реальном времени. Сообщения могут автоматически переводиться между английским, немецким, турецким, русским и китайским.",
      points: ["Сообщения 24/7", "Ответы в реальном времени", "Автоматический перевод", "EN · DE · TR · RU · 中文"],
      cta: "Начать разговор"
    },
    method: {
      title: "Определить позицию. Проверить предпосылки. Построить маршрут.",
      body: "Мы разделяем факты, право, риск и практические варианты до определения следующего шага.",
      steps: [
        ["01", "Позиция", "Определить юрисдикции, факты, документы и налоговые риски."],
        ["02", "Анализ", "Проверить правовую основу, доказательства и конкурирующие толкования."],
        ["03", "Маршрут", "Определить практические шаги и случаи, когда необходим местный регулируемый специалист."]
      ]
    },
    geography: {
      title: "База в Лондоне. Работа через границы.",
      body: "ANEX ориентирован на вопросы, связанные с Великобританией, Европой и Турцией, и работает через цифровую консультационную стойку."
    },
    contact: { title: "Начните с реального вопроса.", body: "Напишите через цифровую стойку или свяжитесь с ANEX напрямую.", office: "Офис в Лондоне" },
    notice: "ANEX предоставляет консультационные и нерезервированные услуги. ANEX не является solicitors' practice и не осуществляет reserved legal activities в Англии и Уэльсе.",
    chat: {
      launcher: "Цифровая стойка", title: "ANEX Цифровая консультация", online: "Сейчас онлайн", offline: "Сообщения 24/7",
      intro: "Пишите на своем языке. При включенном переводе ANEX может читать и отвечать на всех пяти поддерживаемых языках.",
      placeholder: "Напишите сообщение…", send: "Отправить", sending: "Отправка…", error: "Не удалось отправить сообщение.",
      privacy: "Сообщения безопасно сохраняются для консультации.", translationUnavailable: "Автоматический перевод временно недоступен."
    }
  },
  ZH: {
    languageName: "中文",
    nav: { focus: "重点领域", desk: "数字咨询台", method: "工作方法", contact: "联系" },
    hero: {
      kicker: "ANEX | 伦敦",
      title: "让跨境税务问题更清晰。",
      body: "涵盖国际税务、欧洲税法、公司设立和税务争议，并提供五种语言的数字咨询服务。",
      cta: "打开数字咨询台"
    },
    focus: {
      kicker: "重点领域",
      title: "面向跨境问题的税务咨询。",
      intro: "ANEX 专注于税法、公司结构与跨境事实相互交织的事项。",
      services: [
        ["国际税务", "为涉及多个司法辖区的个人和企业提供跨境税务分析。"],
        ["欧洲税法", "分析欧盟及欧洲税法，包括跨境税务处理、权利与行政问题。"],
        ["公司设立", "就公司设立、结构安排以及新企业所产生的税务问题提供实务支持。"],
        ["税务争议", "为税务争议、证据审查以及与税务机关的往来提供案件分析和策略支持。"]
      ]
    },
    desk: {
      kicker: "数字咨询台",
      title: "五种语言，同一个对话。",
      body: "全天候接收消息。ANEX 在线时，同一对话可转为实时沟通。消息可在英语、德语、土耳其语、俄语和中文之间自动翻译。",
      points: ["全天候留言", "在线时实时回复", "自动翻译消息", "EN · DE · TR · RU · 中文"],
      cta: "开始咨询"
    },
    method: {
      title: "看清情况。检验假设。建立路径。",
      body: "在确定下一步之前，我们会分别梳理事实、法律、风险和可执行方案。",
      steps: [
        ["01", "情况", "梳理相关司法辖区、事实、文件和税务风险。"],
        ["02", "分析", "检验法律依据、证据以及不同解释。"],
        ["03", "路径", "明确可执行的下一步，并在需要时说明何时应由当地受监管专业人士介入。"]
      ]
    },
    geography: {
      title: "立足伦敦，面向跨境。",
      body: "ANEX 重点处理与英国、欧洲和土耳其相关的事务，并通过数字咨询台为跨境客户提供服务。"
    },
    contact: { title: "从您真正的问题开始。", body: "您可以先通过数字咨询台留言，也可以直接联系 ANEX。", office: "伦敦办公室" },
    notice: "ANEX 提供咨询及非保留类服务。ANEX 不是英格兰及威尔士的 solicitors' practice，也不从事 reserved legal activities。",
    chat: {
      launcher: "数字咨询台", title: "ANEX 数字咨询台", online: "当前在线", offline: "全天候留言",
      intro: "请使用您自己的语言留言。启用翻译后，ANEX 可以在五种支持语言之间阅读和回复。",
      placeholder: "请输入您的消息…", send: "发送", sending: "正在发送…", error: "消息发送失败。",
      privacy: "消息会为本次咨询安全保存。", translationUnavailable: "自动翻译暂时不可用。"
    }
  }
};
