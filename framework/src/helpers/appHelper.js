/* eslint-disable no-extend-native */
import Router from 'next/router';
import { toast } from 'react-toastify';

export function timeToDecimal(time) {
  const hhmm = time.split(':');
  return (parseInt(hhmm[0], 10) + hhmm[1] / 60).toFixed(2);
}

export function openInNewTab(url) {
  const win = window.open(url, '_blank');
  win.focus();
}

export const getTokenFromCookie = cookie => {
  if (cookie) {
    return cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  }
};

export const deleteTokenFromCookie = () => {
  if (process.browser) {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
};

export const setCookieWithToken = token => {
  if (process.browser) {
    document.cookie = `token=${token}`;
  }
};

const getTokenFromDocument = () => {
  if (process.browser) {
    return getTokenFromCookie(document.cookie);
  }
};

export const alwaysTwoDigit = input => {
  if (input >= 10) {
    return input;
  }
  return `0${input}`;
};

export const getToken = () => {
  if (process.browser) {
    return getTokenFromDocument();
  }
};

export function promiseTimeout(executor) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        executor();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed'; // avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    toast.success('Copied to clipboard');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  document.body.removeChild(textArea);
}

export function copyTextToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

export function isiOS() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return false;
  }
  return !!(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
}

export const getRouterPath = fullPath => {
  try {
    const components = fullPath.split('/');
    const path = components[1];
    return path;
  } catch (error) {
    return '';
  }
};

export const parseURL = url => {
  const parser = document.createElement('a');
  const searchObject = {};
  let split;
  let i;
  // Let the browser do the work
  parser.href = url;
  // Convert query string to object
  const queries = parser.search.replace(/^\?/, '').split('&');
  for (i = 0; i < queries.length; i++) {
    split = queries[i].split('=');
    searchObject[split[0]] = split[1];
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject,
    hash: parser.hash
  };
};

export const toFixedFloat = amount => {
  if (amount) {
    return parseFloat(parseFloat(amount).toFixed(2));
  }
  return amount;
};

export const toFixedIfNeeded = (number, digits = 2) => {
  let transformedNumber = Number(number);
  if (Math.round(transformedNumber) !== transformedNumber) {
    transformedNumber = transformedNumber.toFixed(digits);
  }
  return transformedNumber;
};

export function isMobile() {
  if (typeof navigator === 'undefined') {
    return false;
  }
  let check = false;
  const a = navigator.userAgent || navigator.vendor || window.opera;
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
  ) {
    check = true;
  }
  return check;
}

export function loadScript({ url, innerHTML }) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    if (url) {
      script.src = url;
      script.type = 'text/javascript';
    }
    if (innerHTML) {
      script.innerHTML = innerHTML;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onerror = reject;
    script.onload = resolve;
  });
}
