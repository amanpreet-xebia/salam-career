import React, { useContext } from 'react';
import AppContext from '../AppContext';
const Header = () => {
  const value = useContext(AppContext);
  let { locale } = value.state;
  let { navLinks } = value.state.languages;
  return (
    <>
      <div
        className="border-b-[0.1px] border-gray-500 bg-salam-blue flex gap-4 md:gap-8 px-4 py-2 text-white"
        id="header"
      >
        <button
          type="button"
          className=" text-white flex text-sm rounded-full focus:outline-none "
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <a
            href={`${process.env.SALAM_URL}${navLinks.personal}/personal`}
            target="_blank"
            rel="noreferrer"
          >
            {navLinks.personal}
          </a>
        </button>
        <button
          type="button"
          className=" text-white flex text-sm rounded-full focus:outline-none "
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <a
            href={`${process.env.SALAM_URL}${navLinks.business}/business`}
            target="_blank"
            rel="noreferrer"
          >
            {navLinks.business}
          </a>
        </button>
        <div className="flex-1" />
        <button
          type="button"
          className="hidden  md:visible text-white md:flex text-sm rounded-full focus:outline-none "
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <a
            href={`${process.env.SALAM_URL}${navLinks.about}/slm/about`}
            target="_blank"
            rel="noreferrer"
          >
            {navLinks.about}
          </a>
        </button>
        <button
          type="button"
          className="hidden md:visible text-white md:flex text-sm rounded-full focus:outline-none "
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <a
            href={`${process.env.SALAM_URL}${navLinks.complaint}/support/complaints`}
          >
            {navLinks.complaint}
          </a>
        </button>
        <button
          className="flex"
          onClick={() => {
            value.setLocale(locale === 'en' ? 'ar' : 'en');
          }}
        >
          <span className="text-white font-interBold text-sm mr-[11px]">
            {' '}
            {locale === 'en' ? 'English' : 'العربيه'}
          </span>
        </button>
      </div>
    </>
  );
};

export default Header;
