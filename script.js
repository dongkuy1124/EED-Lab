const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
let data = window.siteData;
const params = new URLSearchParams(window.location.search);
const previewMode = params.get("preview") === "1";
const editorControlsMode = params.get("edit") === "1";
const dragMode = params.get("drag") === "1" || editorControlsMode;
const insertMode = params.get("insert") === "1";

if (previewMode) document.body.classList.add("preview-mode");
if (editorControlsMode) document.body.classList.add("editor-controls-mode");
if (insertMode) document.body.classList.add("insert-mode");

if (previewMode) {
  try {
    const previewData = JSON.parse(localStorage.getItem("siteDataPreview"));
    if (previewData) data = previewData;
  } catch {
    data = window.siteData;
  }
}

const unsafeTextEditKeys = ["professorProfile", "memberCard", "cvCard", "contactCard", "researchCard", "homeButtons", "newsItem"];
if (previewMode && data?.design) {
  let removedUnsafeTextEdit = false;
  ["textOverrides", "rangeStyles"].forEach((collection) => {
    const values = data.design[collection];
    if (!values) return;
    Object.keys(values).forEach((key) => {
      if (unsafeTextEditKeys.some((unsafeKey) => key === unsafeKey || key.startsWith(unsafeKey))) {
        delete values[key];
        removedUnsafeTextEdit = true;
      }
    });
  });
  if (removedUnsafeTextEdit) {
    localStorage.setItem("siteDataPreview", JSON.stringify(data));
    window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
  }
}

if (previewMode && data?.design?.rangeStyles) {
  const unsafeRangeKeys = ["professorProfile", "memberCard", "cvCard", "contactCard", "researchCard", "homeButtons", "newsItem"];
  let removedUnsafeRangeStyle = false;
  Object.keys(data.design.rangeStyles).forEach((key) => {
    if (unsafeRangeKeys.some((unsafeKey) => key === unsafeKey || key.startsWith(unsafeKey))) {
      delete data.design.rangeStyles[key];
      removedUnsafeRangeStyle = true;
    }
  });
  if (removedUnsafeRangeStyle) {
    localStorage.setItem("siteDataPreview", JSON.stringify(data));
    window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
  }
}
const canonicalResearchAreas = [
  {
    title: "Biomimetic systems",
    image: "biomimetic",
    text: "?앸챸泥댁쓽 ?숈옉??紐⑥궗???꾩옄 ?쒖뒪?쒖쓣 援ы쁽?섏뿬 湲곗〈 ?꾩옄 ?쒖뒪?쒖쓽 臾몄젣?먯쓣 ?닿껐?⑸땲??",
    problem: "湲곗〈 ?꾩옄 ?쒖뒪?쒖? 怨좎젙???뚮줈 援ъ“? ?믪? ?먮꼫吏 ?뚮え濡??명빐 ?섍꼍 蹂?? 蹂듭옟???좏샇, ?ㅼ떆媛??곸쓳???쒓퀎瑜?媛吏묐땲??",
    approach: "?앸챸泥댁쓽 媛먭컖, ?곸쓳, ?쇰뱶諛? ?먭?議곗젅 ?먮━瑜??꾩옄?뚯옄? ?뚮줈 援ъ“??諛섏쁺?섏뿬 ?⑥쑉?곸씠怨??좎뿰???쒖뒪?쒖쓣 ?ㅺ퀎?⑸땲??",
    points: [
      "?앹껜 媛먭컖湲곌?怨??좉꼍怨꾩쓽 ?좏샇 泥섎━ 諛⑹떇???꾩옄 ?쒖뒪?쒖쑝濡?援ы쁽?⑸땲??",
      "?섍꼍 蹂?붿뿉 諛섏쓳?섎뒗 ?곸쓳???뚯옄 諛??뚮줈 ?숈옉???ㅺ퀎?⑸땲??",
      "??꾨젰, 怨좏슚?? ?ㅼ떆媛?泥섎━媛 媛?ν븳 ?앹껜紐⑥궗 ?섎뱶?⑥뼱瑜?吏?ν빀?덈떎.",
    ],
    keywords: ["Biomimetic electronics", "Adaptive sensing", "Bio-inspired hardware", "Feedback system"],
  },
  {
    title: "Neuromorphic computing",
    image: "neuromorphic",
    text: "?앹껜 ?쒕깄?ㅼ쓽 ?숈옉??紐⑥궗???대줈紐⑦뵿 ?붾컮?댁뒪瑜??댁슜?섏뿬 AI ?곗궛???뱁솕??而댄벂???쒖뒪?쒖쓣 援ы쁽?⑸땲??",
    problem: "湲곗〈 而댄벂??援ъ“??硫붾え由ъ? ?곗궛 ?μ튂 ?ъ씠???곗씠???대룞??留롮븘 AI ?곗궛?먯꽌 ?먮꼫吏? ?띾룄 蹂묐ぉ??諛쒖깮?⑸땲??",
    approach: "?쒕깄??媛以묒튂 蹂?? 湲곗뼲, ?좏샇 ?⑹궛???뚯옄 ?섏??먯꽌 援ы쁽?섏뿬 硫붾え由ъ? ?곗궛??寃고빀??而댄벂???쒖뒪?쒖쓣 媛쒕컻?⑸땲??",
    points: [
      "?쒕깄??媛?뚯꽦, 湲곗뼲 ?좎?, ?꾨궇濡쒓렇 媛以묒튂 蹂?붾? 援ы쁽?⑸땲??",
      "愿??꾧린/?댁삩 ?좏샇瑜??댁슜???뚯옄 湲곕컲 AI ?곗궛???곌뎄?⑸땲??",
      "?몃찓紐⑤━ 而댄벂??諛???꾨젰 AI ?섎뱶?⑥뼱濡??뺤옣?⑸땲??",
    ],
    keywords: ["Neuromorphic device", "Synaptic transistor", "In-memory computing", "AI hardware"],
  },
  {
    title: "Post silicon device & system",
    image: "post-silicon",
    text: "李⑥꽭? ?꾩옄 ?щ즺 諛??붾컮?댁뒪 ?ㅺ퀎瑜??댁슜?섏뿬 李⑥꽭? ?꾩옄?뚯옄 諛??쒖뒪?쒖쓣 ?쒖옉?⑸땲??",
    problem: "?ㅻ━肄?湲곕컲 ?뚯옄留뚯쑝濡쒕뒗 珥덉??꾨젰, ?좎뿰??湲곕뒫, ?덈줈??媛먭컖 諛?吏?ν삎 ?쒖뒪??援ы쁽???쒓퀎媛 ?덉뒿?덈떎.",
    approach: "2D ?뚯옱, ?좉린/?섏씠釉뚮━???щ즺, ?댁삩??怨꾨㈃, 愿묒쟾 湲곕뒫???щ즺瑜??쒖슜?섏뿬 ?ъ뒪???ㅻ━肄??꾩옄?뚯옄? ?쒖뒪?쒖쓣 ?ㅺ퀎?⑸땲??",
    points: [
      "李⑥꽭? 諛섎룄泥??щ즺? 怨꾨㈃ ?쒖뼱瑜?湲곕컲?쇰줈 ?좉퇋 ?뚯옄瑜??쒖옉?⑸땲??",
      "?뚯옄 臾쇱꽦怨??뚮줈/?쒖뒪??湲곕뒫???곌껐?섎뒗 ?ㅺ퀎瑜??섑뻾?⑸땲??",
      "?쇱꽌, 硫붾え由? ?곗궛 湲곕뒫??寃고빀??李⑥꽭? ?꾩옄 ?쒖뒪?쒖쓣 援ы쁽?⑸땲??",
    ],
    keywords: ["Post-silicon device", "Emerging materials", "2D semiconductor", "Device-system integration"],
  },
];

const researchDefaultsFor = (title = "", index = 0) => {
  const normalized = title.toLowerCase();
  if (normalized.includes("biomimetic") || normalized.includes("bio")) return canonicalResearchAreas[0];
  if (normalized.includes("neuromorphic") || normalized.includes("synapse")) return canonicalResearchAreas[1];
  if (normalized.includes("post") || normalized.includes("silicon")) return canonicalResearchAreas[2];
  if (normalized.includes("reconfig") || normalized.includes("adaptive") || normalized.includes("device")) return canonicalResearchAreas[index] || canonicalResearchAreas[0];
  return canonicalResearchAreas[index] || canonicalResearchAreas[0];
};

const shouldMigrateResearchAreas = (areas = []) => {
  const titles = areas.map((area) => String(area.title || "").toLowerCase());
  const hasCanonical = titles.some((title) => title.includes("biomimetic") || title.includes("post silicon"));
  const hasOldGenerated = titles.some((title) => title.includes("reconfigurable") || title.includes("adaptive semiconductor") || title.includes("neuromorphic devices"));
  return areas.length === 3 && !hasCanonical && hasOldGenerated;
};

const normalizeResearchContent = () => {
  data.research ||= { intro: "", areas: [] };
  data.research.areas ||= [];
  if (shouldMigrateResearchAreas(data.research.areas)) {
    data.research.intro = "?앸챸泥?紐⑥궗 ?꾩옄 ?쒖뒪?? ?대줈紐⑦뵿 而댄벂?? ?ъ뒪???ㅻ━肄??뚯옄 諛??쒖뒪?쒖쓣 以묒떖?쇰줈 李⑥꽭? 吏?ν삎 ?꾩옄 ?쒖뒪?쒖쓣 ?곌뎄?⑸땲??";
    data.research.areas = canonicalResearchAreas.map((area) => ({ ...area, points: [...area.points], keywords: [...area.keywords] }));
  }
  data.research.areas.forEach((area, index) => {
    const defaults = researchDefaultsFor(area.title, index);
    area.image ||= defaults.image;
    area.problem ||= defaults.problem;
    area.approach ||= defaults.approach;
    area.points = Array.isArray(area.points) && area.points.length ? area.points : defaults.points;
    area.keywords = Array.isArray(area.keywords) && area.keywords.length ? area.keywords : defaults.keywords;
  });
};

normalizeResearchContent();

menuButton?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (previewMode) {
      event.preventDefault();
      if (insertMode) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        return;
      }
      const target = new URL(link.href, window.location.href);
      const page = target.pathname.split("/").pop() || "index.html";
      window.parent?.postMessage({ type: "eed-preview-page", page, hash: target.hash }, "*");
      return;
    }
    siteNav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

if (previewMode) {
  let insertEventSent = false;
  const chooseInsertLocation = (event) => {
    if (!insertMode || insertEventSent) return false;
    const blocked = event.target.closest?.(
      "[data-upload-member-photo], [data-member-photo-input], [data-upload-custom-image], [data-custom-image-input], [data-upload-embed-image], [data-embed-image-input]",
    );
    if (blocked) return false;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    insertEventSent = true;
    const anchor =
      event.target.closest?.("[data-drag-key]") ||
      event.target.closest?.("main > section") ||
      document.querySelector("main > section:last-of-type") ||
      document.querySelector("main");
    const afterKey = anchor?.dataset?.dragKey || "pageIntro";
    window.parent?.postMessage({ type: "eed-insert-section", afterKey, page: pageKey() }, "*");
    return true;
  };

  const resizeImageFile = (file, maxSize = 900, quality = 0.88) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const image = new Image();
        image.addEventListener("load", () => {
          const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        });
        image.addEventListener("error", () => resolve(reader.result));
        image.src = reader.result;
      });
      reader.addEventListener("error", () => resolve(""));
      reader.readAsDataURL(file);
    });

  document.addEventListener("change", (event) => {
    const embedInput = event.target.closest?.("[data-embed-image-input]");
    if (embedInput) {
      const file = embedInput.files?.[0];
      if (!file) return;
      resizeImageFile(file).then((src) => {
        if (!src) return;
        window.parent?.postMessage({ type: "eed-set-embed-image", id: embedInput.dataset.embedId, src }, "*");
      });
      return;
    }
    const customInput = event.target.closest?.("[data-custom-image-input]");
    if (customInput) {
      const file = customInput.files?.[0];
      if (!file) return;
      resizeImageFile(file).then((src) => {
        if (!src) return;
        window.parent?.postMessage({ type: "eed-set-custom-image", id: customInput.dataset.customId, src }, "*");
      });
      return;
    }
    const input = event.target.closest?.("[data-member-photo-input]");
    if (!input) return;
    const file = input.files?.[0];
    if (!file) return;
    resizeImageFile(file).then((photo) => {
      if (!photo) return;
      window.parent?.postMessage(
        {
          type: "eed-set-member-photo",
          memberType: input.dataset.uploadMemberPhoto,
          index: input.dataset.memberIndex,
          photo,
        },
        "*",
      );
    });
  });

  document.addEventListener("pointerdown", chooseInsertLocation, true);
  document.addEventListener("mousedown", chooseInsertLocation, true);
  document.addEventListener("click", (event) => {
    if (chooseInsertLocation(event)) return;
    if (insertMode) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return;
    }
    const uploadButton = event.target.closest?.("[data-upload-member-photo]");
    const customUploadButton = event.target.closest?.("[data-upload-custom-image], [data-upload-embed-image]");
    if (uploadButton || customUploadButton) {
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
    const addButton = event.target.closest?.("[data-add-member]");
    if (addButton) {
      event.preventDefault();
      window.parent?.postMessage({ type: "eed-add-member", memberType: addButton.dataset.addMember }, "*");
      return;
    }
    const addPublicationButton = event.target.closest?.("[data-add-publication-year]");
    if (addPublicationButton) {
      event.preventDefault();
      event.stopPropagation();
      window.parent?.postMessage({ type: "eed-add-publication-year", year: addPublicationButton.dataset.addPublicationYear }, "*");
      return;
    }
    const addNewPublicationYearButton = event.target.closest?.("[data-add-new-publication-year]");
    if (addNewPublicationYearButton) {
      event.preventDefault();
      event.stopPropagation();
      const yearInput = document.querySelector("[data-new-publication-year]");
      window.parent?.postMessage({ type: "eed-add-publication-year", year: yearInput?.value || String(new Date().getFullYear()) }, "*");
      return;
    }
    const link = event.target.closest?.("a[href*='.html']");
    if (event.defaultPrevented) return;
    if (!link || link.closest("#site-nav")) return;
    event.preventDefault();
    const target = new URL(link.href, window.location.href);
    const page = target.pathname.split("/").pop() || "index.html";
    window.parent?.postMessage({ type: "eed-preview-page", page, hash: target.hash }, "*");
  }, true);
}

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value) element.textContent = value;
};

const setHtml = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value) element.innerHTML = value;
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const highlightLabMember = (authors) => authors.replaceAll("Dong Gue Roe", '<strong class="lab-member">Dong Gue Roe</strong>');

const renderDesign = () => {
  if (!data?.design) return;
  const root = document.documentElement;
  root.style.setProperty("--hero-text-top", `${data.design.heroTextTop ?? 84}px`);
  root.style.setProperty("--hero-text-left", `${data.design.heroTextLeft ?? 0}vw`);
  root.style.setProperty("--hero-text-width", `${data.design.heroTextWidth ?? 720}px`);
  root.style.setProperty("--hero-eyebrow-top", `${data.design.heroEyebrowTop ?? 0}px`);
  root.style.setProperty("--hero-eyebrow-x", `${data.design.heroEyebrowX ?? 0}px`);
  root.style.setProperty("--hero-eyebrow-y", `${data.design.heroEyebrowY ?? 0}px`);
  root.style.setProperty("--hero-headline-x", `${data.design.heroHeadlineX ?? 0}px`);
  root.style.setProperty("--hero-headline-y", `${data.design.heroHeadlineY ?? 0}px`);
  root.style.setProperty("--hero-intro-x", `${data.design.heroIntroX ?? 0}px`);
  root.style.setProperty("--hero-intro-y", `${data.design.heroIntroY ?? 0}px`);
  root.style.setProperty("--hero-actions-x", `${data.design.heroActionsX ?? 0}px`);
  root.style.setProperty("--hero-actions-y", `${data.design.heroActionsY ?? 0}px`);
  root.style.setProperty("--hero-headline-size", `${data.design.heroHeadlineSize ?? 76}px`);
  root.style.setProperty("--hero-intro-size", `${data.design.heroIntroSize ?? 20}px`);
};

const renderShared = () => {
  if (!data) return;
  document.querySelectorAll("[data-lab-short]").forEach((item) => {
    item.textContent = data.lab.shortName;
  });
  document.querySelectorAll("[data-lab-subtitle]").forEach((item) => {
    item.textContent = data.lab.subtitle;
  });
  document.querySelectorAll("[data-footer]").forEach((item) => {
    item.textContent = data.lab.footer;
  });
};

const renderHome = () => {
  if (!document.body.dataset.page || document.body.dataset.page !== "home") return;
  setText("[data-home-eyebrow]", data.home.eyebrow);
  setText("[data-home-headline]", data.home.headline);
  setText("[data-home-intro]", data.home.intro);
  setText("[data-home-notice-title]", data.home.noticeTitle);
  setText("[data-home-notice-text]", data.home.noticeText);
};

const researchIllustration = (type = "biomimetic") => {
  const images = {
    biomimetic: "assets/research-biomimetic.png",
    neuromorphic: "assets/research-neuromorphic.png",
    "post-silicon": "assets/research-post-silicon.png",
  };
  const labels = {
    biomimetic: "Bio-inspired electronics",
    neuromorphic: "Synaptic AI hardware",
    "post-silicon": "Post-silicon platform",
  };
  return `
    <img src="${images[type] || images.biomimetic}" alt="${labels[type] || "Research image"}" loading="lazy" />
    <div class="research-visual-shade"></div>
    <span class="research-visual-label">${labels[type] || "Research"}</span>
  `;
};

const renderResearch = () => {
  if (document.body.dataset.page !== "research") return;
  setText("[data-research-intro]", data.research.intro);
  const grid = document.querySelector("[data-research-areas]");
  if (!grid) return;
  grid.innerHTML = data.research.areas
    .map(
      (area, index) => `
        <article class="research-card research-theme-card">
          <div class="research-theme-image">
            <div class="research-visual">${researchIllustration(area.image)}</div>
          </div>
          <div class="research-theme-copy">
            <p class="eyebrow">Theme ${String(index + 1).padStart(2, "0")}</p>
            <h2 data-edit-path="research.areas.${index}.title">${area.title}</h2>
            <p class="research-summary" data-edit-path="research.areas.${index}.text">${area.text}</p>
            ${area.problem ? `<p class="research-detail"><strong>Problem.</strong> <span class="research-detail-text">${escapeHtml(area.problem)}</span></p>` : ""}
            ${area.approach ? `<p class="research-detail"><strong>Approach.</strong> <span class="research-detail-text">${escapeHtml(area.approach)}</span></p>` : ""}
            ${Array.isArray(area.points) && area.points.length ? `<ul class="research-points">${area.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>` : ""}
            ${Array.isArray(area.keywords) && area.keywords.length ? `<div class="research-keywords">${area.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")}</div>` : ""}
          </div>
        </article>
      `,
    )
    .join("");
};

const renderMembers = () => {
  if (document.body.dataset.page !== "members") return;
  setText("[data-members-intro]", data.members.intro);
  const labels = data.members.sectionLabels || {};
  setText("#pi .section-heading .eyebrow", labels.piEyebrow || "PI");
  setText("#pi .section-heading h2", labels.piTitle || "Principal Investigator");
  setText("#students .section-heading .eyebrow", labels.studentsEyebrow || "Students");
  setText("#students .section-heading h2", labels.studentsTitle || "Students");
  setText("#alumni .section-heading .eyebrow", labels.alumniEyebrow || "Alumni");
  setText("#alumni .section-heading h2", labels.alumniTitle || "Alumni");
  const professor = data.members.pi || data.members.professor;
  setText("[data-professor-name]", professor.name);
  setText("[data-professor-role]", professor.role);
  setHtml("[data-professor-affiliation]", professor.affiliation.join("<br />"));
  setText("[data-professor-note]", professor.note);
  const piPhoto = document.querySelector("[data-pi-photo]");
  const piAvatar = document.querySelector("[data-pi-avatar]");
  if (piPhoto && piAvatar) {
    if (professor.photo) {
      piPhoto.src = professor.photo;
      piPhoto.hidden = false;
      piAvatar.hidden = true;
      piAvatar.classList.remove("photo-placeholder");
    } else {
      piPhoto.hidden = true;
      piAvatar.hidden = false;
      piAvatar.classList.add("photo-placeholder");
      piAvatar.setAttribute("aria-label", "Photo placeholder");
      piAvatar.textContent = "";
    }
  }
  const email = document.querySelector("[data-professor-email]");
  if (email) {
    email.textContent = professor.email;
    email.href = `mailto:${professor.email}`;
  }

  const renderCvList = (selector, items, titleKey) => {
    const list = document.querySelector(selector);
    if (!list) return;
    list.innerHTML = items
      .map(
        (item) => `
          <li>
            <strong>${item[titleKey]}</strong>
            ${item.details.map((detail) => `<span>${detail}</span>`).join("")}
          </li>
        `,
      )
      .join("");
  };
  renderCvList("[data-education]", data.members.education, "degree");
  renderCvList("[data-experience]", data.members.experience, "title");

  const initials = (name = "") =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "M";

  const renderMemberCards = (selector, items = [], emptyText, memberType) => {
    const grid = document.querySelector(selector);
    if (!grid) return;
    if (!items.length) {
      grid.innerHTML = emptyText ? `<p class="empty-note">${emptyText}</p>` : "";
      return;
    }
    grid.innerHTML = items
      .map((member) => {
        const photo = member.photo
          ? `<img class="member-photo" src="${member.photo}" alt="${escapeHtml(member.name || "Member photo")}" />`
          : `<div class="avatar photo-placeholder" aria-label="Photo placeholder"></div>`;
        const uploadButton = `
          <label class="editor-photo-upload" data-upload-member-photo="${memberType}" data-member-index="${items.indexOf(member)}">
            Upload Photo
            <input type="file" accept="image/*" data-member-photo-input data-upload-member-photo="${memberType}" data-member-index="${items.indexOf(member)}" />
          </label>
        `;
        const emailLink = member.email ? `<a href="mailto:${escapeHtml(member.email)}">${escapeHtml(member.email)}</a>` : "";
        return `
          <article class="profile member-card">
            <div class="member-photo-wrap" data-photo-target="${memberType}" data-member-index="${items.indexOf(member)}">${photo}${uploadButton}</div>
            <div>
              <h3 class="member-name">${escapeHtml(member.name || "New Member")}</h3>
              <p class="role">${escapeHtml(member.role || "")}</p>
              <p>${escapeHtml(member.topic || "")}</p>
              ${emailLink}
            </div>
          </article>
        `;
      })
      .join("");
  };

  renderMemberCards("[data-students]", data.members.students, "차세대 전자 소자 연구에 관심 있는 학생을 모집합니다.", "student");
  renderMemberCards("[data-alumni]", data.members.alumni, "", "alumni");
};

const renderNews = () => {
  if (document.body.dataset.page !== "news") return;
  const grid = document.querySelector("[data-news-list]");
  if (!grid) return;
  grid.innerHTML = data.news
    .map((item) => `<article><time>${item.date}</time><h3>${item.title}</h3><p>${item.text}</p></article>`)
    .join("");
};

const renderContact = () => {
  if (document.body.dataset.page !== "contact") return;
  setText("[data-contact-intro]", data.contact.intro);
  setText("[data-contact-title]", data.contact.title);
  setText("[data-contact-text]", data.contact.text);
  setText("[data-contact-lab]", data.contact.labName);
  setText("[data-contact-department]", data.contact.department);
  setText("[data-contact-address]", data.contact.address);
  const email = document.querySelector("[data-contact-email]");
  if (email) {
    email.textContent = data.contact.email;
    email.href = `mailto:${data.contact.email}`;
  }
};

const jcrJournalMetrics = Object.freeze({
  "ACS Materials Letters": { topPercent: "16.70", category: "Materials Science, Multidisciplinary" },
  "ACS Nano": { topPercent: "6.07", category: "Materials Science, Multidisciplinary" },
  "ACS Sensors": { topPercent: "3.60", category: "Chemistry, Analytical" },
  "Advanced Functional Materials": { topPercent: "4.81", category: "Physics, Applied" },
  "Advanced Materials": { topPercent: "2.17", category: "Materials Science, Multidisciplinary" },
  "Advanced Science": { topPercent: "7.16", category: "Materials Science, Multidisciplinary" },
  "Chemistry of Materials": { topPercent: "22.13", category: "Materials Science, Multidisciplinary" },
  "Journal of Materials Chemistry A": { topPercent: "13.67", category: "Materials Science, Multidisciplinary" },
  "Nature Communications": { topPercent: "7.35", category: "Multidisciplinary Sciences" },
  "Nature Electronics": { topPercent: "0.27", category: "Engineering, Electrical & Electronic" },
  "Science Advances": { topPercent: "8.82", category: "Multidisciplinary Sciences" },
});

const publicationJcr = (publication) => {
  const topPercent = String(publication.jcrTop ?? "").trim();
  if (topPercent) return { topPercent, category: String(publication.jcrCategory || "Selected subject category") };
  return jcrJournalMetrics[publication.journal] || null;
};
const renderPublications = () => {
  if (document.body.dataset.page !== "achievements") return;
  const scholar = document.querySelector("[data-scholar-link]");
  if (scholar) scholar.href = data.scholarUrl;
  const container = document.querySelector("[data-publications]");
  if (!container) return;
  const byYear = data.publications.reduce((acc, publication, index) => {
    acc[publication.year] ||= [];
    acc[publication.year].push({ publication, index });
    return acc;
  }, {});
  const nextYear = String(new Date().getFullYear() + 1);
  container.innerHTML = `
    <div class="editor-publication-year-tools">
      <label>
        New year
        <input type="number" min="1900" max="2100" value="${nextYear}" data-new-publication-year />
      </label>
      <button class="editor-add-publication" type="button" data-add-new-publication-year>Add Year</button>
    </div>
  `;
  container.innerHTML += Object.keys(byYear)
    .sort((a, b) => Number(b) - Number(a))
    .map(
      (year) => `
        <section class="publication-year" data-publication-year="${escapeHtml(year)}">
          <div class="publication-year-heading">
            <h2>${year}</h2>
            <button class="editor-add-publication" type="button" data-add-publication-year="${year}">Add to ${year}</button>
          </div>
          <ol>
            ${byYear[year]
              .map(
                ({ publication, index }) => `
                  <li data-publication-index="${index}">
                    <p><span class="authors" data-edit-path="publications.${index}.authors">${highlightLabMember(publication.authors)}</span></p>
                    <p class="pub-title" data-edit-path="publications.${index}.title">${publication.title}</p>
                    <p>
                      <em data-edit-path="publications.${index}.journal">${publication.journal}</em>
                      ${publication.firstAuthor ? '<span class="badge">1st author</span>' : ""}
                      ${publicationJcr(publication) ? `<span class="jcr-badge" title="JCR 2024 JIF ranking, ${escapeHtml(publicationJcr(publication).category)}">JCR Top ${escapeHtml(publicationJcr(publication).topPercent)}%</span>` : ""}
                      <a class="link-button" href="${publication.link}" target="_blank" rel="noopener">[LINK]</a>
                    </p>
                  </li>
                `,
              )
              .join("")}
          </ol>
        </section>
      `,
    )
    .join("");
  const publicationLists = [...container.querySelectorAll(".publication-year ol")];
  let nextPublicationNumber = publicationLists.reduce((total, list) => total + list.children.length, 0);
  publicationLists.forEach((list) => {
    list.reversed = true;
    list.start = nextPublicationNumber;
    nextPublicationNumber -= list.children.length;
  });
};
const pageSlug = () => document.body.dataset.page || "home";
const pageKey = () => {
  const fileName = window.location.pathname.split("/").pop();
  if (fileName) return fileName;
  return (
    {
      home: "index.html",
      research: "research.html",
      members: "members.html",
      achievements: "achievements.html",
      news: "news.html",
      contact: "contact.html",
    }[pageSlug()] || "index.html"
  );
};

const pageScopedData = (collection = {}) => collection[pageKey()] || collection[pageSlug()] || {};

const customSectionBlocks = (section) => {
  if (Array.isArray(section.blocks) && section.blocks.length) return section.blocks;
  if (section.type === "image") {
    return [
      {
        id: `${section.id}_image`,
        type: "image",
        src: section.src || "",
        alt: section.alt || "Custom image",
        caption: section.caption || "",
      },
    ];
  }
  return [
    {
      id: `${section.id}_text`,
      type: "text",
      title: section.title || "New Text Section",
      text: section.text || "Write your text here.",
    },
  ];
};

const renderEmbedBlock = (block) => {
  if (block.type === "image") {
    const image = block.src
      ? `<img class="custom-image" src="${block.src}" alt="${escapeHtml(block.alt || "Embedded image")}" />`
      : `<div class="custom-image-placeholder">Image section</div>`;
    return `
      <figure class="embedded-block embedded-image-block custom-figure" data-embed-block="${block.id}" data-photo-target="embed" data-member-index="${block.id}">
        ${image}
        <label class="editor-photo-upload" data-upload-embed-image="${block.id}">
          Upload Image
          <input type="file" accept="image/*" data-embed-image-input data-embed-id="${block.id}" />
        </label>
        ${block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ""}
      </figure>
    `;
  }
  return `
    <article class="embedded-block embedded-text-block custom-text-block" data-embed-block="${block.id}">
      <h2>${escapeHtml(block.title || "New Text")}</h2>
      <p>${escapeHtml(block.text || "Write your text here.")}</p>
    </article>
  `;
};

const renderCustomSections = () => {
  const main = document.querySelector("main");
  if (!main) return;
  document.querySelectorAll("[data-custom-section]").forEach((section) => section.remove());
  const sections = data.customSections?.[pageKey()] || data.customSections?.[pageSlug()] || [];
  sections.forEach((section) => {
    const wrapper = document.createElement("section");
    wrapper.className = `section custom-section custom-${section.type || "text"}-section`;
    wrapper.id = section.id;
    wrapper.dataset.customSection = section.id;
    wrapper.dataset.customId = section.id;
    wrapper.dataset.dragKey = `custom_${section.id}`;
    wrapper.innerHTML = `
      <div class="custom-section-inner">
        ${customSectionBlocks(section)
          .map((block) => {
            if (block.type === "image") {
              const image = block.src
                ? `<img class="custom-image" src="${block.src}" alt="${escapeHtml(block.alt || "Custom image")}" />`
                : `<div class="custom-image-placeholder">Image section</div>`;
              return `
                <figure class="custom-figure" data-photo-target="custom" data-member-index="${block.id}">
                  ${image}
                  <label class="editor-photo-upload" data-upload-custom-image="${block.id}">
                    Upload Image
                    <input type="file" accept="image/*" data-custom-image-input data-custom-id="${block.id}" />
                  </label>
                  ${block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ""}
                </figure>
              `;
            }
            return `
              <article class="custom-text-block" data-custom-block="${block.id}">
                <h2>${escapeHtml(block.title || "New Text")}</h2>
                <p>${escapeHtml(block.text || "Write your text here.")}</p>
              </article>
            `;
          })
          .join("")}
      </div>
    `;
    const anchor = section.insertAfterKey ? document.querySelector(`[data-drag-key="${section.insertAfterKey}"]`) : null;
    if (anchor?.parentElement) {
      anchor.insertAdjacentElement("afterend", wrapper);
    } else {
      main.append(wrapper);
    }
  });
};

const renderEmbeddedBlocks = () => {
  document.querySelectorAll("[data-embedded-blocks]").forEach((element) => element.remove());
  const embeds = data.design?.embeds?.[pageKey()] || data.design?.embeds?.[pageSlug()] || {};
  const shouldInsertAfter = (element) => /^(P|H1|H2|H3|H4|H5|H6|SPAN|A|BUTTON|TIME|EM|STRONG)$/i.test(element.tagName);
  Object.entries(embeds).forEach(([targetKey, blocks]) => {
    const target = document.querySelector(`[data-drag-key="${targetKey}"]`);
    if (!target || !Array.isArray(blocks) || !blocks.length) return;
    const wrapper = document.createElement("div");
    wrapper.className = "embedded-blocks";
    wrapper.dataset.embeddedBlocks = targetKey;
    wrapper.innerHTML = blocks.map(renderEmbedBlock).join("");
    if (shouldInsertAfter(target)) target.insertAdjacentElement("afterend", wrapper);
    else target.append(wrapper);
  });
};

const applyDeletedElements = () => {
  const deleted = pageScopedData(data?.design?.deleted);
  Object.entries(deleted).forEach(([key, isDeleted]) => {
    if (!isDeleted) return;
    const element = document.querySelector(`[data-drag-key="${key}"]`);
    if (element) element.hidden = true;
  });
};

const applyStoredPositions = () => {
  const pagePositions = data?.design?.positions?.[pageKey()] || data?.design?.positions?.[pageSlug()];
  if (!pagePositions) return;
  Object.entries(pagePositions).forEach(([key, position]) => {
    const element = document.querySelector(`[data-drag-key="${key}"]`);
    if (!element) return;
    element.style.transform = `translate(${position.x ?? 0}px, ${position.y ?? 0}px)`;
  });
};

const numericPx = (value) => {
  const parsed = Number.parseFloat(String(value).replace("px", ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const ensureContentScaleBase = (element, key) => {
  data.design ||= {};
  data.design.styles ||= {};
  data.design.styles[key] ||= {};
  const style = data.design.styles[key];
  const rect = element.getBoundingClientRect();
  if (!style.contentBaseWidth) style.contentBaseWidth = Math.round(rect.width || numericPx(getComputedStyle(element).width) || 1);
  if (!style.contentBaseHeight) style.contentBaseHeight = Math.round(rect.height || numericPx(getComputedStyle(element).height) || 1);
  return style;
};

const updateContentScale = (element, key, width, height) => {
  if (element.classList.contains("research-card")) {
    data.design ||= {};
    data.design.styles ||= {};
    data.design.styles[key] ||= {};
    data.design.styles[key].contentScale = 1;
    element.style.setProperty("--editor-content-scale", 1);
    element.classList.remove("editor-scaled-content");
    element.style.overflow = "visible";
    return;
  }
  const style = ensureContentScaleBase(element, key);
  const nextWidth = Math.max(1, width || numericPx(element.style.width) || element.getBoundingClientRect().width);
  const nextHeight = Math.max(1, height || numericPx(element.style.height) || element.getBoundingClientRect().height);
  element.style.setProperty("--editor-content-scale", 1);
  element.classList.remove("editor-scaled-content");
  const availableWidth = Math.max(1, element.clientWidth || nextWidth);
  const availableHeight = Math.max(1, element.clientHeight || nextHeight);
  const neededWidth = Math.max(1, element.scrollWidth);
  const neededHeight = Math.max(1, element.scrollHeight);
  const overflowsWidth = neededWidth > availableWidth + 2;
  const overflowsHeight = neededHeight > availableHeight + 2;
  const scale = overflowsWidth || overflowsHeight ? Math.min(1, availableWidth / neededWidth, availableHeight / neededHeight) : 1;
  style.contentScale = Number(scale.toFixed(3));
  element.style.setProperty("--editor-content-scale", style.contentScale);
  element.classList.toggle("editor-scaled-content", scale < 0.999);
};

const normalizeResearchThemeLayout = () => {
  if (document.body.dataset.page !== "research") return;
  document.querySelectorAll(".research-theme-card").forEach((card) => {
    card.style.width = "";
    card.style.minHeight = "";
    card.style.height = "";
    card.style.transform = "";
    card.querySelectorAll(".research-theme-copy, .research-theme-copy > *").forEach((element) => {
      element.style.width = "";
      element.style.minWidth = "";
      element.style.height = "";
      element.style.transform = "";
    });
  });
};
const applyStoredElementStyles = () => {
  const styles = data?.design?.styles || {};
  Object.entries(styles).forEach(([key, style]) => {
    const element = document.querySelector(`[data-drag-key="${key}"]`);
    if (!element) return;
    ["fontSize", "color", "backgroundColor", "width", "borderRadius", "fontWeight"].forEach((prop) => {
      if (style[prop] !== undefined && style[prop] !== "") element.style[prop] = style[prop];
    });
    if (style.height !== undefined && style.height !== "") {
      if (element.classList.contains("research-card")) {
        element.style.minHeight = style.height;
        element.style.height = "auto";
      } else {
        element.style.height = style.height;
      }
    }
    if (style.width !== undefined || style.height !== undefined || style.contentScale !== undefined) {
      updateContentScale(element, key, numericPx(style.width), numericPx(style.height));
    }
  });
  normalizeResearchThemeLayout();
};

const isTextSafeElement = (element) => Boolean(element && element.childElementCount === 0);

const applyStoredTextOverrides = () => {
  const overrides = data?.design?.textOverrides || {};
  let removedStructuralOverride = false;
  Object.entries(overrides).forEach(([key, text]) => {
    const element = document.querySelector(`[data-drag-key="${key}"]`);
    if (!isTextSafeElement(element)) {
      delete overrides[key];
      removedStructuralOverride = true;
      return;
    }
    if (text !== undefined) element.textContent = text;
  });
  if (removedStructuralOverride) {
    localStorage.setItem("siteDataPreview", JSON.stringify(data));
    window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
  }
};
let lastTextRangeSelection = null;

const captureTextRangeSelection = () => {
  const selection = window.getSelection();
  if (!selection?.rangeCount || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0);
  const common = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
    ? range.commonAncestorContainer
    : range.commonAncestorContainer.parentElement;
  const target = common?.closest?.("[data-drag-key]");
  if (!target || !target.contains(range.startContainer) || !target.contains(range.endContainer)) return null;
  const source = range.startContainer.nodeType === Node.ELEMENT_NODE
    ? range.startContainer
    : range.startContainer.parentElement;
  const computed = getComputedStyle(source);
  return {
    key: target.dataset.dragKey,
    range: range.cloneRange(),
    format: {
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      color: computed.color,
      lineHeight: computed.lineHeight,
      backgroundColor: computed.backgroundColor,
    },
  };
};

document.addEventListener("selectionchange", () => {
  const captured = captureTextRangeSelection();
  if (captured) lastTextRangeSelection = captured;
});
const textOffsetWithin = (root, node, offset) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let total = 0;
  let current;
  while ((current = walker.nextNode())) {
    if (current === node) return total + offset;
    total += current.textContent.length;
  }
  return total;
};

const textPointAtOffset = (root, offset) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let remaining = Math.max(0, offset);
  let current;
  while ((current = walker.nextNode())) {
    if (remaining <= current.textContent.length) return { node: current, offset: remaining };
    remaining -= current.textContent.length;
  }
  return null;
};

const applyRangeStyle = (element, rangeStyle) => {
  const start = textPointAtOffset(element, rangeStyle.start);
  const end = textPointAtOffset(element, rangeStyle.end);
  if (!start || !end || rangeStyle.end <= rangeStyle.start) return false;
  const range = document.createRange();
  range.setStart(start.node, start.offset);
  range.setEnd(end.node, end.offset);
  const span = document.createElement("span");
  span.dataset.editorRangeStyle = "true";
  ["fontSize", "fontWeight", "color", "lineHeight", "backgroundColor"].forEach((property) => {
    const value = rangeStyle[property];
    if (value !== undefined && value !== null && value !== "" && value !== "normal") span.style[property] = String(value);
  });
  span.append(range.extractContents());
  range.insertNode(span);
  return true;
};

const normalizedTextFormat = (format = {}) => {
  const result = {};
  ["fontSize", "fontWeight", "color", "lineHeight", "backgroundColor"].forEach((property) => {
    const value = format[property];
    if (value === undefined || value === null || value === "" || value === "normal") return;
    if (property === "backgroundColor" && (value === "transparent" || /rgba\(0,\s*0,\s*0,\s*0\)/.test(value))) return;
    result[property] = String(value);
  });
  return result;
};

const applyCopiedFormatToRange = (format) => {
  const captured = captureTextRangeSelection() || lastTextRangeSelection;
  const element = captured?.key ? document.querySelector(`[data-drag-key="${captured.key}"]`) : null;
  const range = captured?.range;
  if (!element || !range || range.collapsed || !element.contains(range.startContainer) || !element.contains(range.endContainer)) return false;
  const start = textOffsetWithin(element, range.startContainer, range.startOffset);
  const end = textOffsetWithin(element, range.endContainer, range.endOffset);
  const style = normalizedTextFormat(format);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || !Object.keys(style).length) return false;
  const rangeStyle = { start, end, ...style };
  window.parent?.postMessage({ type: "eed-design-history" }, "*");
  if (!applyRangeStyle(element, rangeStyle)) return false;
  element.dataset.rangeStylesApplied = "true";
  data.design ||= {};
  data.design.rangeStyles ||= {};
  data.design.rangeStyles[captured.key] ||= [];
  data.design.rangeStyles[captured.key].push(rangeStyle);
  localStorage.setItem("siteDataPreview", JSON.stringify(data));
  window.getSelection()?.removeAllRanges();
  lastTextRangeSelection = null;
  window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
  return true;
};
const applyStoredRangeStyles = () => {
  const rangeStyles = data?.design?.rangeStyles || {};
  Object.entries(rangeStyles).forEach(([key, styles]) => {
    const element = document.querySelector('[data-drag-key="' + key + '"]');
    if (!element || element.dataset.rangeStylesApplied === "true") return;
    [...styles].sort((a, b) => a.start - b.start).forEach((rangeStyle) => applyRangeStyle(element, rangeStyle));
    element.dataset.rangeStylesApplied = "true";
  });
};

const applyLineSpacingToSelection = ({ key, lineHeight }) => {
  const element = document.querySelector('[data-drag-key="' + key + '"]');
  const hasComplexContent = element?.querySelector("img, input, button, .member-photo-wrap, h1, h2, h3, h4, p, li, a, .avatar");
  if (hasComplexContent) {
    window.parent?.postMessage({ type: "eed-line-spacing-result", message: "Select an individual heading or paragraph, not the whole card." }, "*");
    return;
  }
  const liveSelection = window.getSelection();
  const liveRange = liveSelection?.rangeCount ? liveSelection.getRangeAt(0) : null;
  const range = liveRange && !liveRange.collapsed ? liveRange : lastTextRangeSelection?.key === key ? lastTextRangeSelection.range : null;
  const selectionInsideElement = range && !range.collapsed && element && element.contains(range.startContainer) && element.contains(range.endContainer);
  if (!selectionInsideElement) {
    if (!element || hasComplexContent) {
      window.parent?.postMessage({ type: "eed-line-spacing-result", message: "Select an individual heading or paragraph first." }, "*");
      return;
    }
    data.design ||= {};
    data.design.styles ||= {};
    data.design.styles[key] = { ...data.design.styles[key], lineHeight: String(lineHeight) };
    element.style.lineHeight = String(lineHeight);
    localStorage.setItem("siteDataPreview", JSON.stringify(data));
    window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
    window.parent?.postMessage({ type: "eed-line-spacing-result", message: "Line spacing applied to the selected text element." }, "*");
    return;
  }
  const start = textOffsetWithin(element, range.startContainer, range.startOffset);
  const end = textOffsetWithin(element, range.endContainer, range.endOffset);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return;
  const rangeStyle = { start, end, lineHeight: String(lineHeight) };
  if (!applyRangeStyle(element, rangeStyle)) return;
  element.dataset.rangeStylesApplied = "true";
  data.design ||= {};
  data.design.rangeStyles ||= {};
  data.design.rangeStyles[key] ||= [];
  data.design.rangeStyles[key].push(rangeStyle);
  localStorage.setItem("siteDataPreview", JSON.stringify(data));
  liveSelection?.removeAllRanges();
  lastTextRangeSelection = null;
  window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
  window.parent?.postMessage({ type: "eed-line-spacing-result", message: "Line spacing applied to selected text." }, "*");
};
const markDragTargets = () => {
  const page = pageSlug();
  const targets = [];
  const add = (label, selector, key) => {
    const element = document.querySelector(selector);
    if (element) {
      element.dataset.dragKey = key;
      targets.push({ label, element, key });
    }
  };
  const addAll = (label, selector, prefix) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      const key = `${prefix}${index + 1}`;
      element.dataset.dragKey = key;
      targets.push({ label: `${label} ${index + 1}`, element, key });
    });
  };

  const addCustom = () => {
    document.querySelectorAll("[data-custom-section]").forEach((element) => {
      const key = `custom_${element.dataset.customId}`;
      element.dataset.dragKey = key;
      targets.push({ label: "CUSTOM", element, key });
    });
    document.querySelectorAll("[data-custom-section] .custom-figure").forEach((element, index) => {
      const blockId = element.dataset.memberIndex || `customImage${index + 1}`;
      const key = `customImage_${blockId}`;
      element.dataset.dragKey = key;
      targets.push({ label: `IMAGE ${index + 1}`, element, key });
    });
    document.querySelectorAll("[data-embed-block]").forEach((element, index) => {
      const blockId = element.dataset.embedBlock || `embed${index + 1}`;
      const key = `embed_${blockId}`;
      element.dataset.dragKey = key;
      targets.push({ label: `${element.dataset.photoTarget ? "IMAGE" : "TEXT"} ${index + 1}`, element, key });
    });
  };

  add("LOGO", ".brand-mark", "brandMark");

  if (page === "home") {
    add("LABEL", "[data-home-eyebrow]", "homeLabel");
    add("TITLE", "[data-home-headline]", "homeTitle");
    add("INTRO", "[data-home-intro]", "homeIntro");
    add("BUTTONS", ".hero-actions", "homeButtons");
    addAll("BUTTON", ".hero-actions .button", "homeButton");
    addCustom();
    return targets;
  }

  add("LABEL", ".page-hero .eyebrow", "pageLabel");
  add("TITLE", ".page-hero h1", "pageTitle");
  add("INTRO", ".page-hero p:not(.eyebrow)", "pageIntro");

  if (page === "research") {
    addAll("CARD", ".research-card", "researchCard");
    addAll("NUMBER", ".research-card span", "researchNumber");
    addAll("CARD TITLE", ".research-card h3", "researchTitle");
    addAll("CARD TEXT", ".research-card p", "researchText");
    addAll("DETAIL TEXT", ".research-card .research-detail-text", "researchDetail");
    addAll("POINT", ".research-card .research-points li", "researchPoint");
  }
  if (page === "members") {
    addAll("SECTION LABEL", ".member-subsection > .section-heading .eyebrow", "memberSectionLabel");
    addAll("SECTION TITLE", ".member-subsection > .section-heading h2", "memberSectionTitle");
    add("PROFILE", ".professor-profile", "professorProfile");
    addAll("PI TEXT", ".professor-profile [data-professor-name], .professor-profile [data-professor-role], .professor-profile [data-professor-affiliation], .professor-profile [data-professor-note], .professor-profile [data-professor-email]", "piText");
    addAll("CV", ".cv-card", "cvCard");
    addAll("CV TEXT", ".cv-card h3, .cv-card strong, .cv-card span", "cvText");
    addAll("PHOTO", ".member-photo-wrap", "memberPhoto");
    addAll("MEMBER", ".member-card", "memberCard");
    addAll("MEMBER TEXT", ".member-card h3, .member-card p, .member-card a", "memberText");
    addAll("AVATAR", ".avatar", "memberAvatar");
  }
  if (page === "news") { addAll("NEWS", ".news-grid article", "newsItem"); addAll("NEWS TEXT", ".news-grid article time, .news-grid article h3, .news-grid article p", "newsText"); }
  if (page === "contact") {
    add("TEXT SECTION", ".contact-copy", "contactText");
    add("CONTACT LABEL", ".contact-copy .eyebrow", "contactEyebrow");
    add("CONTACT TITLE", "[data-contact-title]", "contactTitle");
    add("CONTACT TEXT", "[data-contact-text]", "contactBody");
    add("CARD", ".contact-card", "contactCard");
    add("LAB NAME", "[data-contact-lab]", "contactLabName");
    add("DEPARTMENT", "[data-contact-department]", "contactDepartment");
    add("ADDRESS", "[data-contact-address]", "contactAddress");
    add("EMAIL", "[data-contact-email]", "contactEmail");
  }
  if (page === "achievements") {
      add("JCR NOTE", ".jcr-note", "jcrNote");
      add("SCHOLAR", ".scholar-button", "scholarButton");
    addAll("LINK", ".link-button", "publicationLink");
    document.querySelectorAll(".publication-year").forEach((element) => {
      const year = element.dataset.publicationYear || element.querySelector("h2")?.textContent.trim() || "";
      const key = `publicationYear_${year}`;
      element.dataset.dragKey = key;
      targets.push({ label: `YEAR ${year}`, element, key });
    });
    document.querySelectorAll(".publication-year li[data-publication-index]").forEach((element) => {
      const index = Number(element.dataset.publicationIndex);
      const key = `publicationItem_${index}`;
      element.dataset.dragKey = key;
      targets.push({ label: `PUBLICATION ${index + 1}`, element, key });
    });
    document.querySelectorAll(".publication-year li[data-publication-index]").forEach((element) => {
      const index = Number(element.dataset.publicationIndex);
      [["AUTHORS", ".authors", "publicationAuthors"], ["TITLE", ".pub-title", "publicationTitle"], ["JOURNAL", "em", "publicationJournal"]].forEach(([label, selector, prefix]) => {
        const field = element.querySelector(selector);
        if (!field) return;
        const key = `${prefix}_${index}`;
        field.dataset.dragKey = key;
        targets.push({ label: `${label} ${index + 1}`, element: field, key });
      });
    });
  }
  addCustom();

  return targets;
};

const mountContactSectionControls = () => {
  if (pageSlug() !== "contact" || !previewMode || !editorControlsMode) return;
  const controls = [
    { selector: ".contact-copy", key: "contactText", fields: [".contact-copy .eyebrow", "[data-contact-title]", "[data-contact-text]"] },
    { selector: ".contact-card", key: "contactCard", fields: ["[data-contact-lab]", "[data-contact-department]", "[data-contact-address]", "[data-contact-email]"] },
  ];

  controls.forEach(({ selector, key, fields }) => {
    const section = document.querySelector(selector);
    if (!section || section.querySelector(":scope > [data-contact-editor-controls]")) return;
    if (getComputedStyle(section).position === "static") section.style.position = "relative";

    const bar = document.createElement("div");
    bar.dataset.contactEditorControls = "true";
    Object.assign(bar.style, {
      position: "absolute", top: "10px", right: "10px", zIndex: "200", display: "flex", gap: "6px",
    });

    const edit = document.createElement("button");
    edit.type = "button";
    edit.textContent = "Edit";
    edit.dataset.contactEditorControl = "true";
    edit.dataset.contactEditorAction = "edit";
    edit.title = "Edit this section";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.dataset.contactEditorControl = "true";
    remove.dataset.contactEditorAction = "delete";
    remove.title = "Delete this section";

    [edit, remove].forEach((button) => Object.assign(button.style, {
      border: "0", borderRadius: "4px", padding: "6px 9px", color: "#fff", font: "600 12px/1 system-ui, sans-serif", cursor: "pointer", boxShadow: "0 3px 10px rgba(23, 32, 38, .2)",
    }));
    edit.style.background = "#0f7d7e";
    remove.style.background = "#c54335";

    edit.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const editableFields = fields.map((field) => section.querySelector(field)).filter(Boolean);
      if (!editableFields.length) return;
      window.parent?.postMessage({ type: "eed-design-history" }, "*");
      editableFields.forEach((field) => {
        field.contentEditable = "true";
        field.dataset.directEditing = "true";
        field.style.outline = "2px dashed rgba(15, 125, 126, .55)";
        field.style.outlineOffset = "3px";
        field.addEventListener("input", () => {
          const fieldKey = field.dataset.dragKey;
          if (!fieldKey || !isTextSafeElement(field)) return;
          data.design ||= {};
          data.design.textOverrides ||= {};
          data.design.textOverrides[fieldKey] = field.textContent.trim();
          localStorage.setItem("siteDataPreview", JSON.stringify(data));
          window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
        });
        field.addEventListener("blur", () => {
          field.contentEditable = "false";
          field.removeAttribute("data-direct-editing");
          field.style.outline = "";
          field.style.outlineOffset = "";
        }, { once: true });
      });
      editableFields[0].focus();
    });

    remove.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.parent?.postMessage({ type: "eed-delete-contact-section", key }, "*");
    }, true);

    remove.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.parent?.postMessage({ type: "eed-design-history" }, "*");
      data.design ||= {};
      data.design.deleted ||= {};
      data.design.deleted[pageKey()] ||= {};
      data.design.deleted[pageKey()][key] = true;
      localStorage.setItem("siteDataPreview", JSON.stringify(data));
      window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
      section.hidden = true;
    });

    bar.append(edit, remove);
    section.append(bar);
  });
};
const enablePreviewDrag = () => {
  if (!previewMode || !dragMode) return;
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  const page = pageKey();
  const pageName = pageSlug();

  const sendUpdate = (type = "eed-design-update") => {
    data.design.positions ||= {};
    localStorage.setItem("siteDataPreview", JSON.stringify(data));
    window.parent?.postMessage(
      {
        type,
        design: data.design,
      },
      "*",
    );
  };

  const targets = markDragTargets();
  applyStoredPositions();
  applyStoredElementStyles();
  applyStoredTextOverrides();
  applyStoredRangeStyles();

  targets.forEach((target) => {
    const element = target.element;
    element.style.outline = "";
    element.style.outlineOffset = "";
    element.style.userSelect = "none";
    element.querySelectorAll?.("*").forEach((child) => {
      child.style.userSelect = "none";
    });

    const handle = document.createElement("button");
    handle.type = "button";
    handle.textContent = "";
    handle.title = `Move ${target.label}`;
    handle.setAttribute("aria-label", `Drag ${target.label}`);
    Object.assign(handle.style, {
      position: "absolute",
      transform: "translateY(-100%)",
      zIndex: "100",
      display: "none",
      width: "18px",
      height: "18px",
      minHeight: "18px",
      padding: "0",
      color: "#fff",
      background: "#d89a25",
      border: "0",
      borderRadius: "5px",
      boxShadow: "0 6px 18px rgba(23, 32, 38, 0.22)",
      cursor: "grab",
      font: "0/0 Arial, sans-serif",
      userSelect: "none",
    });
    document.body.append(handle);
    element.__editorMoveHandle = handle;

    const placeHandle = () => {
      const rect = element.getBoundingClientRect();
      handle.style.left = `${rect.left + window.scrollX}px`;
      handle.style.top = `${rect.top + window.scrollY - 8}px`;
    };
    placeHandle();
    window.addEventListener("scroll", placeHandle, { passive: true });
    window.addEventListener("resize", placeHandle);

    let dragState = null;

    handle.addEventListener("pointerdown", (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        event.stopPropagation();
        element.dispatchEvent(
          new CustomEvent("eed-select-target", {
            bubbles: true,
            detail: { element, additive: true },
          }),
        );
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      handle.setPointerCapture(event.pointerId);
      handle.style.cursor = "grabbing";
      const selected = Array.from(document.querySelectorAll("[data-editor-selected][data-drag-key]"));
      const selectedTargets = selected.some((item) => item.dataset.dragKey === target.key)
        ? selected
        : [element];
      data.design.positions ||= {};
      data.design.positions[page] ||= {};
      dragState = {
        startX: event.clientX,
        startY: event.clientY,
        lockAxis: null,
        items: selectedTargets.map((item) => {
          const key = item.dataset.dragKey;
          const stored = data.design.positions[page][key] || { x: 0, y: 0 };
          return { element: item, key, startOffsetX: stored.x ?? 0, startOffsetY: stored.y ?? 0 };
        }),
      };
      document.body.style.userSelect = "none";
      sendUpdate("eed-design-history");
    });

    handle.addEventListener("pointermove", (event) => {
      if (!dragState) return;
      let deltaX = Math.round(event.clientX - dragState.startX);
      let deltaY = Math.round(event.clientY - dragState.startY);
      if (event.shiftKey) {
        dragState.lockAxis ||= Math.abs(deltaX) >= Math.abs(deltaY) ? "x" : "y";
        if (dragState.lockAxis === "x") deltaY = 0;
        else deltaX = 0;
      } else {
        dragState.lockAxis = null;
      }
      data.design.positions ||= {};
      data.design.positions[page] ||= {};
      dragState.items.forEach((item) => {
        const nextX = item.startOffsetX + deltaX;
        const nextY = item.startOffsetY + deltaY;
        data.design.positions[page][item.key] = { x: nextX, y: nextY };
        item.element.style.transform = `translate(${nextX}px, ${nextY}px)`;
      });
      window.dispatchEvent(new Event("scroll"));
      sendUpdate();
    });

    const stopDrag = (event) => {
      if (!dragState) return;
      dragState = null;
      try {
        handle.releasePointerCapture(event.pointerId);
      } catch {}
      handle.style.cursor = "grab";
      document.body.style.userSelect = "";
      sendUpdate();
    };

    handle.addEventListener("pointerup", stopDrag);
    handle.addEventListener("pointercancel", stopDrag);
  });

  if (pageName !== "home" || !hero || !heroContent) return;

  const blockHandle = document.createElement("button");
  blockHandle.type = "button";
  blockHandle.textContent = "ALL";
  Object.assign(blockHandle.style, {
    position: "absolute",
    top: "-34px",
    left: "0",
    zIndex: "100",
    minHeight: "26px",
    padding: "4px 10px",
    color: "#fff",
    background: "#0f7d7e",
    border: "0",
    borderRadius: "5px",
    boxShadow: "0 6px 18px rgba(23, 32, 38, 0.22)",
    cursor: "grab",
    font: "0/0 Arial, sans-serif",
    userSelect: "none",
  });
  heroContent.style.outline = "1px solid rgba(15, 125, 126, 0.45)";
  heroContent.style.outlineOffset = "10px";
  heroContent.append(blockHandle);

  let blockDrag = null;
  blockHandle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
    blockHandle.setPointerCapture(event.pointerId);
    const heroRect = hero.getBoundingClientRect();
    const contentRect = heroContent.getBoundingClientRect();
    blockDrag = {
      startX: event.clientX,
      startY: event.clientY,
      startTop: contentRect.top - heroRect.top,
      startLeft: contentRect.left,
      viewportWidth: document.documentElement.clientWidth,
    };
    blockHandle.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    sendUpdate("eed-design-history");
  });

  blockHandle.addEventListener("pointermove", (event) => {
    if (!blockDrag) return;
    const heroRect = hero.getBoundingClientRect();
    const nextTop = Math.max(0, Math.min(heroRect.height - 80, blockDrag.startTop + event.clientY - blockDrag.startY));
    const nextLeftPx = Math.max(0, Math.min(blockDrag.viewportWidth - 120, blockDrag.startLeft + event.clientX - blockDrag.startX));
    const nextLeftVw = (nextLeftPx / blockDrag.viewportWidth) * 100;
    data.design.heroTextTop = Math.round(nextTop);
    data.design.heroTextLeft = Math.round(nextLeftVw * 10) / 10;
    document.documentElement.style.setProperty("--hero-text-top", `${data.design.heroTextTop}px`);
    document.documentElement.style.setProperty("--hero-text-left", `${data.design.heroTextLeft}vw`);
    sendUpdate();
  });

  const stopBlockDrag = (event) => {
    if (!blockDrag) return;
    blockDrag = null;
    try {
      blockHandle.releasePointerCapture(event.pointerId);
    } catch {}
    blockHandle.style.cursor = "grab";
    document.body.style.userSelect = "";
    sendUpdate();
  };

  blockHandle.addEventListener("pointerup", stopBlockDrag);
  blockHandle.addEventListener("pointercancel", stopBlockDrag);
};

const enablePreviewSelection = () => {
  if (!previewMode || !editorControlsMode) return;
  const targets = markDragTargets();
  mountContactSectionControls();
  applyStoredPositions();
  applyStoredElementStyles();
  applyStoredTextOverrides();
  applyStoredRangeStyles();
  const selectedItems = new Map();
  const startDirectTextEditing = (element, key, label) => {
    const hasDataPath = Boolean(element?.dataset.editPath);
    if (!element || (!isTextSafeElement(element) && !hasDataPath)) return false;
    if (unsafeTextEditKeys.some((unsafeKey) => key === unsafeKey || key.startsWith(unsafeKey))) return false;
    if (element.isContentEditable) return true;

    element.contentEditable = "true";
    element.dataset.directEditing = "true";
    element.style.userSelect = "text";
    element.style.cursor = "text";
    element.focus({ preventScroll: true });
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    let previousText = element.textContent.trim();
    let historyRecorded = false;
    const syncText = () => {
      const nextText = element.textContent.trim();
      if (nextText === previousText) return;
      if (!historyRecorded) {
        window.parent?.postMessage({ type: "eed-design-history" }, "*");
        historyRecorded = true;
      }
      previousText = nextText;
      if (element.dataset.editPath) {
        window.parent?.postMessage({ type: "eed-set-data-path", path: element.dataset.editPath, value: nextText }, "*");
        return;
      }
      data.design ||= {};
      data.design.textOverrides ||= {};
      data.design.textOverrides[key] = nextText;
      localStorage.setItem("siteDataPreview", JSON.stringify(data));
      window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
    };
    const finish = () => {
      syncText();
      element.removeEventListener("input", syncText);
      element.contentEditable = "false";
      element.removeAttribute("data-direct-editing");
      element.style.userSelect = "none";
      element.style.cursor = "";
      window.parent?.postMessage({
        type: "eed-select-element", key, label, text: element.textContent.trim(),
        textEditable: true, dataPath: element.dataset.editPath, page: pageKey(),
      }, "*");
    };
    element.addEventListener("input", syncText);
    element.addEventListener("blur", finish, { once: true });
    return true;
  };

  document.addEventListener("dblclick", (event) => {
    if (event.target.closest?.("[data-contact-editor-control], [data-editor-resize-handle]")) return;
    let element = event.target.closest?.("[data-drag-key]");
    if (!element) return;
    let key = element.dataset.dragKey;
    let label = targets.find((item) => item.element === element)?.label || key;

    if (key === "contactText" || key === "contactCard") {
      const editButton = element.querySelector("[data-contact-editor-action=\"edit\"]");
      if (editButton) {
        event.preventDefault();
        event.stopImmediatePropagation();
        editButton.click();
        return;
      }
    }

    if (!isTextSafeElement(element) && !element.dataset.editPath) {
      const editableChildren = Array.from(element.querySelectorAll("[data-drag-key]")).filter((item) =>
        isTextSafeElement(item) && !unsafeTextEditKeys.some((unsafeKey) => item.dataset.dragKey === unsafeKey || item.dataset.dragKey.startsWith(unsafeKey)), 
      );
      const child = editableChildren.find((item) => item.matches("h1, h2, h3, h4, p, a")) || editableChildren[0];
      if (!child) return;
      element = child;
      key = child.dataset.dragKey;
      label = targets.find((item) => item.element === child)?.label || key;
    }

    if (startDirectTextEditing(element, key, label)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  const sendSelection = (element, key, label) => {
    const computed = getComputedStyle(element);
    const selection = Array.from(selectedItems.values()).map((item) => ({
      key: item.key,
      label: item.label,
      page: pageKey(),
    }));
    window.parent?.postMessage(
      {
        type: "eed-select-element",
        key,
        label,
        text: element.textContent.trim(),
        textEditable: isTextSafeElement(element),
        photoTarget: element.dataset.photoTarget,
        memberIndex: element.dataset.memberIndex,
        page: pageKey(),
        customId: element.dataset.customId,
        dataPath: element.dataset.editPath,
        selectedItems: selection.length ? selection : [{ key, label, page: pageKey() }],
        style: {
          fontSize: computed.fontSize,
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          width: computed.width,
          height: computed.height,
          borderRadius: computed.borderRadius,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
        },
      },
      "*",
    );
  };

  const markSelected = (element) => {
    element.dataset.editorSelected = "true";
    element.style.boxShadow = "0 0 0 3px rgba(15, 125, 126, 0.45)";
    if (element.__editorMoveHandle) element.__editorMoveHandle.style.display = "block";
  };

  const unmarkSelected = (element) => {
    element.removeAttribute("data-editor-selected");
    element.style.boxShadow = "";
    if (element.__editorMoveHandle) element.__editorMoveHandle.style.display = "none";
    element.querySelectorAll("[data-editor-resize-handle]").forEach((handle) => handle.remove());
  };

  const clearSelection = () => {
    selectedItems.clear();
    document.querySelectorAll("[data-editor-selected]").forEach(unmarkSelected);
  };

  const addResizeHandle = (element, key, label) => {
    if (!editorControlsMode) return;
    document.querySelectorAll("[data-editor-resize-handle]").forEach((handle) => handle.remove());
    const computedPosition = getComputedStyle(element).position;
    if (computedPosition === "static") element.style.position = "relative";
    const handle = document.createElement("button");
    handle.type = "button";
    handle.dataset.editorResizeHandle = "true";
    handle.setAttribute("aria-label", `Resize ${label}`);
    Object.assign(handle.style, {
      position: "absolute",
      right: "2px",
      bottom: "2px",
      zIndex: "120",
      width: "18px",
      height: "18px",
      padding: "0",
      background: "#0f7d7e",
      border: "2px solid #fff",
      borderRadius: "5px",
      boxShadow: "0 4px 14px rgba(23, 32, 38, 0.28)",
      cursor: "nwse-resize",
      touchAction: "none",
    });
    element.append(handle);

    let resizeState = null;
    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      handle.setPointerCapture(event.pointerId);
      const rect = element.getBoundingClientRect();
      ensureContentScaleBase(element, key);
      resizeState = {
        startX: event.clientX,
        startY: event.clientY,
        startWidth: rect.width,
        startHeight: rect.height,
      };
      document.body.style.userSelect = "none";
      window.parent?.postMessage({ type: "eed-design-history" }, "*");
    });

    handle.addEventListener("pointermove", (event) => {
      if (!resizeState) return;
      event.preventDefault();
      const nextWidth = Math.max(40, Math.round(resizeState.startWidth + event.clientX - resizeState.startX));
      const nextHeight = Math.max(40, Math.round(resizeState.startHeight + event.clientY - resizeState.startY));
      data.design.styles ||= {};
      data.design.styles[key] ||= {};
      data.design.styles[key].width = `${nextWidth}px`;
      data.design.styles[key].height = `${nextHeight}px`;
      element.style.width = `${nextWidth}px`;
      if (element.classList.contains("research-card")) {
        element.style.minHeight = `${nextHeight}px`;
        element.style.height = "auto";
      } else {
        element.style.height = `${nextHeight}px`;
      }
      updateContentScale(element, key, nextWidth, nextHeight);
      localStorage.setItem("siteDataPreview", JSON.stringify(data));
      window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
    });

    const stopResize = (event) => {
      if (!resizeState) return;
      resizeState = null;
      try {
        handle.releasePointerCapture(event.pointerId);
      } catch {}
      document.body.style.userSelect = "";
      sendSelection(element, key, label);
    };

    handle.addEventListener("pointerup", stopResize);
    handle.addEventListener("pointercancel", stopResize);
  };

  let suppressSelectionClickUntil = 0;
  let marqueeState = null;

  const itemForNode = (node) => {
    const targetElement = node?.closest?.("[data-drag-key]");
    return targets.find((item) => item.element === targetElement) || null;
  };

  const removeSelectionItem = (item) => {
    selectedItems.delete(item.key);
    unmarkSelected(item.element);
  };

  const addSelectionItem = (item) => {
    Array.from(selectedItems.values()).forEach((existing) => {
      if (existing.element === item.element) return;
      if (existing.element.contains(item.element) || item.element.contains(existing.element)) {
        removeSelectionItem(existing);
      }
    });
    selectedItems.set(item.key, item);
    markSelected(item.element);
  };

  const announceSelection = (preferredItem) => {
    const last = preferredItem || Array.from(selectedItems.values()).at(-1);
    if (!last) return;
    addResizeHandle(last.element, last.key, last.label);
    sendSelection(last.element, last.key, last.label);
  };

  const selectItem = (item, additive) => {
    if (!additive) clearSelection();
    if (additive && selectedItems.has(item.key) && selectedItems.size > 1) {
      removeSelectionItem(item);
      announceSelection();
      return;
    }
    addSelectionItem(item);
    announceSelection(item);
  };

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (event.button !== 0 || (!event.ctrlKey && !event.metaKey && !event.shiftKey)) return;
      if (event.target.closest?.("[data-editor-resize-handle], input, textarea, select, button")) return;
      const item = itemForNode(event.target);
      if (!item) return;
      event.preventDefault();
      event.stopPropagation();
      suppressSelectionClickUntil = performance.now() + 750;
      selectItem(item, true);
    },
    true,
  );

  document.addEventListener("eed-select-target", (event) => {
    const item = targets.find((target) => target.element === event.detail?.element);
    if (!item) return;
    suppressSelectionClickUntil = performance.now() + 750;
    selectItem(item, Boolean(event.detail?.additive));
  });

  const marquee = document.createElement("div");
  Object.assign(marquee.style, {
    position: "fixed",
    zIndex: "1000",
    display: "none",
    pointerEvents: "none",
    border: "1px solid #0f7d7e",
    background: "rgba(15, 125, 126, 0.12)",
  });
  document.body.append(marquee);

  const updateMarquee = () => {
    if (!marqueeState) return;
    const left = Math.min(marqueeState.startX, marqueeState.currentX);
    const top = Math.min(marqueeState.startY, marqueeState.currentY);
    marquee.style.left = `${left}px`;
    marquee.style.top = `${top}px`;
    marquee.style.width = `${Math.abs(marqueeState.currentX - marqueeState.startX)}px`;
    marquee.style.height = `${Math.abs(marqueeState.currentY - marqueeState.startY)}px`;
  };

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (event.button !== 0 || itemForNode(event.target)) return;
      if (event.target.closest?.("button, a, input, textarea, select, label")) return;
      marqueeState = {
        startX: event.clientX,
        startY: event.clientY,
        currentX: event.clientX,
        currentY: event.clientY,
        additive: event.ctrlKey || event.metaKey || event.shiftKey,
      };
      marquee.style.display = "block";
      updateMarquee();
      document.body.style.userSelect = "none";
    },
    true,
  );

  document.addEventListener(
    "pointermove",
    (event) => {
      if (!marqueeState) return;
      marqueeState.currentX = event.clientX;
      marqueeState.currentY = event.clientY;
      updateMarquee();
    },
    true,
  );

  const finishMarquee = () => {
    if (!marqueeState) return;
    const state = marqueeState;
    marqueeState = null;
    marquee.style.display = "none";
    document.body.style.userSelect = "";
    const left = Math.min(state.startX, state.currentX);
    const right = Math.max(state.startX, state.currentX);
    const top = Math.min(state.startY, state.currentY);
    const bottom = Math.max(state.startY, state.currentY);
    if (right - left < 8 || bottom - top < 8) return;
    const hits = targets.filter((item) => {
      const rect = item.element.getBoundingClientRect();
      return rect.right > left && rect.left < right && rect.bottom > top && rect.top < bottom;
    });
    const topLevelHits = hits.filter(
      (item) => !hits.some((other) => other !== item && other.element.contains(item.element)),
    );
    if (!state.additive) clearSelection();
    topLevelHits.forEach(addSelectionItem);
    announceSelection(topLevelHits.at(-1));
  };
  document.addEventListener("pointerup", finishMarquee, true);
  document.addEventListener("pointercancel", finishMarquee, true);
  targets.forEach(({ element, key, label }) => {
    element.style.cursor = dragMode ? element.style.cursor : "pointer";
    element.addEventListener("click", (event) => {
      if (
        event.target.closest?.(
          "[data-upload-member-photo], [data-member-photo-input], [data-upload-custom-image], [data-custom-image-input], [data-add-publication-year], [data-add-new-publication-year], [data-new-publication-year], [data-contact-editor-control]",
        )
      )
        return;
      if (element.isContentEditable || event.target.closest?.("[contenteditable='true']")) return;
      const textSelection = window.getSelection();
      if (textSelection && !textSelection.isCollapsed && element.contains(textSelection.anchorNode) && element.contains(textSelection.focusNode)) return;
      if (event.target.closest?.("[data-editor-resize-handle]")) return;
      if (event.target.closest?.("[data-drag-key]") !== element) return;
      event.preventDefault();
      event.stopPropagation();
      if (insertMode) {
        window.parent?.postMessage({ type: "eed-insert-section", afterKey: key, page: pageKey() }, "*");
        return;
      }
      if (performance.now() < suppressSelectionClickUntil) return;
      const sectionElement = event.target.closest?.(".research-card, .member-card, .professor-profile, .cv-card, .contact-card, [data-custom-section], .publication-year, .publication-year li, .news-grid article");
      const sectionItem = targets.find((target) => target.element === sectionElement);
      selectItem(sectionItem || { element, key, label }, event.shiftKey || event.ctrlKey || event.metaKey);
    }, true);

    element.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const contactEditButton = (key === "contactText" || key === "contactCard")
        ? element.querySelector("[data-contact-editor-action=\"edit\"]")
        : null;
      if (contactEditButton) {
        contactEditButton.click();
        return;
      }
      if (!isTextSafeElement(element) || unsafeTextEditKeys.some((unsafeKey) => key === unsafeKey || key.startsWith(unsafeKey))) return;
        element.contentEditable = "true";
      element.focus();
      document.execCommand?.("selectAll", false, null);
      let previousDirectText = element.textContent.trim();
      const syncDirectText = () => {
        const nextText = element.textContent.trim();
        if (nextText === previousDirectText) return;
        window.parent?.postMessage({ type: "eed-design-history" }, "*");
        data.design.textOverrides ||= {};
        data.design.textOverrides[key] = nextText;
        previousDirectText = nextText;
        localStorage.setItem("siteDataPreview", JSON.stringify(data));
        window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
      };
      element.addEventListener("input", syncDirectText);
      const finish = () => {
        syncDirectText();
        element.removeEventListener("input", syncDirectText);
        element.contentEditable = "false";
        window.parent?.postMessage(
          {
            type: "eed-select-element",
            key,
            label,
            text: element.textContent.trim(),
        textEditable: isTextSafeElement(element),
            dataPath: element.dataset.editPath,
            style: {
              fontSize: getComputedStyle(element).fontSize,
              color: getComputedStyle(element).color,
              backgroundColor: getComputedStyle(element).backgroundColor,
              width: getComputedStyle(element).width,
              height: getComputedStyle(element).height,
              borderRadius: getComputedStyle(element).borderRadius,
              fontWeight: getComputedStyle(element).fontWeight,
            },
          },
          "*",
        );
      };
      element.addEventListener("blur", finish, { once: true });
    });
  });
};

const selectedLayoutElements = () =>
  Array.from(document.querySelectorAll("[data-editor-selected][data-drag-key]")).map((element) => ({
    element,
    key: element.dataset.dragKey,
    rect: element.getBoundingClientRect(),
  }));

const applyLayoutSelectionAction = (action) => {
  const selected = selectedLayoutElements();
  if (!selected.length) return;
  data.design ||= {};
  data.design.positions ||= {};
  data.design.positions[pageKey()] ||= {};
  data.design.styles ||= {};
  const pagePositions = data.design.positions[pageKey()];
  const selectedBounds =
    selected.length > 1
      ? {
          left: Math.min(...selected.map((item) => item.rect.left)),
          right: Math.max(...selected.map((item) => item.rect.right)),
          top: Math.min(...selected.map((item) => item.rect.top)),
          bottom: Math.max(...selected.map((item) => item.rect.bottom)),
        }
      : (selected[0].element.closest("main") || document.body).getBoundingClientRect();
  selectedBounds.center = selectedBounds.left + (selectedBounds.right - selectedBounds.left) / 2;
  selectedBounds.middle = selectedBounds.top + (selectedBounds.bottom - selectedBounds.top) / 2;
  const reference = selected[0].rect;
  if (action === "distribute-x" && selected.length > 2) {
    const ordered = [...selected].sort((a, b) => a.rect.left - b.rect.left);
    const totalWidth = ordered.reduce((sum, item) => sum + item.rect.width, 0);
    const gap = (ordered.at(-1).rect.right - ordered[0].rect.left - totalWidth) / (ordered.length - 1);
    let nextLeft = ordered[0].rect.left;
    ordered.forEach((item, index) => {
      pagePositions[item.key] ||= { x: 0, y: 0 };
      if (index > 0 && index < ordered.length - 1) {
        pagePositions[item.key].x += Math.round(nextLeft - item.rect.left);
      }
      nextLeft += item.rect.width + gap;
    });
  }
  if (action === "distribute-y" && selected.length > 2) {
    const ordered = [...selected].sort((a, b) => a.rect.top - b.rect.top);
    const totalHeight = ordered.reduce((sum, item) => sum + item.rect.height, 0);
    const gap = (ordered.at(-1).rect.bottom - ordered[0].rect.top - totalHeight) / (ordered.length - 1);
    let nextTop = ordered[0].rect.top;
    ordered.forEach((item, index) => {
      pagePositions[item.key] ||= { x: 0, y: 0 };
      if (index > 0 && index < ordered.length - 1) {
        pagePositions[item.key].y += Math.round(nextTop - item.rect.top);
      }
      nextTop += item.rect.height + gap;
    });
  }

  selected.forEach(({ element, key, rect }) => {
    pagePositions[key] ||= { x: 0, y: 0 };
    data.design.styles[key] ||= {};
    if (action === "left") pagePositions[key].x += Math.round(selectedBounds.left - rect.left);
    if (action === "center") pagePositions[key].x += Math.round(selectedBounds.center - (rect.left + rect.width / 2));
    if (action === "right") pagePositions[key].x += Math.round(selectedBounds.right - rect.right);
    if (action === "top") pagePositions[key].y += Math.round(selectedBounds.top - rect.top);
    if (action === "middle") pagePositions[key].y += Math.round(selectedBounds.middle - (rect.top + rect.height / 2));
    if (action === "bottom") pagePositions[key].y += Math.round(selectedBounds.bottom - rect.bottom);
    if (action === "same-width") {
      const width = `${Math.round(reference.width)}px`;
      data.design.styles[key].width = width;
      element.style.width = width;
    }
    if (action === "same-height") {
      const height = `${Math.round(reference.height)}px`;
      data.design.styles[key].height = height;
      if (element.classList.contains("research-card")) {
        element.style.minHeight = height;
        element.style.height = "auto";
      } else {
        element.style.height = height;
      }
    }
    if (action === "same-width" || action === "same-height") {
      updateContentScale(element, key, numericPx(data.design.styles[key].width), numericPx(data.design.styles[key].height));
    }
    element.style.transform = `translate(${pagePositions[key].x ?? 0}px, ${pagePositions[key].y ?? 0}px)`;
  });
  localStorage.setItem("siteDataPreview", JSON.stringify(data));
  window.parent?.postMessage({ type: "eed-design-update", design: data.design }, "*");
};

window.addEventListener("message", (event) => {
  if (event.data?.type === "eed-copy-text-format") {
    const captured = captureTextRangeSelection() || lastTextRangeSelection;
    window.parent?.postMessage({
      type: "eed-copy-text-format-result",
      format: captured?.format ? normalizedTextFormat(captured.format) : null,
    }, "*");
    return;
  }
  if (event.data?.type === "eed-paste-text-format") {
    const applied = applyCopiedFormatToRange(event.data?.format || {});
    window.parent?.postMessage({ type: "eed-paste-text-format-result", applied }, "*");
    return;
  }
  if (event.data?.type === "eed-apply-line-spacing-range") {
    applyLineSpacingToSelection(event.data);
    return;
  }
  if (event.data?.type === "eed-layout-selection") {
    applyLayoutSelectionAction(event.data.action);
    return;
  }
  if (event.data?.type !== "eed-apply-selected") return;
  const keys = event.data.keys || [event.data.key];
  keys.forEach((key) => {
    const element = document.querySelector(`[data-drag-key="${key}"]`);
    if (!element) return;
    if (event.data.text !== undefined && isTextSafeElement(element)) {
      data.design.textOverrides ||= {};
      data.design.textOverrides[key] = event.data.text;
      element.textContent = event.data.text;
    }
    if (event.data.style) {
      data.design.styles ||= {};
      data.design.styles[key] = { ...data.design.styles[key], ...event.data.style };
      Object.entries(event.data.style).forEach(([prop, value]) => {
        if (value === undefined || value === "") return;
        if (prop === "height" && element.classList.contains("research-card")) {
          element.style.minHeight = value;
          element.style.height = "auto";
          return;
        }
        element.style[prop] = value;
      });
      if (event.data.style.width !== undefined || event.data.style.height !== undefined) {
        updateContentScale(element, key, numericPx(data.design.styles[key].width), numericPx(data.design.styles[key].height));
      }
    }
  });
  localStorage.setItem("siteDataPreview", JSON.stringify(data));
});

renderDesign();
renderShared();
renderHome();
renderResearch();
renderMembers();
renderNews();
renderContact();
renderPublications();
markDragTargets();
renderCustomSections();
markDragTargets();
renderEmbeddedBlocks();
markDragTargets();
applyStoredPositions();
applyStoredElementStyles();
applyStoredTextOverrides();
  applyStoredRangeStyles();
applyDeletedElements();
if (previewMode && editorControlsMode) {
  window.addEventListener("keydown", (event) => {
    if (!(event.ctrlKey || event.metaKey) || event.shiftKey || event.key.toLowerCase() !== "z") return;
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.parent?.postMessage({ type: "eed-undo-request" }, "*");
  });
}
enablePreviewSelection();
enablePreviewDrag();
