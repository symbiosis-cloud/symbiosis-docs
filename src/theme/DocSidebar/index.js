/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useState} from 'react';
import clsx from 'clsx';
import {
  useNavbarMobileSidebar,
  useAnnouncementBar,
  NavbarSecondaryMenuFiller,
  useScrollPosition,
} from '@docusaurus/theme-common/internal';
import {
  useThemeConfig,
  ThemeClassNames,
  useWindowSize
} from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import IconArrow from '@theme/Icon/Arrow';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

function DocSidebarCategoryItem({item, activePath, level }) {
  return (
    <li className="mt-4 mb-1">
      <label className="inline-block ml-4 mb-1 font-semibold lowercase">{item.label}</label>
      {item.items && <DocSidebarItems items={item.items} activePath={activePath} level={level + 1} />}
    </li>
  )
}

function DocSidebarLinkItem({item, activePath }) {
  return (
    <li className="ml-4 border-l">
      <Link
        className={clsx(activePath == item.href ? "border-blue-500 text-blue-500" : "text-gray-600 border-transparent", "flex hover:no-underline font-light -ml-[2px] border-l-[2px] leading-6 focus:outline-none focus:border-blue-500 focus:text-blue-500 hover:border-blue-500 hover:text-blue-500 text-sm")}
        to={item.href}
        key={item.href}>
        <span className="ml-4 lowercase">{item.label}</span>
      </Link>
    </li>
  )
}

function DocSidebarItems({items, activePath, level }) {
  return <ul className="">
    {items.map(x => x.type == 'link' ? (
      <DocSidebarLinkItem key={x.label} item={x} activePath={activePath} level={level} />
    ) : (
      <DocSidebarCategoryItem key={x.label} item={x} activePath={activePath} level={level} />
    ))}
  </ul>
}

function useShowAnnouncementBar() {
  const {isActive} = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);
  useScrollPosition(
    ({scrollY}) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

function HideableSidebarButton({onClick}) {
  return (
    <button
      type="button"
      title={translate({
        id: 'theme.docs.sidebar.collapseButtonTitle',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.collapseButtonAriaLabel',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      className={clsx(
        'button button--secondary button--outline',
        styles.collapseSidebarButton,
      )}
      onClick={onClick}>
      <IconArrow className={styles.collapseSidebarButtonIcon} />
    </button>
  );
}

function DocSidebarDesktop({path, sidebar, onCollapse, isHidden}) {
  const showAnnouncementBar = useShowAnnouncementBar();
  const {
    navbar: {hideOnScroll},
    hideableSidebar,
  } = useThemeConfig();
  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.sidebarWithHideableNavbar]: hideOnScroll,
        [styles.sidebarHidden]: isHidden,
      })}>
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <nav
        className={clsx('menu', styles.menu, {
          [styles.menuWithAnnouncementBar]: showAnnouncementBar,
        })}>
        <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list', "mx-1")}>
          <DocSidebarItems items={sidebar} activePath={path} level={1} />
        </ul>
      </nav>
      {hideableSidebar && <HideableSidebarButton onClick={onCollapse} />}
    </div>
  );
}

const DocSidebarMobileSecondaryMenu = ({sidebar, path}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
      <DocSidebarItems
        items={sidebar}
        activePath={path}
        onItemClick={(item) => {
console.log(item)
          // Mobile sidebar should only be closed if the category has a link
          if (item.type === 'category' && item.href) {
            mobileSidebar.toggle();
          }
          if (item.type === 'link') {
            mobileSidebar.toggle();
          }
        }}
        level={1}
      />
    </ul>
  );
};

function DocSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

const DocSidebarDesktopMemo = React.memo(DocSidebarDesktop);
const DocSidebarMobileMemo = React.memo(DocSidebarMobile);
export default function DocSidebar(props) {
  const windowSize = useWindowSize(); // Desktop sidebar visible on hydration: need SSR rendering

  const shouldRenderSidebarDesktop =
    windowSize === 'desktop' || windowSize === 'ssr'; // Mobile sidebar not visible on hydration: can avoid SSR rendering

  const shouldRenderSidebarMobile = windowSize === 'mobile';
  return (
    <>
      {shouldRenderSidebarDesktop && <DocSidebarDesktopMemo {...props} />}
      {shouldRenderSidebarMobile && <DocSidebarMobileMemo {...props} />}
    </>
  );
}
