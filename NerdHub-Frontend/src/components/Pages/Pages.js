import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pages.module.css';

export default function Pages({ currentPage, pages, to, filterUrl }) {
  let displayPages = [];
  for (
    let i = currentPage > 1 ? currentPage - 1 : currentPage;
    i <= currentPage + 4 && i <= pages;
    i++
  ) {
    displayPages.push(i);
  }

  return (
    <div>
      {pages > 1 && (
        <div className={styles.pages_container}>
          {displayPages.map((x) => (
            <Link
              className={`button border_bottom ${styles.page_link} ${
                x === currentPage ? styles.active_page_link : ''
              }`}
              to={to ? `/${to}/${x}` : filterUrl({ pageNumber: x })}
            >
              {x}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
