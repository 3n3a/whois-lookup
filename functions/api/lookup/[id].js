import {redirectList} from '../../rdap-list';
import {parse_host} from '../../extract-tld';

function getRdapServer(domainName) {
  let tld = "ch";
  /*try {
   tld = parse_host(domainName).tld;
  } catch (e) {
   return [false, {line: "getRdapSrrver", message: e.message, stack: e.hasOwnProperty("stack") ? e.stack : "", }];
  }*/
  return [true, redirectList[tld]];
}

export async function onRequestGet({ params }) {
    let result;
    try {
      const [success, rdapUrl] = getRdapServer(params.id);
      if (!success) return new Response(JSON.stringify(rdapUrl, null, 2), { status: 500 });
      const res = await fetch(`${rdapUrl}domain/${params.id}`);
      const data = await res.json();
      const info = JSON.stringify(data, null, 2);
      result = new Response(info);
    } catch (e) {
      result = new Response(JSON.stringify({line: "main", message: e.message, stack: e.hasOwnProperty("stack") ? e.stack : "", }, null, 2), { status: 500 });
    }
    return result;
  }
  
