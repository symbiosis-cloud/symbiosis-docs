/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useCallback, useState, useEffect} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import SearchBar from '@theme/SearchBar';
import ColorModeToggle from '@theme/ColorModeToggle';
import {
  useHistoryPopHandler,
  useHideableNavbar,
} from '@docusaurus/theme-common/internal';
import {
  useThemeConfig,
  useMobileSecondaryMenuRenderer,
  usePrevious,
  useLockBodyScroll,
  useWindowSize,
  useColorMode,
} from '@docusaurus/theme-common';
import {useActivePlugin} from '@docusaurus/plugin-content-docs/client';
import NavbarItem from '@theme/NavbarItem';
import IconMenu from '@theme/Icon/Menu';
import IconClose from '@theme/Icon/Close';
import styles from './styles.module.css'; // retrocompatible with v1

const DefaultNavItemPosition = 'right';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
} // If split links by left/right
// if position is unspecified, fallback to right (as v1)

function splitNavItemsByPosition(items) {
  const leftItems = items.filter(
    (item) => (item.position ?? DefaultNavItemPosition) === 'left',
  );
  const rightItems = items.filter(
    (item) => (item.position ?? DefaultNavItemPosition) === 'right',
  );
  return {
    leftItems,
    rightItems,
  };
}

function useMobileSidebar() {
  const windowSize = useWindowSize(); // Mobile sidebar not visible on hydration: can avoid SSR rendering

  const shouldRender = windowSize === 'mobile'; // || windowSize === 'ssr';

  const [shown, setShown] = useState(false); // Close mobile sidebar on navigation pop
  // Most likely firing when using the Android back button (but not only)

  useHistoryPopHandler(() => {
    if (shown) {
      setShown(false); // Should we prevent the navigation here?
      // See https://github.com/facebook/docusaurus/pull/5462#issuecomment-911699846

      return false; // prevent pop navigation
    }

    return undefined;
  });
  const toggle = useCallback(() => {
    setShown((s) => !s);
  }, []);
  useEffect(() => {
    if (windowSize === 'desktop') {
      setShown(false);
    }
  }, [windowSize]);
  return {
    shouldRender,
    toggle,
    shown,
  };
}

function useColorModeToggle() {
  const {
    colorMode: {disableSwitch},
  } = useThemeConfig();
  const {isDarkTheme, setLightTheme, setDarkTheme} = useColorMode();
  const toggle = useCallback(
    (e) => (e.target.checked ? setDarkTheme() : setLightTheme()),
    [setLightTheme, setDarkTheme],
  );
  return {
    isDarkTheme,
    toggle,
    disabled: disableSwitch,
  };
}

function useSecondaryMenu({sidebarShown, toggleSidebar}) {
  const content = useMobileSecondaryMenuRenderer()?.({
    toggleSidebar,
  });
  const previousContent = usePrevious(content);
  const [shown, setShown] = useState(
    () =>
      // /!\ content is set with useEffect,
      // so it's not available on mount anyway
      // "return !!content" => always returns false
      false,
  ); // When content is become available for the first time (set in useEffect)
  // we set this content to be shown!

  useEffect(() => {
    const contentBecameAvailable = content && !previousContent;

    if (contentBecameAvailable) {
      setShown(true);
    }
  }, [content, previousContent]);
  const hasContent = !!content; // On sidebar close, secondary menu is set to be shown on next re-opening
  // (if any secondary menu content available)

  useEffect(() => {
    if (!hasContent) {
      setShown(false);
      return;
    }

    if (!sidebarShown) {
      setShown(true);
    }
  }, [sidebarShown, hasContent]);
  const hide = useCallback(() => {
    setShown(false);
  }, []);
  return {
    shown,
    hide,
    content,
  };
}

function NavbarMobileSidebar({sidebarShown, toggleSidebar}) {
  useLockBodyScroll(sidebarShown);
  const items = useNavbarItems();
  const colorModeToggle = useColorModeToggle();
  const secondaryMenu = useSecondaryMenu({
    sidebarShown,
    toggleSidebar,
  });
  return (
    <div className="navbar-sidebar">
      <div className="navbar-sidebar__brand">
        <Logo />
        {!colorModeToggle.disabled && (
          <ColorModeToggle
            className={styles.navbarSidebarToggle}
            checked={colorModeToggle.isDarkTheme}
            onChange={colorModeToggle.toggle}
          />
        )}
        <button
          type="button"
          className="clean-btn navbar-sidebar__close"
          onClick={toggleSidebar}>
          <IconClose
            color="var(--ifm-color-emphasis-600)"
            className={styles.navbarSidebarCloseSvg}
          />
        </button>
      </div>

      <div
        className={clsx('navbar-sidebar__items', {
          'navbar-sidebar__items--show-secondary': secondaryMenu.shown,
        })}>
        <div className="navbar-sidebar__item menu">
          <ul className="menu__list">
            {items.map((item, i) => (
              <NavbarItem mobile {...item} onClick={toggleSidebar} key={i} />
            ))}
          </ul>
        </div>

        <div className="navbar-sidebar__item menu">
          {items.length > 0 && (
            <button
              type="button"
              className="clean-btn navbar-sidebar__back"
              onClick={secondaryMenu.hide}>
              <Translate
                id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
                description="The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)">
                ← Back to main menu
              </Translate>
            </button>
          )}
          {secondaryMenu.content}
        </div>
      </div>
    </div>
  );
}

function SocialIcons() {
  return (
    <>
      <a
        target="_blank"
        href="https://twitter.com/symbiosiscloud"
        className="flex items-center justify-between rounded-full shadow"
        aria-label="Twitter"
        rel="noreferrer"
      >
        <svg
          className="w-8 h-8 opacity-75 hover:opacity-100"
          style={{ fill: "var(--ifm-menu-color)" }}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
        </svg>
      </a>
      <a
        target="_blank"
        href="https://github.com/symbiosis-cloud"
        className="flex items-center justify-between rounded-full shadow"
        aria-label="Github"
        rel="noreferrer"
      >
        <svg
          className="w-8 h-8 opacity-75 hover:opacity-100"
          style={{ fill: "var(--ifm-menu-color)" }}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
        </svg>
      </a>
    </>
  )
}


function Logo() {
  const {
    navbar,
  } = useThemeConfig();
  return (
    <a className="select-none cursor-pointer text-2xl font-bold leading-tighter tracking-tighter focus:outline-none hover:no-underline" href={navbar.logo.href}>
      <div className="inline-block whitespace-nowrap">
        <span className="text-gray-800 inline-flex items-center justify-center inline-block font-bold lowercase">
          {navbar.title}
        </span>
      </div>
      <span className="ml-1.5 text-lg text-gray-800 font-medium">beta</span>
    </a>
  )
}

export default function Navbar() {
  const {
    navbar: {hideOnScroll, style},
  } = useThemeConfig();
  const mobileSidebar = useMobileSidebar();
  const colorModeToggle = useColorModeToggle();
  const activeDocPlugin = useActivePlugin();
  const {navbarRef, isNavbarVisible} = useHideableNavbar(hideOnScroll);
  const items = useNavbarItems();
  const hasSearchNavbarItem = items.some((item) => item.type === 'search');
  const {leftItems, rightItems} = splitNavItemsByPosition(items);
  return (
    <nav
      ref={navbarRef}
      className={clsx('navbar', 'navbar--fixed-top',  "items-center", {
        'navbar--dark': style === 'dark',
        'navbar--primary': style === 'primary',
        'navbar-sidebar--show': mobileSidebar.shown,
        [styles.navbarHideable]: hideOnScroll,
        [styles.navbarHidden]: hideOnScroll && !isNavbarVisible,
      })}>
      <div className="grid grid-cols-12 w-full">
        <div className="navbar__items col-span-7 lg:col-span-3">
          {(items?.length > 0 || activeDocPlugin) && (
            <button
              aria-label="Navigation bar toggle"
              className="navbar__toggle clean-btn"
              type="button"
              tabIndex={0}
              onClick={mobileSidebar.toggle}
              onKeyDown={mobileSidebar.toggle}>
              <IconMenu />
            </button>
          )}
          <Logo />
          {leftItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        </div>
        {!hasSearchNavbarItem && 
        <div className="col-span-5 lg:col-span-6 flex">
          <SearchBar />
        </div>
        }
        <div className="hidden lg:flex lg:col-span-3 items-center justify-end gap-1 mx-2">
          <SocialIcons />
          <a
            target="_blank"
            href="https://app.symbiosis.host"
            className="ml-2 text-sm shadow rounded bg-[color:var(--ifm-menu-color)] px-2.5 py-1.5 text-white font-semibold opacity-75 focus:opacity-100 focus:outline-none hover:opacity-100 hover:text-white hover:no-underline flex items-center gap-1"
            aria-label="Twitter"
            rel="noreferrer"
          >
            Sign-in <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="12" height="12"
          viewBox="0 0 24 24"
    style={{fill:"#fff"}}><path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"></path></svg>
          </a>
          {rightItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
          {!colorModeToggle.disabled && (
            <ColorModeToggle
              className={styles.toggle}
              checked={colorModeToggle.isDarkTheme}
              onChange={colorModeToggle.toggle}
            />
          )}
        </div>
      </div>

      <div
        role="presentation"
        className="navbar-sidebar__backdrop"
        onClick={mobileSidebar.toggle}
      />

      {mobileSidebar.shouldRender && (
        <NavbarMobileSidebar
          sidebarShown={mobileSidebar.shown}
          toggleSidebar={mobileSidebar.toggle}
        />
      )}
    </nav>
  );
}
