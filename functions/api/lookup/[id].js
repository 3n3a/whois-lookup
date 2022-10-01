import {redirectList} from '../../rdap-list';
import {parse_host} from '../../extract-tld';

var config = {
  configurable: true,
  value: function() {
    var alt = {};
    var storeKey = function(key) {
      alt[key] = this[key];
    };
    Object.getOwnPropertyNames(this).forEach(storeKey, this);
    return alt;
  }
};
Object.defineProperty(Error.prototype, 'toJSON', config);

function getRdapServer(domainName) {
  let tld;
  try {
   tld = parse_host(domainName).tld;
  }
  catch (e) {
   return [false, e];
  }
  return [true, redirectList[tld]];
}

export async function onRequestGet({ params }) {
    let result;
    try {
      const [success, rdapUrl] = getRdapServer(params.id);
      if (!success) return new Response(JSON.stringify(rdapUrl, null, 2), { status: 500 });
      const res = await fetch(`https://${rdapUrl}/domain/${params.id}`);
      const data = await res.json();
      const info = JSON.stringify(data, null, 2);
      result = new Response(info);
    } catch (e) {
      result = new Response(JSON.stringify(e, null, 2), { status: 500 });
    }
    return result;
  }
  
