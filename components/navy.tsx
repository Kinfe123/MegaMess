"use client";

import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiBarChart2,
  FiChevronDown,
  FiHome,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkle } from "lucide-react";

export const ShiftingDropDown = () => {
  return (
    <div className="flex h-96 w-full justify-start gap-10 bg-transparent p-8 text-neutral-200 md:justify-center">
      <Tabs />
    </div>
  );
};

// desktop tabs
export const Tabs = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [dir, setDir] = useState<string | null>(null);

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2"
    >
      {TABS.map((t) => (
        <Tab
          key={t.id}
          tab={t.id}
          selected={selected}
          handleSetSelected={handleSetSelected}
        >
          {t.title}
        </Tab>
      ))}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
  );
};

export const MobileTabs = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {TABS.map((tab) => (
        <div
          key={tab.id}
          className="overflow-hidden rounded-lg bg-neutral-800/50"
        >
          <button
            onClick={() =>
              setActiveTab((prev) => (prev === tab.id ? null : tab.id))
            }
            className="flex w-full items-center justify-between px-4 py-3 text-sm"
          >
            <span>{tab.title}</span>
            <FiChevronDown
              className={`h-4 w-4 transition-transform ${
                activeTab === tab.id ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {activeTab === tab.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-3 pt-1">
                  <tab.Component />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        selected === tab
          ? "bg-gradient-to-tr from-transparent to-transparent/50 text-neutral-100"
          : "text-neutral-400"
      }`}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform ${selected === tab ? "rotate-180" : ""}`}
      />
    </button>
  );
};

const Content = ({ selected, dir }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg border border-neutral-600  bg-gradient-to-b from-transparent/10 via-transparent/80 to-transparent/70 p-4 backdrop-blur-2xl"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => (
        <div className="overflow-hidden" key={t.id}>
          {selected === t.id && (
            <motion.div
              initial={{
                opacity: 0,
                x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <t.Component />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const moveNub = () => {
      if (selected) {
        const hoveredTab = document.getElementById(`shift-tab-${selected}`);
        const overlayContent = document.getElementById("overlay-content");
        if (!hoveredTab || !overlayContent) return;

        const tabRect = hoveredTab.getBoundingClientRect();
        const { left: contentLeft } = overlayContent.getBoundingClientRect();
        const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;
        setLeft(tabCenter);
      }
    };
    moveNub();
  }, [selected]);

  return (
    <motion.span
      style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)" }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
    />
  );
};

// content components for mobile
const Products = () => (
  <div className=" mt-3 flex flex-wrap justify-between gap-3">
    <div>
      <h3 className="mb-2 text-sm font-medium">Startup</h3>
      <a href="#" className="mb-1 block text-sm text-neutral-400">
        Bookkeeping
      </a>
      <a href="#" className="block text-sm text-neutral-400">
        Invoicing
      </a>
    </div>

    <div>
      <h3 className="mb-2 text-sm font-medium">Scaleup</h3>
      <a href="#" className="mb-1 block text-sm text-neutral-400">
        Live Coaching
      </a>
      <a href="#" className="mb-1 block text-sm text-neutral-400">
        Reviews
      </a>
      <a href="#" className="block text-sm text-neutral-400">
        Tax/VAT
      </a>
    </div>

    <div>
      <h3 className="mb-2 text-sm font-medium">Enterprise</h3>
      <a href="#" className="mb-1 block text-sm text-neutral-400">
        White glove
      </a>
      <a href="#" className="mb-1 block text-sm text-neutral-400">
        SOX Compliance
      </a>
      <a href="#" className="block text-sm text-neutral-400">
        Staffing
      </a>
      <a href="#" className="block text-sm text-neutral-400">
        More
      </a>
    </div>

    <button className="ml-auto mt-8 flex items-center gap-1 text-sm text-purple-400/80 sm:ml-0 ">
      <span>View more</span>
      <FiArrowRight />
    </button>
  </div>
);

const Pricing = () => {
  return (
    <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <FiHome className="mb-2 text-xl text-purple-400/80" />
        <span className="text-xs">Home</span>
      </a>
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <FiBarChart2 className="mb-2 text-xl text-purple-400/80" />
        <span className="text-xs">Dashboard</span>
      </a>
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <Sparkle className="mb-2 text-xl text-purple-400/80" />
        <span className="text-xs">Blogs</span>
      </a>
    </div>
  );
};

const Blog = () => (
  <div>
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <a href="#">
        <img
          className="my-0.3 h-10 w-full rounded object-cover"
          src="/images/blog-post-4.jpg"
          alt="image"
        />
        <h4 className="text-sm font-medium">Lorem ipsum dolor</h4>
        <p className="mt-2 text-xs text-neutral-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
          quidem eos.
        </p>
      </a>

      <a href="#">
        <img
          className="my-0.3 h-10 w-full rounded object-cover"
          src="/images/blog-post-4.jpg"
          alt="image"
        />
        <h4 className="text-sm font-medium">Lorem ipsum dolor</h4>
        <p className="mt-2 text-xs text-neutral-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
          quidem eos.
        </p>
      </a>
    </div>
    <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-purple-400/80">
      <span>View more</span>
      <FiArrowRight />
    </button>
  </div>
);

const TABS = [
  {
    title: "Upcoming",
    Component: Products,
    id: 1,
  },
  {
    title: "Features",
    Component: Pricing,
    id: 2,
  },
  {
    title: "Docs",
    Component: Blog,
    id: 3,
  },
];
