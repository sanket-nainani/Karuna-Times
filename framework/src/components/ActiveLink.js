import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

function ActiveLink({ children, router, className, href, onClick }) {
  useEffect(() => {
    if (href) {
      router.prefetch(href);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick(e) {
    e.preventDefault();
    if (typeof onClick === 'function') {
      onClick();
    }
    if (href) {
      router.push(href);
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

ActiveLink.propTypes = {
  children: PropTypes.element.isRequired,
  router: PropTypes.object.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func
};

ActiveLink.defaultProps = {
  className: '',
  href: null,
  onClick: null
};

export default withRouter(ActiveLink);
