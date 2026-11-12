(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#navigation");
  function closeMenu() {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("open", open);
  });
  navigation
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const current = link.hash === `#${entry.target.id}`;
            link.classList.toggle("active", current);
            if (current) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    navLinks.forEach((link) =>
      observer.observe(document.querySelector(link.hash)),
    );
  }

  // Keep recent work prominent, with the complete record one click away.
  const papers = [...document.querySelectorAll(".publication-card")];
  const olderPapers = papers.slice(3);
  const archive = document.createElement("details");
  archive.className = "archive";
  const archiveSummary = document.createElement("summary");
  archiveSummary.innerHTML =
    '<span>More publications</span><span>4 papers · 2022–2025 <i class="fa fa-plus" aria-hidden="true"></i></span>';
  const archiveList = document.createElement("div");
  archiveList.className = "publication-list";
  archive.append(archiveSummary, archiveList);
  document.querySelector(".publication-list").after(archive);
  olderPapers.forEach((paper) => archiveList.append(paper));

  const backgroundGrid = document.querySelector(".background-grid");
  const backgroundDetails = document.createElement("details");
  backgroundDetails.className = "background-details";
  const backgroundSummary = document.createElement("summary");
  backgroundSummary.innerHTML =
    '<span class="summary-label">Education, experience &amp; service<small>University of Utah · BUET · IQVIA · Research community</small></span><span>Explore <i class="fa fa-plus" aria-hidden="true"></i></span>';
  backgroundGrid.before(backgroundDetails);
  backgroundDetails.append(backgroundSummary, backgroundGrid);

  function revealLinkedContent(hash = location.hash) {
    let target;
    try {
      target = document.getElementById(
        decodeURIComponent(hash.slice(1)),
      );
    } catch {
      return;
    }
    if (!target) return;
    const disclosure = target.closest("details");
    if (disclosure) {
      disclosure.open = true;
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }
  revealLinkedContent();
  window.addEventListener("hashchange", () => revealLinkedContent());
  navLinks.forEach((link) => {
    link.addEventListener("click", () => revealLinkedContent(link.hash));
  });

  const filterList = document.querySelector(".filter-list");
  const filterButtons = [...filterList.querySelectorAll("button")];
  const filterStatus = document.querySelector(".filter-status");
  filterList.hidden = false;
  filterButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
      let count = 0;
      papers.forEach((paper) => {
        const visible =
          filter === "all" || paper.dataset.area.split(" ").includes(filter);
        paper.hidden = !visible;
        if (visible) count += 1;
      });
      const olderCount = olderPapers.filter((paper) => !paper.hidden).length;
      archive.hidden = olderCount === 0;
      archive.open = filter !== "all" && olderCount > 0;
      archiveSummary.lastElementChild.innerHTML = `${olderCount} papers · 2022–2025 <i class="fa fa-plus" aria-hidden="true"></i>`;
      document.querySelector(".earlier-work").hidden = ![
        "all",
        "accessibility",
      ].includes(filter);
      filterStatus.textContent = `${count} publications match ${button.textContent}${filter === "all" ? ", including four in More publications" : ""}.`;
    }),
  );

  const citations = {
    chart: `@misc{eliza2026chartsupported,
  title = {Chart-Supported or Model-Supplied? Examining MLLM-Generated Claims for Accessible Visualization},
  author = {Eliza, Ishrat Jahan and Rahman, Md Dilshadur},
  year = {2026},
  eprint = {2607.25021},
  archivePrefix = {arXiv},
  doi = {10.48550/arXiv.2607.25021},
  url = {https://arxiv.org/abs/2607.25021}
}`,
    climate: `@misc{eliza2026animating,
  title = {Animating Petascale Time-varying Data on Commodity Hardware with LLM-assisted Scripting},
  author = {Eliza, Ishrat Jahan and Huang, Xuan and Panta, Aashish and Sahistan, Alper and Li, Zhimin and Gooch, Amy A. and Pascucci, Valerio},
  year = {2026},
  eprint = {2603.07053},
  archivePrefix = {arXiv},
  doi = {10.48550/arXiv.2603.07053},
  url = {https://arxiv.org/abs/2603.07053}
}`,
    upset: `@article{mcnutt2025upset,
  title = {Accessible Text Descriptions for UpSet Plots},
  author = {McNutt, Andrew and McCracken, Maggie K. and Eliza, Ishrat Jahan and Hajas, Daniel and Wagoner, Jake and Lanza, Nate and Wilburn, Jack and Creem-Regehr, Sarah and Lex, Alexander},
  journal = {Computer Graphics Forum},
  volume = {44},
  number = {3},
  pages = {e70102},
  year = {2025},
  doi = {10.1111/cgf.70102}
}`,
    edakterbari: `@article{eliza2024edakterbari,
  title = {eDakterBari: A Human-Centered Solution Enabling Online Medical Consultation and Information Dissemination for Resource-Constrained Communities in Bangladesh},
  author = {Eliza, Ishrat Jahan and Urmi, Mobasshira Akter and Anan, Tousif Tanjim and Munim, Tanveer Hossain and Galib, Fattah-Zul-Ikram and Al Islam, A. B. M. Alim},
  journal = {Heliyon},
  volume = {10},
  number = {1},
  pages = {e23100},
  year = {2024},
  doi = {10.1016/j.heliyon.2023.e23100}
}`,
  };
  const dialog = document.querySelector(".citation-dialog");
  const citationText = document.querySelector("#citation-text");
  const copyStatus = document.querySelector(".copy-status");
  if (typeof dialog.showModal === "function") {
    document.querySelectorAll(".cite-button").forEach((button) => {
      button.hidden = false;
      button.addEventListener("click", () => {
        citationText.value = citations[button.dataset.cite];
        copyStatus.textContent = "";
        dialog.showModal();
        document.querySelector(".close-dialog").focus();
      });
    });
    document
      .querySelector(".close-dialog")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (
        event.target === dialog &&
        (event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom)
      )
        dialog.close();
    });
    document
      .querySelector(".copy-citation")
      .addEventListener("click", async () => {
        try {
          if (!navigator.clipboard?.writeText)
            throw new Error("Clipboard unavailable");
          await navigator.clipboard.writeText(citationText.value);
          copyStatus.textContent = "Citation copied.";
        } catch {
          citationText.focus();
          citationText.select();
          copyStatus.textContent = "Select and copy the citation above.";
        }
      });
  }
  document.querySelector("#copyright-year").textContent =
    new Date().getFullYear();
})();
