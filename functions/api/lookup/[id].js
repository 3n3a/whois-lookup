import {redirectList} from '../../rdap-list';
import {parse_host} from '../../extract-tld';

function getRdapServer(domainName) {
  let tld_res = parse_host(domainName);
  return [true, redirectList[tld_res.tld]];
}

export async function onRequestGet({ params }) {
    let result;
    try {
      const [success, rdapUrl] = getRdapServer(params.id);
      const res = await fetch(`${rdapUrl}domain/${params.id}`);
      const data = await res.json();
      const info = JSON.stringify(data, null, 2);
      result = new Response(info);
    } catch (e) {
      result = new Response(JSON.stringify({line: "main", message: e.message, stack: e.hasOwnProperty("stack") ? e.stack : "", }, null, 2), { status: 500 });
    }
    return result;
  }
  
